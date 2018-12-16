import { ipcRenderer } from 'electron';
import { SET_DOWNLOAD_DESTINATION } from './reducers';

export function queryDestinationPath() {
  return dispatch => {
    ipcRenderer.once('explorer', (event, paths) => {
      if (paths) dispatch({
        payload: paths[0],
        type: SET_DOWNLOAD_DESTINATION,
      });
    });

    ipcRenderer.send('explorer');
  };
}