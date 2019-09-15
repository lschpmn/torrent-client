import { DELETE_TORRENT } from './reducers';

export function addTorrent(magnetLink: string) {
  return dispatch => {

  };
}

export function deleteTorrent(magnetLink: string) {
  return {
    type: DELETE_TORRENT,
    payload: magnetLink,
  };
}
