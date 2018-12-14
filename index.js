const { app, BrowserWindow, dialog, ipcMain, shell } = require('electron');

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
  const folder = dialog.showOpenDialog({
    defaultPath: path,
    properties: ['openDirectory']
  });
  console.log(`folder ${folder}`);

  event.returnValue = folder;
});

app.on('ready', createWindow);

setTimeout(() => {
  const path = dialog.showOpenDialog({
    defaultPath: __dirname,
    properties: ['openDirectory']
  });

  console.log(path);
}, 3000);

