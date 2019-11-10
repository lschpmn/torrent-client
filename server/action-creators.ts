import { DELETE_TORRENT, SET_DOWNLOAD_DESTINATION, SET_STATE, SET_TORRENT } from '../constants';
import { Torrent } from '../types';

export function setTorrent(torrent: Torrent) {
  return {
    payload: torrent,
    type: SET_TORRENT,
  };
}

export function getDownloadDestination(path: string) {
  return {
    payload: path,
    type: SET_DOWNLOAD_DESTINATION,
  };
}

export function getState(state) {
  return {
    payload: state,
    type: SET_STATE,
  };
}

export function deleteTorrent(magnetLink: string) {
  return {
    payload: magnetLink,
    type: DELETE_TORRENT,
  };
}
