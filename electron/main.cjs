const {
  app,
  BrowserWindow,
  Menu,
  Tray,
  globalShortcut,
  ipcMain,
  nativeImage,
  screen,
} = require('electron');
const path = require('node:path');
const fs = require('node:fs');

const IS_DEV = process.env.ELECTRON_DEV === '1';
const DEV_URL = 'http://localhost:5173';
const DEFAULT_HOTKEY = 'Alt+M';
const WIDTH = 420;
const HEIGHT = 640;

let win = null;
let tray = null;
let hotkey = DEFAULT_HOTKEY;
let quitting = false;

const iconPath = path.join(__dirname, '..', 'build', 'icon.png');

// ---------- window position and hotkey persistence ----------

function statePath() {
  return path.join(app.getPath('userData'), 'window-state.json');
}

function loadState() {
  try {
    return JSON.parse(fs.readFileSync(statePath(), 'utf8'));
  } catch {
    return {};
  }
}

function saveState() {
  const state = { hotkey };
  if (win && !win.isDestroyed()) {
    const bounds = win.getBounds();
    state.x = bounds.x;
    state.y = bounds.y;
  }
  try {
    fs.writeFileSync(statePath(), JSON.stringify(state));
  } catch {
    // read-only user folder: carry on without persistence
  }
}

/** Default position: top-right of the primary display, 24 px margin. */
function defaultPosition() {
  const area = screen.getPrimaryDisplay().workArea;
  return {
    x: Math.round(area.x + area.width - WIDTH - 24),
    y: Math.round(area.y + 24),
  };
}

/** Checks the saved position still lands on a connected display. */
function isOnScreen(x, y) {
  return screen.getAllDisplays().some(({ workArea: a }) => {
    return x >= a.x - WIDTH + 80 && x <= a.x + a.width - 80 && y >= a.y && y <= a.y + a.height - 60;
  });
}

// ---------- window ----------

function createWindow() {
  const state = loadState();
  const usable =
    typeof state.x === 'number' && typeof state.y === 'number' && isOnScreen(state.x, state.y);
  const position = usable ? { x: state.x, y: state.y } : defaultPosition();

  win = new BrowserWindow({
    ...position,
    width: WIDTH,
    height: HEIGHT,
    frame: false,
    transparent: true,
    backgroundColor: '#00000000',
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    skipTaskbar: true,
    show: false,
    // The 'screen-saver' level is the one that sits above a borderless
    // windowed game; a plain alwaysOnTop gets covered.
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  win.setAlwaysOnTop(true, 'screen-saver');
  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  win.setMenu(null);

  if (IS_DEV) {
    win.loadURL(DEV_URL);
  } else {
    win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  }

  win.on('moved', saveState);

  // Alt+F4 hides instead of quitting: only the tray menu really closes it.
  win.on('close', (event) => {
    if (quitting) return;
    event.preventDefault();
    hideOverlay();
  });
}

function notifyShown() {
  if (!win || win.isDestroyed()) return;
  // On the very first show the renderer is not listening yet, so wait for it
  // to load, otherwise the caret never lands in the target field at startup.
  if (win.webContents.isLoading()) {
    win.webContents.once('did-finish-load', () => {
      if (win && !win.isDestroyed()) win.webContents.send('overlay:shown');
    });
  } else {
    win.webContents.send('overlay:shown');
  }
}

function showOverlay() {
  if (!win || win.isDestroyed()) return;
  win.show();
  win.focus();
  notifyShown();
}

function hideOverlay() {
  if (!win || win.isDestroyed()) return;
  saveState();
  win.hide();
}

function toggleOverlay() {
  if (!win || win.isDestroyed()) return;
  if (win.isVisible()) hideOverlay();
  else showOverlay();
}

// ---------- global hotkey ----------

function registerHotkey(accelerator) {
  globalShortcut.unregisterAll();
  try {
    if (globalShortcut.register(accelerator, toggleOverlay)) {
      hotkey = accelerator;
      saveState();
      refreshTrayMenu();
      return true;
    }
  } catch {
    // invalid accelerator: fall back to the previous one below
  }

  try {
    globalShortcut.register(hotkey, toggleOverlay);
  } catch {
    globalShortcut.register(DEFAULT_HOTKEY, toggleOverlay);
    hotkey = DEFAULT_HOTKEY;
  }
  refreshTrayMenu();
  return false;
}

// ---------- tray icon ----------

function refreshTrayMenu() {
  if (!tray) return;
  tray.setToolTip(`Wardogs Calculator — ${hotkey}`);
  tray.setContextMenu(
    Menu.buildFromTemplate([
      { label: `Afficher / masquer (${hotkey})`, click: toggleOverlay },
      { type: 'separator' },
      {
        label: 'Quitter',
        click: () => {
          quitting = true;
          app.quit();
        },
      },
    ]),
  );
}

function createTray() {
  let image = nativeImage.createFromPath(iconPath);
  if (!image.isEmpty()) image = image.resize({ width: 16, height: 16 });
  tray = new Tray(image);
  tray.on('click', toggleOverlay);
  refreshTrayMenu();
}

// ---------- IPC ----------

ipcMain.on('overlay:hide', hideOverlay);

ipcMain.on('app:quit', () => {
  quitting = true;
  app.quit();
});

ipcMain.on('overlay:opacity', (_event, value) => {
  if (!win || win.isDestroyed()) return;
  const opacity = Number(value);
  if (Number.isFinite(opacity)) win.setOpacity(Math.min(1, Math.max(0.3, opacity)));
});

ipcMain.handle('overlay:set-hotkey', (_event, accelerator) => {
  const wanted = String(accelerator ?? '').trim();
  if (wanted === '') return { ok: false, accelerator: hotkey };
  if (wanted === hotkey) return { ok: true, accelerator: hotkey };
  const ok = registerHotkey(wanted);
  return { ok, accelerator: hotkey };
});

// ---------- lifecycle ----------

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', showOverlay);

  app.whenReady().then(() => {
    app.setAppUserModelId('com.wardogs.calculator');
    hotkey = loadState().hotkey || DEFAULT_HOTKEY;
    createWindow();
    createTray();
    registerHotkey(hotkey);
    // Show on first launch, otherwise the app looks like it failed to start.
    showOverlay();
  });

  app.on('will-quit', () => {
    globalShortcut.unregisterAll();
  });

  // The app lives in the tray: closing the window does not quit it.
  app.on('window-all-closed', () => {});
}
