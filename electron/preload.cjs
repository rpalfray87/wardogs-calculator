const { contextBridge, ipcRenderer } = require('electron');

// Minimal surface exposed to the renderer: no require, no fs, no raw ipcRenderer.
contextBridge.exposeInMainWorld('wardogs', {
  hide: () => ipcRenderer.send('overlay:hide'),
  quit: () => ipcRenderer.send('app:quit'),
  setOpacity: (value) => ipcRenderer.send('overlay:opacity', value),
  setHotkey: (accelerator) => ipcRenderer.invoke('overlay:set-hotkey', accelerator),
  onShown: (callback) => {
    const handler = () => callback();
    ipcRenderer.on('overlay:shown', handler);
    return () => ipcRenderer.removeListener('overlay:shown', handler);
  },
});
