import { cloneDeep, merge, unset } from 'lodash';
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

  setTorrent = (torrent: Torrent) =>
    this._updateState({ torrents: { [torrent.magnetLink]: torrent } });

  get state(): TorrentEmitterState {
    return cloneDeep(this._state);
  }

  inflate(torrents: Torrent[], path: string) {
    const torrentMap = torrents.reduce((tot, tor) => ({ ...tot, [tor.magnetLink]: tor }), {});

    this._updateState({ torrents: torrentMap });
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
    });
  }

  deleteTorrent(magnetLink: string) {
    if (!this.state.torrents[magnetLink]) return;
    this.client.remove(magnetLink);
    const state = this.state;
    unset(state, ['torrents', magnetLink]);
    this._updateState(state);
  }

  setFileSelected(magnetLink: string, fileName: string, isSelected: boolean) {
    const torrent = this.state.torrents[magnetLink];
    if (!torrent) throw new Error('Torrent does not exist');

    torrent.files.forEach(file => file.name === fileName ? file.selected = isSelected : null);
    this.setTorrent(torrent);
  }

  startTorrent(magnetLink: string) {
    const torrent = this.state.torrents[magnetLink];
    if (!torrent) throw new Error('Torrent does not exist');

    torrent.pending = false;
    this.setTorrent(torrent);
  }

  setDispatch(dispatch: Listener) {
    this.dispatch = dispatch;
  }

  addListener(listener: TorrentEmitterListener) {
    this.listeners.push(listener);
  }

  removeListener(listener: TorrentEmitterListener) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  _updateState(newState: TorrentEmitterState) {
    const oldState = this.state;
    this._state = merge({}, oldState, newState);
    this.listeners.forEach(listener => listener(oldState));
  }
}
