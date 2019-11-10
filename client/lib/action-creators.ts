import { ADD_TORRENT, DELETE_TORRENT, GET_DOWNLOAD_DESTINATION, SET_DOWNLOAD_DESTINATION } from '../../constants';

export const addTorrent = (magnetLink: string) => ({
  payload: magnetLink,
  type: ADD_TORRENT,
});

export const deleteTorrent = (magnetLink: string) => ({
  payload: magnetLink,
  type: DELETE_TORRENT,
});

export const getDownloadDestination = () => ({
  type: GET_DOWNLOAD_DESTINATION,
});

export const setDownloadDestination = (path: string) => ({
  payload: path,
  type: SET_DOWNLOAD_DESTINATION,
});
