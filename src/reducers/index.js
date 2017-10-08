import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import original from './original';
import vintage from './vintage';
import account from './account';
import shop from './shop';
import sale from './sale';
import customer from './customer';
import customerBase from './customerBase';
import store from './store';
import grape from './grape';
import location from './location';
import customerAccount from './customerAccount';
import excel from './excel';

export default combineReducers({
  routing: routerReducer,
  original,
  vintage,
  account,
  shop,
  sale,
  customer,
  customerBase,
  store,
  grape,
  location,
  customerAccount,
  excel,
});
