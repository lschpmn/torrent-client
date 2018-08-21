'use strict';

const { app, BrowserWindow } = require('electron');

let win;

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 });

  win.loadURL('http://localhost:5000');

  win.webContents.openDevTools();

  win.on('closed', () => {
    process.exit();
  });
}

app.on('ready', createWindow);