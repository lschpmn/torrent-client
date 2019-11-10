import * as WebTorrent from 'webtorrent';
import { Torrent } from '../types';

/*const client = new WebTorrent();

client.on('error', err => {
  console.log(err);
});*/

export function addTorrent(magnetId: string, path: string): Torrent {
  return {
    added: Date.now(),
    files: [{ name: 'name', size: 23412342 }],
    magnetLink: magnetId,
    name: 'asdfasf',
    pending: true,
    size: 234234232,
  };
  /*return new Promise(((resolve, reject) => {
    client.add(magnetId, { path }, torrent => {
      // bug workaround, https://github.com/webtorrent/webtorrent/issues/164#issuecomment-248395202
      torrent.deselect(0, torrent.pieces.length - 1, 0);

      resolve({
        added: Date.now(),
        files: torrent.files.map(file => ({ name: file.name, size: file.length })),
        magnetLink: magnetId,
        name: torrent.name,
        pending: true,
        size: torrent.length,
      });
    });
  }));*/
}
