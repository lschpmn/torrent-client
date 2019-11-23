import { combineReducers } from 'redux';
import { DELETE_TORRENT, SET_DOWNLOAD_DESTINATION, SET_NEW_TORRENT, SET_STATE, SET_TORRENTS } from '../../constants';
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
    case SET_NEW_TORRENT:
      return [...state, payload];
    case SET_TORRENTS:
      return payload;
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
