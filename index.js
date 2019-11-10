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

ipcMain.handle('explorer', async () => {
  const response = await dialog.showOpenDialog(null, {
    defaultPath: '',
    properties: ['openDirectory'],
  });
  return response.filePaths[0];
});
