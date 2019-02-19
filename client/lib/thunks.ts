import { ipcRenderer } from 'electron';
import { DELETE_TORRENT, SET_DOWNLOAD_DESTINATION, SET_STATE } from './reducers';
import { getState as getStateFromSocket, saveDownloadDestination } from './services';

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

export function queryDestinationPath() {
  return dispatch => {
    ipcRenderer.once('explorer', (event, path) => {
      if (path) {
        saveDownloadDestination(path);
        dispatch({
          payload: path,
          type: SET_DOWNLOAD_DESTINATION,
        });
      }
    });

    ipcRenderer.send('explorer');
  };
}