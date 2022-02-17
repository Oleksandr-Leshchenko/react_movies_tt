/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../hooks/useActions';

export const SearchBar = () => {
  const { titleQuery, starsQuery } = useSelector(state => state.queryReducer);
  const { setTitleQueryAction, setStarsQueryAction } = useActions();

  return (
    <div className="searchBar">
      <input
        type="text"
        className="input"
        placeholder="Search by title"
        value={titleQuery}
        onChange={event => setTitleQueryAction(event.target.value)}
      />
      <input
        type="text"
        className="input"
        placeholder="Search by cast"
        value={starsQuery}
        onChange={event => setStarsQueryAction(event.target.value)}
      />
    </div>
  );
};
