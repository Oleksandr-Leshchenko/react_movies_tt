/* eslint-disable max-len */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../hooks/useActions';

export const MoviesList = () => {
  const { movies, selectedId } = useSelector(state => state.movieReducer);
  const {
    titleQuery,
    starsQuery,
  } = useSelector(state => state.queryReducer);
  const {
    removeMovieAction,
    setSeletedId,
    fetchMoviesAction,
    fetchMovies,
    setFilePathAction,
  } = useActions();

  const numberOfPagesMapper = new Array(Math.ceil(movies.length / 10));

  for (let i = 0; i < numberOfPagesMapper.length; i += 1) {
    numberOfPagesMapper[i] = i;
  }

  const [showModal, setShowModal] = useState(false);
  const [fileValidator, setFileValidator] = useState(false);
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(numberOfPagesMapper);

  useEffect(() => {
    setPagesCount(numberOfPagesMapper);
  }, [movies, titleQuery, starsQuery]);

  const filter = (myMovies) => {
    const listOfMovies = myMovies.slice((page - 1) * 10, page * 10);

    return listOfMovies
      .filter(movie => movie.Title.includes(titleQuery))
      .filter(movie => movie.Stars.includes(starsQuery));
  };

  const sortMovies = (listOfMovies) => {
    const sortedMovies = [...listOfMovies].sort((a, b) => a.Title.localeCompare(b.Title));

    for (let i = 0; i < listOfMovies.length; i += 1) {
      if (listOfMovies[i].Title !== sortedMovies[i].Title) {
        return sortedMovies;
      }
    }

    return [...listOfMovies].reverse();
  };

  const fetchFileContent = async(response) => {
    const file = await response;

    const reader = new FileReader();

    reader.readAsDataURL(file.files[0]);
    reader.onload = () => {
      setFilePathAction(reader.result);
    };

    if (file.files[0].size === 0
     || !file.files[0].name.endsWith('.txt')) {
      setFileValidator(true);
    } else {
      fetchMovies(file);
    }
  };

  const handleRemove = (id) => {
    setSeletedId(id);
    setShowModal(true);
  };

  const handleClose = () => {
    setSeletedId(0);
    setShowModal(false);
  };

  const deleteMovie = (title) => {
    removeMovieAction(title);
    setShowModal(false);
  };

  return (
    <ul className="moviesList">
      <div className="moviesList__extras">
        <button
          type="button"
          className="button"
          onClick={() => fetchMovies(false)}
        >
          Load movies from server
        </button>
        <button
          type="button"
          className="button button__sort"
          onClick={() => fetchMoviesAction(sortMovies(movies))}
        >
          Sort
        </button>
        <input
          type="file"
          accept=".txt"
          onChange={event =>
            fetchFileContent(event.target)}
        />
        {fileValidator && (
          <div className="modal_window">
            Invalid file
            <div className="modal_window__buttons">
              <button
                type="button"
                className="modal_window__buttons-close"
                onClick={() => setFileValidator(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      {filter(movies).map(movie => (
        <li key={movie.Title} className="moviesList__item">
          <p>{`Title: ${movie.Title}`}</p>
          {selectedId === movie.id && !showModal && (
            <>
              <p>{`Release Year: ${movie['Release Year']}`}</p>
              <p>{`Format: ${movie.Format}`}</p>
              <p>{`Stars: ${movie.Stars}`}</p>
            </>
          )}
          <div className="moviesList__item-buttons">
            {selectedId === movie.id ? (
              <>
                {!showModal && (
                  <button
                    type="button"
                    className="button"
                    onClick={() => setSeletedId(0)}
                  >
                    Hide info
                  </button>
                )}

                {showModal && (
                  <div className="modal_window">
                    Are you sure you want to delete this movie?
                    <div className="modal_window__buttons">
                      <button
                        type="button"
                        className="modal_window__buttons-delete"
                        onClick={() => deleteMovie(movie.Title)}
                      >
                        Delete
                      </button>

                      <button
                        type="button"
                        className="modal_window__buttons-close"
                        onClick={handleClose}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <button
                type="button"
                className="button"
                onClick={() => setSeletedId(movie.id)}
              >
                Show info
              </button>
            )}

            {showModal && selectedId === movie.id && (
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
              onClick={() => handleRemove(movie.id)}
            >
              Remove movie
            </button>
          </div>
        </li>
      ))}
      <div>
        {pagesCount.map((key, i) => (
          <button
            type="button"
            className="button page-button"
            onClick={() => setPage(i + 1)}
            key={key + 1}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </ul>
  );
};
