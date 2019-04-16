import { createServer } from 'http';
import * as lowdb from 'lowdb';
import * as FileAsync from 'lowdb/adapters/FileAsync';
import * as socketIO from 'socket.io';

const server = createServer();
const io = socketIO(server, {
  origins: '*:*',
});
server.listen(3001);

const adapter = new FileAsync('../db.json');
let db;
lowdb(adapter)
  .then(_db => {
    db = _db;
    db.defaults({
      downloadDestination: null,
      torrents: [],
    }).write();
  })
  .catch(err => {
    console.log(err);
    process.exit();
  });

io.on('connection', socket => {
  socket.on('getState', async () => {
    const dbState = await db.getState();

    socket.emit('getState-response', dbState);
  });

  socket.on('setDownloadDestination', (path: string) =>
    db
      .set('downloadDestination', path)
      .write()
  );
});

console.log('Server started on port 3001');