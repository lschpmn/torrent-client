import { removeAsync, writeAsync } from 'fs-jetpack';
import { cloneDeep, set, unset } from 'lodash';
import { join } from 'path';
import * as WebTorrent from 'webtorrent';
import { Listener, Torrent } from '../types';

export type TorrentEmitterState = {
  torrents: {
    [magnetLink: string]: Torrent,
  },
};

export type TorrentEmitterListener = (oldState: TorrentEmitterState) => void;

export default class TorrentEmitter {
  client = new WebTorrent();
  dispatch: Listener;
  private listeners: TorrentEmitterListener[] = [];
  private _state: TorrentEmitterState = {
    torrents: {},
  };

  inflate(torrents: Torrent[], path: string) {
    const torrentMap = torrents.reduce((tot, tor) => ({ ...tot, [tor.magnetLink]: tor }), {});

    this.updateState({ torrents: torrentMap });
  }

  addTorrent(magnetLink: string, path: string) {
    if (this.client.get(magnetLink)) return;

    const stateTorrent: Torrent = {
      added: Date.now(),
      files: [],
      magnetLink,
      pending: true,
    };
    this.setTorrent(stateTorrent);

    this.client.add(magnetLink, { path }, (torrent: WebTorrent.Torrent) => {
      // bug workaround, https://github.com/webtorrent/webtorrent/issues/164#issuecomment-248395202
      torrent.deselect(0, torrent.pieces.length - 1, 0);

      stateTorrent.files = torrent.files.map(file => ({
        name: file.path,
        selected: false,
        size: file.length,
      }));
      stateTorrent.name = torrent.name;
      stateTorrent.size = torrent.length;
      this.setTorrent(stateTorrent);
      writeAsync(getTorrentFilePath(torrent.name), torrent.torrentFile)
        .catch(e => {
          console.log('failed to write torrent file');
          console.log(e);
        });
    });
  }

  async deleteTorrent(magnetLink: string) {
    const torrent = this.state.torrents[magnetLink];
    if (!torrent) return;

    try {
      this.client.remove(magnetLink);
    } catch (e) {
      console.log('error removing torrent from client');
      console.log(e);
    }
    try {
      await removeAsync(getTorrentFilePath(torrent.name));
    } catch (e) {
      console.log('delete file error');
      console.log(e);
    }

    this.updateState(unsetBetter(this.state, ['torrents', magnetLink]));
  }

  setFileSelected(magnetLink: string, fileName: string, isSelected: boolean) {
    const torrent = this.state.torrents[magnetLink];
    if (!torrent) throw new Error('Torrent does not exist');

    torrent.files.forEach(file => file.name === fileName ? file.selected = isSelected : null);
    const clientTorrent = this.client.torrents.find(torrent => torrent.magnetURI === magnetLink);
    if (clientTorrent) {
      clientTorrent.files.find(file => file.path === fileName)?.select();
      this.setTorrent(torrent);
    }
  }

  startTorrent(magnetLink: string) {
    const torrent = this.state.torrents[magnetLink];
    if (!torrent) throw new Error('Torrent does not exist');

    torrent.pending = false;
    this.setTorrent(torrent);
  }

  get state(): TorrentEmitterState {
    return cloneDeep(this._state);
  }

  private setTorrent = (torrent: Torrent) =>
    this.updateState(set(this.state, ['torrents', torrent.magnetLink], torrent));

  private updateState = (newState: TorrentEmitterState) => {
    const oldState = this.state;
    this._state = cloneDeep(newState);
    this.listeners.forEach(listener => listener(oldState));
  };

  setDispatch(dispatch: Listener) {
    this.dispatch = dispatch;
  }

  addListener(listener: TorrentEmitterListener) {
    this.listeners.push(listener);
  }

  removeListener(listener: TorrentEmitterListener) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }
}

const getTorrentFilePath = (name: string) => join(__dirname, '..', 'public', 'torrents', `${name}.torrent`);

const unsetBetter = (obj, path) => {
  unset(obj, path);
  return obj;
};
