/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import { useActions } from '../hooks/useActions';

export const MovieForm = () => {
  const {
    setMovieTitleAction,
    setMovieReleaseYearAction,
    setMovieFormatAction,
    setMovieStarsAction,
    addMovieAction,
  } = useActions();

  const {
    Title,
    'Release Year': ReleaseYear,
    Format,
    Stars,
    movies,
  } = useSelector(state => state.movieReducer);

  const [isMovieExist, setIsMovieExist] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const movieToAdd = {
      id: Math.random() * 10e9,
      Title,
      'Release Year': ReleaseYear,
      Format,
      Stars,
    };

    if (movies.some(movie => movie.Title === movieToAdd.Title)) {
      setIsMovieExist(true);
    } else {
      setIsMovieExist(false);
      addMovieAction(movieToAdd);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        className={classnames('input', { 'input-warning': isMovieExist })}
        placeholder="Title"
        value={Title}
        onChange={event => setMovieTitleAction(event.target.value)}
        required
      />
      <input
        type="text"
        className="input"
        placeholder="ReleaseYear"
        value={ReleaseYear}
        onChange={event => setMovieReleaseYearAction(event.target.value)}
        required
      />
      <input
        type="text"
        className="input"
        placeholder="Format"
        value={Format}
        onChange={event => setMovieFormatAction(event.target.value)}
        required
      />
      <input
        type="text"
        className="input"
        placeholder="Stars"
        value={Stars}
        onChange={event => setMovieStarsAction(event.target.value)}
        required
      />
      <button
        type="submit"
        className="form__button"
      >
        Add movie
      </button>

      {isMovieExist && (
        <div className="form__warning">
          Movie with this name already exists
        </div>
      )}
    </form>
  );
};
