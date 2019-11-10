import { ADD_TORRENT, DELETE_TORRENT } from '../../constants';

export const addTorrent = (magnetLink: string) => ({
  payload: magnetLink,
  type: ADD_TORRENT,
});

export const deleteTorrent = (magnetLink: string) => ({
  payload: magnetLink,
  type: DELETE_TORRENT,
});
