import * as WebTorrent from 'webtorrent';
import { Listener } from '../types';
import { setTorrent } from './action-creators';

export default class TorrentEmitter {
  client: WebTorrent.Instance;
  dispatch: Listener;

  constructor() {
    this.client = new WebTorrent();
  }

  addTorrent(magnetLink: string, path: string) {
    if (this.client.get(magnetLink)) return;

    this.client.add(magnetLink, { path }, (torrent: WebTorrent.Torrent) => {
      // bug workaround, https://github.com/webtorrent/webtorrent/issues/164#issuecomment-248395202
      torrent.deselect(0, torrent.pieces.length - 1, 0);

      this.dispatch(setTorrent({
        added: Date.now(),
        files: torrent.files.map(file => ({ name: file.name, size: file.length })),
        magnetLink,
        name: torrent.name,
        pending: true,
        size: torrent.length,
      }));
    });
  }

  deleteTorrent(magnetLink: string) {
    if (!this.client.get(magnetLink)) return;
    this.client.remove(magnetLink);
  }

  setDispatch(dispatch: Listener) {
    this.dispatch = dispatch;
  }
}
