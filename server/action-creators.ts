import { DELETE_TORRENT, SET_DOWNLOAD_DESTINATION, SET_STATE, SET_TORRENT } from '../constants';
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
  type: SET_TORRENT,
});
