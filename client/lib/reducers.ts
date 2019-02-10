import { combineReducers } from 'redux';

export const ADD_TORRENT = 'ADD_TORRENT';
export const DELETE_TORRENT = 'DELETE_TORRENT';
export const SET_DOWNLOAD_DESTINATION = 'SET_DOWNLOAD_DESTINATION';
export const SET_STATE = 'SET_STATE';

const getSize = () => Math.random() * Math.pow(1024, Math.ceil(Math.random() * 5));
const names = ['Colbert Report', 'Colbert Report 1', 'Colbert Report 2', 'Colbert Report 3', 'Colbert Report 4', 'Colbert Report 5', 'Colbert Report 6', 'Colbert Report 7', 'Colbert Report 8', 'Colbert Report 9'];
const TEST_TORRENTS = names.map(name => ({
  added: Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 31,
  name,
  magnetLink: Math.random().toString(35).slice(2),
  size: getSize(),
}));

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

function torrents(state=TEST_TORRENTS, { payload, type }) {
  switch (type) {
    case ADD_TORRENT:
      return [...state, payload];
    case DELETE_TORRENT:
      return state.filter(torrent => torrent.magnetLink !== payload);
    // TODO: setup torrent saving to database
    /*case SET_STATE:
      return payload.torrents;*/
    default:
      return state;
  }
}

export default combineReducers({
  downloadDestination,
  torrents,
})