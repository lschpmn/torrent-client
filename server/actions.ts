import { ADD_TORRENT, DELETE_TORRENT, SET_DOWNLOAD_DESTINATION, SET_STATE } from '../client/lib/reducers';
import { Torrent } from '../types';

export function addTorrent(torrent: Torrent) {
  return {
    payload: torrent,
    type: ADD_TORRENT,
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