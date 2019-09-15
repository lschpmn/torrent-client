import { SET_DOWNLOAD_DESTINATION, SET_STATE } from '../client/lib/reducers';


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