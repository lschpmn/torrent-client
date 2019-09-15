import { DELETE_TORRENT, SET_STATE } from './reducers';
import { getState as getStateFromSocket } from './services';

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

export function getState() {
  return async dispatch => {
    const state = await getStateFromSocket();

    return dispatch({
      payload: state,
      type: SET_STATE,
    });
  };
}
