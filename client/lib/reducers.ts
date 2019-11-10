import { combineReducers } from 'redux';
import { DELETE_TORRENT, SET_DOWNLOAD_DESTINATION, SET_STATE, SET_TORRENT } from '../../constants';
import { Torrent } from '../../types';

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
    case SET_TORRENT:
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
