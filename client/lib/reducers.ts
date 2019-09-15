import { combineReducers } from 'redux';
import { Torrent } from '../../types';

export const ADD_TORRENT = 'ADD_TORRENT';
export const DELETE_TORRENT = 'DELETE_TORRENT';
export const SET_DOWNLOAD_DESTINATION = 'SET_DOWNLOAD_DESTINATION';
export const SET_STATE = 'SET_STATE';

function downloadDestination(state=null, { payload, type }) {
  switch (type) {
    case SET_DOWNLOAD_DESTINATION:
      return payload;
    case SET_STATE:
      return payload.downloadDestination;
    default:
      return state;
  }
}

function torrents(state=[] as Torrent[], { payload, type }) {
  switch (type) {
    case ADD_TORRENT:
      return [...state, payload];
    case DELETE_TORRENT:
      return state.filter(torrent => torrent.magnetLink !== payload);
    case SET_STATE:
      return payload.torrents;
    default:
      return state;
  }
}

export default combineReducers({
  downloadDestination,
  torrents,
})