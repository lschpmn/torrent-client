import { SET_DOWNLOAD_DESTINATION, SET_NEW_TORRENT, SET_STATE, SET_TORRENTS } from '../constants';
import { Torrent } from '../types';

export const getDownloadDestination = (path: string) => ( {
  payload: path,
  type: SET_DOWNLOAD_DESTINATION,
});

export const getState = (state) => ({
  payload: state,
  type: SET_STATE,
});

export const setTorrent = (torrent: Torrent) => ({
  payload: torrent,
  type: SET_NEW_TORRENT,
});

export const setTorrents = (torrents: Torrent[]) => ({
  payload: torrents,
  type: SET_TORRENTS,
});
