export const SET_TITLE_QUERY = 'SET_TITLE_QUERY';
export const SET_STARS_QUERY = 'SET_STARS_QUERY';

const initialState = {
  titleQuery: '',
  starsQuery: '',
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

    default:
      return state;
  }
};
