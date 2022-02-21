export const SET_TITLE_QUERY = 'SET_TITLE_QUERY';
export const SET_STARS_QUERY = 'SET_STARS_QUERY';
export const SET_FILE_PATH = 'SET_FILE_PATH';

const initialState = {
  titleQuery: '',
  starsQuery: '',
  filePath: '',
};

export const queryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TITLE_QUERY:
      return {
        ...state,
        titleQuery: action.payload,
      };

    case SET_STARS_QUERY:
      return {
        ...state,
        starsQuery: action.payload,
      };

    case SET_FILE_PATH:
      return {
        ...state,
        filePath: action.payload,
      };

    default:
      return state;
  }
};
