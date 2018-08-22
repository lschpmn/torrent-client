const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({ width: 1280, height: 720 });

  win.loadURL('http://localhost:5000');

  win.webContents.openDevTools();

  win.on('closed', () => {
    process.exit();
  });
}

app.on('ready', createWindow);