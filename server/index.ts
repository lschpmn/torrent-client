import { createServer } from 'http';
import * as lowdb from 'lowdb';
import * as FileAsync from 'lowdb/adapters/FileAsync';
import * as socketIO from 'socket.io';
import { ADD_TORRENT } from '../constants';
import * as actions from './action-creators';
import { getState } from './action-creators';
import { Torrent } from '../types';
import { join } from 'path';
import * as torrentService from './torrent-service';

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

io.on('connection', socket => {
  const dispatch = action => socket.emit('dispatch', action);

  dispatch(getState(db.value()));

  socket.on('dispatch', async ({ payload, type }) => {
    console.log(type);
    payload != null && console.log(payload);

    switch (type) {
      case ADD_TORRENT:
        dispatch(await addTorrent(dispatch, payload));
        return;
    }
  });

  socket.on('deleteTorrent', async magnetLink => deleteTorrent(dispatch, magnetLink));

  socket.on('setDownloadDestination', async path => setDownloadDestination(dispatch, path));
});

async function addTorrent(dispatch, magnetLink: string) {
  const newTorrent = await torrentService.addTorrent(magnetLink, 'asdf');

  await db.get('pending').push(newTorrent).write();
  return actions.setTorrent(newTorrent);
}

async function deleteTorrent(dispatch, magnetLink: string) {
  await db.get('torrents').remove({ magnetLink }).write();

  dispatch(actions.deleteTorrent(magnetLink));
}

async function setDownloadDestination(dispatch, path: string) {
  await db.set('downloadDestination', path).write();

  dispatch(actions.getDownloadDestination(path));
}
