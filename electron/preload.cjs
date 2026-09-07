const { contextBridge, ipcRenderer } = require('electron');

// Surface minimale exposee au renderer : pas de require, pas de fs, pas d'ipcRenderer brut.
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
