import { ADD_TORRENT } from '../../constants';


export const addTorrent = (magnetLink: string) => ({
  payload: magnetLink,
  type: ADD_TORRENT,
});
