import * as WebTorrent from 'webtorrent';
import { SET_TORRENT } from '../constants';
import { Listener } from '../types';

export default class TorrentEmitter {
  client: any;
  dispatch: Listener;

  constructor() {
    this.client = new WebTorrent();
  }

  addTorrent(magnetLink: string, path: string) {
    this.client.add(magnetLink, { path }, torrent => {
      // bug workaround, https://github.com/webtorrent/webtorrent/issues/164#issuecomment-248395202
      torrent.deselect(0, torrent.pieces.length - 1, 0);

      this.dispatch({
        payload: {
          added: Date.now(),
          files: torrent.files.map(file => ({ name: file.name, size: file.length })),
          magnetLink,
          name: torrent.name,
          pending: true,
          size: torrent.length,
        },
        type: SET_TORRENT,
      });
    });
  }

  setDispatch(dispatch: Listener) {
    this.dispatch = dispatch;
  }
}
