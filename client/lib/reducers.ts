
export const SET_DOWNLOAD_DESTINATION = 'SET_DOWNLOAD_DESTINATION';
export const SET_STATE = 'SET_STATE';

const initialState = {
  downloadDestination: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_DOWNLOAD_DESTINATION:
      return {
        ...state,
        downloadDestination: action.payload,
      };
    case SET_STATE:
      return action.payload;
    default:
      return state;
  }
}