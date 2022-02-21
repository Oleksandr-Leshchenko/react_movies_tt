import React from 'react';
import './App.scss';

import { MoviesList } from './components/MoviesList';
import { MovieForm } from './components/MovieForm';
import { SearchBar } from './components/SearchBar';

export const App = () => (
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
