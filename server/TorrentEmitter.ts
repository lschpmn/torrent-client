import * as WebTorrent from 'webtorrent';
import { Listener, Torrent } from '../types';
import { clone, set, merge, unset } from 'lodash';

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

  get state(): TorrentEmitterState {
    return clone(this._state);
  }

  inflate(magnetLinks: string[], path: string) {
    // magnetLinks.forEach(magnetLink => this.addTorrent(magnetLink, path));
  }

  addTorrent(magnetLink: string, path: string): Promise<Torrent> {
    if (this.client.get(magnetLink)) return;

    const stateTorrent: Torrent = {
      added: Date.now(),
      files: [],
      magnetLink,
      pending: true,
    };
    this._updateState(set(this.state, ['torrents', magnetLink], stateTorrent));

    return new Promise((resolve => {
      this.client.add(magnetLink, { path }, (torrent: WebTorrent.Torrent) => {
        // bug workaround, https://github.com/webtorrent/webtorrent/issues/164#issuecomment-248395202
        torrent.deselect(0, torrent.pieces.length - 1, 0);

        stateTorrent.files = torrent.files.map(file => ({
          name: file.name,
          selected: false,
          size: file.length,
        }));
        stateTorrent.name = torrent.name;
        stateTorrent.size = torrent.length;
        this._updateState(set(this.state, ['torrents', magnetLink], stateTorrent));

        resolve(stateTorrent);
      });
    }));
  }

  deleteTorrent(magnetLink: string) {
    if (!this.client.get(magnetLink)) return;
    this.client.remove(magnetLink);
    const state = this.state;
    unset(state, ['torrents', magnetLink]);
    this._updateState(state);
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
