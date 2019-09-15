import { SET_DOWNLOAD_DESTINATION } from '../client/lib/reducers';


export function getDownloadDestination(path: string) {
  return {
    payload: path,
    type: SET_DOWNLOAD_DESTINATION,
  };
}