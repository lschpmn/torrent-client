import { removeAsync, writeAsync } from 'fs-jetpack';
import { set, unset } from 'lodash';
import { join } from 'path';
import * as WebTorrent from 'webtorrent';
import { Torrent } from '../types';
import StateMachine from './StateMachine';

export type TorrentEmitterState = {
  torrents: {
    [magnetLink: string]: Torrent,
  },
};

export default class TorrentEmitter extends StateMachine<TorrentEmitterState> {
  client = new WebTorrent();

  constructor(torrents?: Torrent[], path?: string) {
    super();
    if (!torrents || !path) return;

    const torrentMap = torrents.reduce((tot, tor) => ({ ...tot, [tor.magnetLink]: tor }), {});
    this.updateState({ torrents: torrentMap });

    torrents.forEach(torrent => {
      this.client.add(getTorrentFilePath(torrent.name), (webTorrent: WebTorrent.Torrent) => {
        webTorrent.deselect(0, webTorrent.pieces.length - 1, 0);

        torrent.files.forEach(file => file.selected &&
          webTorrent.files
            .find(webFile => webFile.path === file.name)
            ?.select());
      });
    });
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

  deleteTorrent(magnetLink: string) {
    const torrent = this.state.torrents[magnetLink];
    if (!torrent) return;

    try {
      this.client.remove(magnetLink);
    } catch (e) {
      console.log('error removing torrent from client');
      console.log(e);
    }

    removeAsync(getTorrentFilePath(torrent.name))
      .catch(e => {
        console.log(`error trying to delete ${torrent.name}.torrent`);
        console.log(e);
      });

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
    } else {
      this.deleteTorrent(magnetLink);
    }
  }

  startTorrent(magnetLink: string) {
    const torrent = this.state.torrents[magnetLink];
    if (!torrent) throw new Error('Torrent does not exist');

    torrent.pending = false;
    this.setTorrent(torrent);
  }

  updateStats() {
    const state = this.state;
    this.client.torrents.forEach(webTorrent => {
      const torrent = state.torrents[webTorrent.magnetURI];
      torrent.downloaded = webTorrent.downloaded;
      torrent.downloadSpeed = webTorrent.downloadSpeed;

      torrent.uploaded = webTorrent.uploaded;
      torrent.uploadSpeed = webTorrent.uploadSpeed;
    });

    this.updateState(state);
  }

  private setTorrent = (torrent: Torrent) =>
    this.updateState(set(this.state, ['torrents', torrent.magnetLink], torrent));

}

const getTorrentFilePath = (name: string) => join(__dirname, '..', 'public', 'torrents', `${name}.torrent`);

const unsetBetter = (obj, path) => {
  unset(obj, path);
  return obj;
};
