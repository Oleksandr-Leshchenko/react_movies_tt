/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../hooks/useActions';

export const MoviesList = () => {
  const { movies, selectedId } = useSelector(state => state.movieReducer);
  const { titleQuery, starsQuery } = useSelector(state => state.queryReducer);
  const {
    removeMovieAction,
    setSeletedId,
    fetchMoviesSuccessAction,
  } = useActions();
  const filter = (listOfMovies) => {
    return listOfMovies
      .filter(movie => movie.Title.includes(titleQuery))
      .filter(movie => movie.Stars.includes(starsQuery));
  };

  const sortMovies = (listOfMovies) => {
    return listOfMovies.sort((a, b) => a.Title.localeCompare(b.Title));
  };

  return (
    <ul className="moviesList">
      <button
        type="button"
        className="button button__sort"
        onClick={() => fetchMoviesSuccessAction(sortMovies(movies))}
      >
        Sort
      </button>
      {filter(movies).map(movie => (
        <li key={movie.Title} className="moviesList__item">
          <p>{`Title: ${movie.Title}`}</p>
          {selectedId === movie.id && (
            <>
              <p>{`Release Year: ${movie['Release Year']}`}</p>
              <p>{`Format: ${movie.Format}`}</p>
              <p>{`Stars: ${movie.Stars}`}</p>
            </>
          )}
          <div className="moviesList__item-buttons">
            {selectedId === movie.id ? (
              <button
                type="button"
                className="button"
                onClick={() => setSeletedId(0)}
              >
                Hide info
              </button>
            ) : (
              <button
                type="button"
                className="button"
                onClick={() => setSeletedId(movie.id)}
              >
                Show info
              </button>
            )}

            <button
              type="button"
              className="button button__remove"
              onClick={() => removeMovieAction(movie.Title)}
            >
              Remove movie
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
