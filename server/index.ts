import * as io from 'socket.io';
import { createServer } from 'http';

let retries = 10;

async function serverRestarter() {
  try {
    await startServer(3000);
  } catch (err) {
    console.log(err);
    retries--;
    console.log(`${retries} retries left`);
    if (retries > 0) serverRestarter();
    else console.log('shutting down');
  }
}

async function startServer(port: number) {
  const server = createServer();
  const ioSocket = io(server);
  server.listen(port);
  console.log(`listening on port ${port}`);

  ioSocket.on('connection', socket => {
    socket.on('add', (magnetLink: string) => {
      console.log(magnetLink);
    });
  });
}

serverRestarter();