import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import * as lowdb from 'lowdb';
import * as FileAsync from 'lowdb/adapters/FileAsync';

const adapter = new FileAsync('db.json');
let db;
lowdb(adapter)
  .then(_db => {
    db = _db;
    db.defaults({
      downloadDestination: null,
    }).write();
  })
  .catch(err => {
    console.log(err);
    process.exit();
  });

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

ipcMain.on('getState', async event => {
  const dbState = await db.getState();

  event.sender.send('state', dbState);
});

ipcMain.on('explorer', (event, path) => {
  dialog.showOpenDialog({
    defaultPath: path,
    properties: ['openDirectory'],
  }, async (paths) => {
    if (paths) {
      await db
        .set('downloadDestination', paths[0])
        .write();
      event.sender.send('explorer', paths[0]);
    }
  });
});

app.on('ready', createWindow);
