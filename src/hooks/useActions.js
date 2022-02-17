import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as movieActionCreators from '../store/reducers/movieReducer/actions';
import * as queryActionCreators from '../store/reducers/queryReducer/actions';

export const useActions = () => {
  const dispatch = useDispatch();
  const ActionCreators = {
    ...movieActionCreators,
    ...queryActionCreators,
  };

  return bindActionCreators(ActionCreators, dispatch);
};
