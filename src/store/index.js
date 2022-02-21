import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { movieReducer } from './reducers/movieReducer';
import { queryReducer } from './reducers/queryReducer';

const reducer = combineReducers({
  movieReducer,
  queryReducer,
});

export const store = createStore(reducer, applyMiddleware(thunk));
