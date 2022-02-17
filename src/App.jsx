/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { useActions } from './hooks/useActions';
import './App.scss';

import { MoviesList } from './components/MoviesList';
import { MovieForm } from './components/MovieForm';
import { SearchBar } from './components/SearchBar';

export const App = () => {
  const { fetchMovies } = useActions();

  useEffect(() => {
    (async function fetchData() {
      fetchMovies();
    }());
  }, []);

  return (
    <>
      <div className="container">
        <div className="wrapper">
          <SearchBar />
          <MoviesList />
        </div>
        <MovieForm />
      </div>
    </>
  );
};
