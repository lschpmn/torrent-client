const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    height: 720,
    width: 1280,
  });

  win.loadURL('http://localhost:5000');

  win.setMenu(null);
  win.webContents.openDevTools();

  win.on('closed', () => {
    process.exit();
  });
}

app.on('ready', createWindow);