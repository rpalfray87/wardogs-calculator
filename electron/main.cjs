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

// ---------- persistance de la position et du raccourci ----------

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
    // dossier utilisateur en lecture seule : on continue sans persistance
  }
}

/** Position par defaut : en haut a droite de l'ecran principal, marge de 24 px. */
function defaultPosition() {
  const area = screen.getPrimaryDisplay().workArea;
  return {
    x: Math.round(area.x + area.width - WIDTH - 24),
    y: Math.round(area.y + 24),
  };
}

/** Verifie que la position sauvegardee tombe encore sur un ecran branche. */
function isOnScreen(x, y) {
  return screen.getAllDisplays().some(({ workArea: a }) => {
    return x >= a.x - WIDTH + 80 && x <= a.x + a.width - 80 && y >= a.y && y <= a.y + a.height - 60;
  });
}

// ---------- fenetre ----------

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
    // Le niveau 'screen-saver' est celui qui passe au-dessus d'un jeu en fenetre
    // sans bordure ; un alwaysOnTop simple se fait recouvrir.
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

  // Alt+F4 masque au lieu de quitter : on ne ferme que par le menu du tray.
  win.on('close', (event) => {
    if (quitting) return;
    event.preventDefault();
    hideOverlay();
  });
}

function notifyShown() {
  if (!win || win.isDestroyed()) return;
  // Au tout premier affichage le renderer n'ecoute pas encore : on attend son chargement,
  // sinon le curseur n'atterrit pas dans le champ cible au lancement.
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

// ---------- raccourci global ----------

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
    // accelerateur invalide : on retombe sur le precedent ci-dessous
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

// ---------- icone de notification ----------

function refreshTrayMenu() {
  if (!tray) return;
  tray.setToolTip(`Wardogs Artillery — ${hotkey}`);
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

// ---------- cycle de vie ----------

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', showOverlay);

  app.whenReady().then(() => {
    app.setAppUserModelId('com.wardogs.artillery');
    hotkey = loadState().hotkey || DEFAULT_HOTKEY;
    createWindow();
    createTray();
    registerHotkey(hotkey);
    // Premiere ouverture visible : sinon l'app semble ne pas s'etre lancee.
    showOverlay();
  });

  app.on('will-quit', () => {
    globalShortcut.unregisterAll();
  });

  // L'app vit dans la zone de notification : fermer la fenetre ne la quitte pas.
  app.on('window-all-closed', () => {});
}
