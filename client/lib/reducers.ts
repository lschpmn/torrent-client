
export const SET_DOWNLOAD_DESTINATION = 'SET_DOWNLOAD_DESTINATION';

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
    default:
      return state;
  }
}