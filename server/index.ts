import { readAsync as read, writeAsync as write } from 'fs-jetpack';
import * as getIncrementalPort from 'get-incremental-port';
import { createServer } from 'http';
import * as lowdb from 'lowdb';
import { AdapterAsync } from 'lowdb';
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
import { DbSchema, Torrent } from '../types';
import * as actions from './action-creators';
import TorrentEmitter, { TorrentEmitterState } from './TorrentEmitter';

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
  await writePortToIndex();

  const adapter: AdapterAsync<DbSchema> = new FileAsync(join(__dirname, '..', 'db.json'));
  const db = await lowdb(adapter);
  const server = createServer();
  const torrentEmitter = new TorrentEmitter();
  const io = socketIO(server);

  server.listen(port, () => console.log(`server running on port ${port}`));

  await db.defaults({
    dividerPositions: {},
    downloadDestination: '',
    torrents: [] as Torrent[],
  }).write();

  io.on('connection', socket => {
    const dispatch = action => socket.emit('dispatch', action);

    const listener = async (oldState: TorrentEmitterState) => {
      const torrents = torrentEmitter.state.torrents;
      dispatch(actions.setTorrents(Object.values(torrents)));
      await db.set('torrents', Object.values(torrents)).write();
    };

    torrentEmitter.setDispatch(dispatch);
    torrentEmitter.addListener(listener);
    dispatch(actions.getState(db.value()));

    const downloadDestination = db.get('downloadDestination').value();
    const torrents = db.get('torrents').value();
    if (torrents.length && downloadDestination) torrentEmitter.inflate(torrents, downloadDestination);

    socket.on('dispatch', async ({ payload, type }) => {
      console.log(type);
      payload != null && console.log(payload);

      switch (type) {
        // divider position
        case SET_DIVIDER_POSITION_SERVER:
          await db
            .get('dividerPositions')
            .assign(payload)
            .write();
          return;

        // torrents
        case ADD_TORRENT:
          torrentEmitter.addTorrent(payload, db.get('downloadDestination').value());
          return;
        case DELETE_TORRENT:
          torrentEmitter.deleteTorrent(payload);
          return;
        case SET_FILE_SELECTED:
          torrentEmitter.setFileSelected(payload.magnetLink, payload.fileName, payload.selected);
          return;
        case START_TORRENT:
          torrentEmitter.startTorrent(payload);
          return;

        // settings
        case SET_DOWNLOAD_DESTINATION:
          await db.set('downloadDestination', payload).write();
          return;
      }
    });
  });
}

async function writePortToIndex() {
  const index = await read(join(__dirname, '../client/index.html'));
  await write(
    join(__dirname, '../public/index.html'),
    index.replace('PORT__ = 0', `PORT__ = ${port}`),
  );
}
