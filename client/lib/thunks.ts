import { ipcRenderer } from 'electron';
import { DELETE_TORRENT, SET_DOWNLOAD_DESTINATION, SET_STATE } from './reducers';

export function addTorrent(magnetLink: string) {
  return dispatch => {
    ipcRenderer.once('torrent-add', (event) => {

    });

    ipcRenderer.send('torrent-add', { magnetLink });
  };
}

export function deleteTorrent(magnetLink: string) {
  return {
    type: DELETE_TORRENT,
    payload: magnetLink,
  };
}

export function getState() {
  return dispatch => {
    ipcRenderer.once('state', (event, state) => {
      dispatch({
        payload: state,
        type: SET_STATE,
      });
    });

    ipcRenderer.send('getState');
  };
}

export function queryDestinationPath() {
  return dispatch => {
    ipcRenderer.once('explorer', (event, path) => {
      if (path) dispatch({
        payload: path,
        type: SET_DOWNLOAD_DESTINATION,
      });
    });

    ipcRenderer.send('explorer');
  };
}