import { combineReducers } from 'redux';

export const ADD_TORRENT = 'ADD_TORRENT';
export const DELETE_TORRENT = 'DELETE_TORRENT';
export const SET_DOWNLOAD_DESTINATION = 'SET_DOWNLOAD_DESTINATION';
export const SET_STATE = 'SET_STATE';

const getSize = () => Math.random() * Math.pow(1024, Math.ceil(Math.random() * 5));
const TEST_TORRENTS = [
  {
    name: 'Colbert Report',
    size: getSize(),
  },
  {
    name: 'Colbert Report 1',
    size: getSize(),
  },
  {
    name: 'Colbert Report 2',
    size: getSize(),
  },
  {
    name: 'Colbert Report 3',
    size: getSize(),
  },
  {
    name: 'Colbert Report 4',
    size: getSize(),
  },
  {
    name: 'Colbert Report 5',
    size: getSize(),
  },
  {
    name: 'Colbert Report 6',
    size: getSize(),
  },
  {
    name: 'Colbert Report 7',
    size: getSize(),
  },
  {
    name: 'Colbert Report 8',
    size: getSize(),
  },
  {
    name: 'Colbert Report 9',
    size: getSize(),
  },
];

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
      return [...state.slice(0, payload), ...state.slice(payload)];
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