import * as WebTorrent from 'webtorrent';

const client = new WebTorrent();

export const Torrents: { [index: string]: WebTorrent.Torrent } = {};

export function addTorrent(magnetId: string) {
  client.add(magnetId, torrent => {
    // bug workaround, https://github.com/webtorrent/webtorrent/issues/164#issuecomment-248395202
    torrent.deselect(0, torrent.pieces.length - 1, 0);

    Torrents[magnetId] = torrent;
  });
}