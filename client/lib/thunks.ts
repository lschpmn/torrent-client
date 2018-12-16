import { ipcRenderer } from 'electron';
import { SET_DOWNLOAD_DESTINATION, SET_STATE } from './reducers';

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