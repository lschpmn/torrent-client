import * as io from 'socket.io-client';

export const socket = io('http://localhost:3000');

export function getState() {
  return new Promise((resolve) => {
    socket.once('getState-response', state => resolve(state));
    socket.emit('getState');
  });
}

export function saveDownloadDestination(path: string) {
  socket.emit('setDownloadDestination', path);
}