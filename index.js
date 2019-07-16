const { app, BrowserWindow, dialog, ipcMain } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    height: 720,
    width: 1280,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL('http://localhost:5000');

  win.webContents.openDevTools();

  win.on('closed', () => {
    process.exit();
  });
}

app.on('ready', createWindow);

ipcMain.on('explorer', (event, path) => {
  dialog.showOpenDialog({
    defaultPath: path,
    properties: ['openDirectory'],
  }, async (paths) => {
    event.sender.send('explorer', paths && paths[0]);
  });
});