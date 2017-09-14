import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import original from './original';

export default combineReducers({
  routing: routerReducer,
  original,
});
