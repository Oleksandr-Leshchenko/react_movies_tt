import { SET_TITLE_QUERY, SET_STARS_QUERY } from '.';

export const setTitleQueryAction = query => ({
  type: SET_TITLE_QUERY,
  payload: query,
});

export const setStarsQueryAction = query => ({
  type: SET_STARS_QUERY,
  payload: query,
});
