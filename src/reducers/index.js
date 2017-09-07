import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import member from './member';
import history from './history';

export default combineReducers({
  routing: routerReducer,
  member,
  history,
});
