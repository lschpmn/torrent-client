import { createServer } from 'http';
import * as lowdb from 'lowdb';
import * as FileAsync from 'lowdb/adapters/FileAsync';
import { join } from 'path';
import * as socketIO from 'socket.io';
import { ADD_TORRENT, DELETE_TORRENT } from '../constants';
import { Torrent } from '../types';
import * as actions from './action-creators';
import TorrentEmitter from './TorrentEmitter';

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
      pending: [] as Torrent[],
      torrents: [] as Torrent[],
    }).write();
  })
  .catch(err => {
    console.log(err);
    process.exit();
  });

const torrentEmitter = new TorrentEmitter();

io.on('connection', socket => {
  const dispatch = action => socket.emit('dispatch', action);
  torrentEmitter.setDispatch(dispatch);

  dispatch(actions.getState(db.value()));

  socket.on('dispatch', async ({ payload, type }) => {
    console.log(type);
    payload != null && console.log(payload);

    switch (type) {
      case ADD_TORRENT:
        torrentEmitter.addTorrent(payload, db.get('downloadDestination').value());
        return;
      case DELETE_TORRENT:
        deleteTorrent(payload);
        return;
    }
  });

  socket.on('setDownloadDestination', async path => setDownloadDestination(dispatch, path));
});

async function deleteTorrent(magnetLink: string) {
  await db.get('torrents').remove({ magnetLink }).write();

  torrentEmitter.deleteTorrent(magnetLink);
}

async function setDownloadDestination(dispatch, path: string) {
  await db.set('downloadDestination', path).write();

  dispatch(actions.getDownloadDestination(path));
}
