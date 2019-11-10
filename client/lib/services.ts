import * as io from 'socket.io-client';
import { ipcRenderer } from 'electron';

export const socket = io('http://localhost:3001');

export function bindDispatch(dispatch) {
  socket.on('dispatch', dispatch);
}

export function getDownloadDestination() {
  ipcRenderer.once('explorer', (event, path) => {
    if (path) {
      socket.emit('setDownloadDestination', path);
    }
  });

  ipcRenderer.send('explorer');
}
