import {
  ADD_TORRENT,
  DELETE_TORRENT,
  GET_DOWNLOAD_DESTINATION,
  SET_DOWNLOAD_DESTINATION,
  SET_FILE_SELECTED,
} from '../../constants';

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

export const setFileSelected = (magnetLink: string, fileName: string, selected: boolean,) => ({
  payload: {
    magnetLink,
    fileName,
    selected,
  },
  type: SET_FILE_SELECTED,
});
