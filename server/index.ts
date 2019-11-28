import { readAsync as read, writeAsync as write } from 'fs-jetpack';
import * as getIncrementalPort from 'get-incremental-port';
import { createServer } from 'http';
import * as lowdb from 'lowdb';
import * as FileAsync from 'lowdb/adapters/FileAsync';
import { join } from 'path';
import * as socketIO from 'socket.io';
import {
  ADD_TORRENT,
  DELETE_TORRENT,
  SET_DIVIDER_POSITION_SERVER,
  SET_DOWNLOAD_DESTINATION,
  SET_FILE_SELECTED,
  START_TORRENT,
} from '../constants';
import { Torrent } from '../types';
import * as actions from './action-creators';
import { setTorrent } from './action-creators';
import TorrentEmitter from './TorrentEmitter';

const START_PORT = 3000;
let retries = 10;
export let port;

(function serverRestarter() {
  startServer()
    .catch(err => {
      console.log(err);
      retries--;
      if (retries > 0) serverRestarter();
    });
})();

async function startServer() {
  port = await getIncrementalPort(START_PORT);
  await writePortToIndex(port);

  const server = createServer();
  const io = socketIO(server, {
    origins: '*:*',
  });
  server.listen(port, () => console.log(`server running on port ${port}`));

  const adapter = new FileAsync(join(__dirname, '..', 'db.json'));
  const db = await lowdb(adapter);

  await db.defaults({
    dividerPositions: {},
    downloadDestination: '',
    torrents: [] as Torrent[],
  }).write();

  const torrentEmitter = new TorrentEmitter();

  io.on('connection', socket => {
    const dispatch = action => socket.emit('dispatch', action);
    torrentEmitter.setDispatch(dispatch);

    dispatch(actions.getState(db.value()));

    socket.on('dispatch', async ({ payload, type }) => {
      console.log(type);
      payload != null && console.log(payload);

      switch (type) {
        // divider position
        case SET_DIVIDER_POSITION_SERVER:
          await db
            .get('dividerPositions')
            // @ts-ignore
            .assign(payload)
            .write();
          return;

        // torrents
        case ADD_TORRENT:
          const torrent = await torrentEmitter.addTorrent(payload, db.get('downloadDestination').value());
          // @ts-ignore
          await db.get('torrents').unshift(torrent).write();
          dispatch(setTorrent(torrent));
          return;
        case DELETE_TORRENT:
          // @ts-ignore
          await db.get('torrents').remove({ magnetLink: payload }).write();
          torrentEmitter.deleteTorrent(payload);
          dispatch(actions.setTorrents(db.get('torrents').value()));
          return;
        case SET_FILE_SELECTED:
          await db
            .get('torrents')
            // @ts-ignore
            .find({ magnetLink: payload.magnetLink })
            .get('files')
            .find({ name: payload.fileName })
            .set('selected', payload.selected)
            .write();
          dispatch(actions.setTorrents(db.get('torrents').value()));
          return;
        case START_TORRENT:
          await db
            .get('torrents')
            // @ts-ignore
            .find({ magnetLink: payload })
            .set('pending', false)
            .write();
          dispatch(actions.setTorrents(db.get('torrents').value()));
          return;

        // settings
        case SET_DOWNLOAD_DESTINATION:
          await db.set('downloadDestination', payload).write();
          return;
      }
    });
  });
}

async function writePortToIndex(port: number) {
  const index = await read(join(__dirname, '../client/index.html'));
  await write(
    join(__dirname, '../public/index.html'),
    index.replace('PORT__ = 0', `PORT__ = ${port}`)
  );
}
