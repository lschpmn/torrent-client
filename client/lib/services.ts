import * as io from 'socket.io-client';
import { ipcRenderer } from 'electron';

export const socket = io('http://localhost:3001');

export function addTorrent(magnetLink: string) {
  socket.emit('addTorrent', magnetLink || Math.random().toString(36).slice(-8));
}

export function bindDispatch(dispatch) {
  socket.on('dispatch', dispatch);
}

export function deleteTorrent(magnetLink: string) {
  socket.emit('deleteTorrent', magnetLink);
}

export function getDownloadDestination() {
  ipcRenderer.once('explorer', (event, path) => {
    if (path) {
      socket.emit('setDownloadDestination', path);
    }
  });

  ipcRenderer.send('explorer');
}