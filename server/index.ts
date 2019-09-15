import { createServer } from 'http';
import * as lowdb from 'lowdb';
import * as FileAsync from 'lowdb/adapters/FileAsync';
import * as socketIO from 'socket.io';
import * as actions from './actions';
import { getState } from './actions';
import { Torrent } from '../types';
import { join } from 'path';

const server = createServer();
const io = socketIO(server, {
  origins: '*:*',
});
server.listen(3001);
console.log('Server started on port 3001');

const adapter = new FileAsync(join(__dirname, '..', 'db.json'));
let db;
lowdb(adapter)
  .then(_db => {
    db = _db;

    db.defaults({
      downloadDestination: '',
      torrents: [] as Torrent[],
    }).write();
  })
  .catch(err => {
    console.log(err);
    process.exit();
  });

io.on('connection', socket => {
  const dispatch = action => socket.emit('dispatch', action);

  dispatch(getState(db.value()));

  socket.on('addTorrent', async magnetLink => addTorrent(dispatch, magnetLink));

  socket.on('deleteTorrent', async magnetLink => deleteTorrent(dispatch, magnetLink));

  socket.on('setDownloadDestination', async path => setDownloadDestination(dispatch, path));
});

async function addTorrent(dispatch, magnetLink: string) {
  const newTorrent: Torrent = {
    added: Date.now(),
    name: `Stephen Colbert ep: ${Math.round(Math.random() * 100)}`,
    magnetLink,
    size: Math.random() * Math.pow(1024, Math.ceil(Math.random() * 5)),
  };

  await db.get('torrents').push(newTorrent).write();
  dispatch(actions.addTorrent(newTorrent));
}

async function deleteTorrent(dispatch, magnetLink: string) {
  await db.get('torrents').remove({ magnetLink }).write();

  dispatch(actions.deleteTorrent(magnetLink));
}

async function setDownloadDestination(dispatch, path: string) {
  await db.set('downloadDestination', path).write();

  dispatch(actions.getDownloadDestination(path));
}
