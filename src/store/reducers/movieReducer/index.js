/* eslint-disable no-console */
/* eslint-disable implicit-arrow-linebreak */
export const FETCH_MOVIES = 'FETCH_MOVIES';
export const FETCH_MOVIES_ERROR = 'FETCH_MOVIES_ERROR';
export const ADD_MOVIE = 'ADD_MOVIE';
export const REMOVE_MOVIE = 'REMOVE_MOVIE';
export const SET_MOVIE_TITLE = 'SET_MOVIE_TITLE';
export const SET_MOVIE_RELEASE_YEAR = 'SET_MOVIE_RELEASE_YEAR';
export const SET_MOVIE_FORMAT = 'SET_MOVIE_FORMAT';
export const SET_MOVIE_STARS = 'SET_MOVIE_STARS';
export const SET_SELECTED_ID = 'SET_SELECTED_ID';

const initialState = {
  movies: [],
  id: 0,
  Title: '',
  'Release Year': '',
  Format: 'VHS',
  Stars: '',
  selectedId: 0,
  errorMessage: '',
};

export const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES:
      return {
        ...state,
        movies: action.payload,
      };

    case FETCH_MOVIES_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };

    case ADD_MOVIE:
      return {
        ...initialState,
        movies: [...state.movies, action.payload],
      };

    case REMOVE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter(movie => movie.Title !== action.payload),
      };

    case SET_MOVIE_TITLE:
      return {
        ...state,
        Title: action.payload,
      };

    case SET_MOVIE_RELEASE_YEAR:
      return {
        ...state,
        'Release Year': action.payload,
      };

    case SET_MOVIE_FORMAT:
      return {
        ...state,
        Format: action.payload,
      };

    case SET_MOVIE_STARS:
      return {
        ...state,
        Stars: action.payload,
      };

    case SET_SELECTED_ID:
      return {
        ...state,
        selectedId: action.payload,
      };

    default:
      return state;
  }
};
