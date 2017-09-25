import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import original from './original';
import vintage from './vintage';
import account from './account';
import shop from './shop';
import sale from './sale';
import customer from './customer';
import store from './store';

export default combineReducers({
  routing: routerReducer,
  original,
  vintage,
  account,
  shop,
  sale,
  customer,
  store,
});
