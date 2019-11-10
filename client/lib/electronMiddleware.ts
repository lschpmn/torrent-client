import { ipcRenderer } from 'electron';
import { GET_DOWNLOAD_DESTINATION } from '../../constants';
import { setDownloadDestination } from './action-creators';

export default store => next => action => {
  if (action.type === GET_DOWNLOAD_DESTINATION) {
    ipcRenderer
      .invoke('explorer', action.paylad)
      .then(path => path && store.dispatch(setDownloadDestination(path)));
  }

  return next(action);
};
