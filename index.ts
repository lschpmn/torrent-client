import { app, BrowserWindow, dialog, ipcMain } from 'electron';

function createWindow() {
  const win = new BrowserWindow({
    height: 720,
    width: 1280,
  });

  win.loadURL('http://localhost:5000');

  win.webContents.openDevTools();

  win.on('closed', () => {
    process.exit();
  });
}

ipcMain.on('explorer', (event, path) => {
  dialog.showOpenDialog({
    defaultPath: path,
    properties: ['openDirectory'],
  }, (paths) => {
    event.sender.send('explorer', paths);
  });
});

app.on('ready', createWindow);
