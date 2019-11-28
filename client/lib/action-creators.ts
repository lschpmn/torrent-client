import {
  ADD_TORRENT,
  DELETE_TORRENT,
  GET_DOWNLOAD_DESTINATION,
  SET_DIVIDER_POSITION,
  SET_DOWNLOAD_DESTINATION,
  SET_FILE_SELECTED,
  START_TORRENT,
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

export const setDividerPosition = (id: string, percent: number[]) => ({
  payload: {
    [id]: percent,
  },
  type: SET_DIVIDER_POSITION,
});

export const setFileSelected = (magnetLink: string, fileName: string, selected: boolean) => ({
  payload: {
    magnetLink,
    fileName,
    selected,
  },
  type: SET_FILE_SELECTED,
});

export const startTorrent = (magnetLink: string) => ({
  payload: magnetLink,
  type: START_TORRENT,
});
