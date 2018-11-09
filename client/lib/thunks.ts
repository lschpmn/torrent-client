import * as io from 'socket.io-client';

let socket;

export async function addTorrent(magnetLink: string) {
  const socket = getSocket();

  console.log(`Sending ${magnetLink}`);
  socket.emit('add', { magnetLink });
}

function getSocket() {
  if (socket) return socket;
  return io('http://localhost:3000');
}