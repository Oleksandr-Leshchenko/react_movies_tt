/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
import {
  FETCH_MOVIES,
  FETCH_MOVIES_ERROR,
  ADD_MOVIE,
  REMOVE_MOVIE,
  SET_MOVIE_TITLE,
  SET_MOVIE_RELEASE_YEAR,
  SET_MOVIE_FORMAT,
  SET_MOVIE_STARS,
  SET_SELECTED_ID,
} from '.';

export const fetchMoviesAction = movies => ({
  type: FETCH_MOVIES,
  payload: movies,
});

export const fetchMoviesErrorAction = message => ({
  type: FETCH_MOVIES_ERROR,
  payload: message,
});

export const addMovieAction = movie => ({
  type: ADD_MOVIE,
  payload: movie,
});

export const removeMovieAction = title => ({
  type: REMOVE_MOVIE,
  payload: title,
});

export const setMovieTitleAction = title => ({
  type: SET_MOVIE_TITLE,
  payload: title,
});

export const setMovieReleaseYearAction = year => ({
  type: SET_MOVIE_RELEASE_YEAR,
  payload: year,
});

export const setMovieFormatAction = format => ({
  type: SET_MOVIE_FORMAT,
  payload: format,
});

export const setMovieStarsAction = stars => ({
  type: SET_MOVIE_STARS,
  payload: stars,
});

export const setSeletedId = id => ({
  type: SET_SELECTED_ID,
  payload: id,
});

const adjustMovies = (movies) => {
  const moviesList = [];

  if (typeof movies === 'string') {
    const prettyMovies = movies.replace(/(?:\r\n|\r|\n)/g, '|').split('||');

    prettyMovies.forEach((movie) => {
      const item = movie.split('|');
      const movieObj = {};

      item.forEach((i) => {
        const a = i.split(': ');

        movieObj[`${a[0]}`] = a[1];
      });

      movieObj.id = Math.random() * 10e9;

      moviesList.push(movieObj);
    });
  }

  return moviesList;
};

export const fetchMovies = fileContent => async(dispatch) => {
  // eslint-disable-next-line max-len
  const url = 'https://gist.githubusercontent.com/k0stik/3028d42973544dd61c3b4ad863378cad/raw/cca50e86dd745c158491adf35bb212d322d58260/movies.txt';

  let response;

  if (fileContent) {
    response = await fileContent.files[0].text();
  } else {
    response = await (await fetch(url)).text();
  }

  const movies = adjustMovies(response.trim());

  try {
    dispatch(fetchMoviesAction(movies));
  } catch {
    dispatch(fetchMoviesErrorAction('Failed to fetch movies'));
  }
};
