import React from 'react';
import { loader } from '../modules';

import {
  Route,
  Switch,
} from 'react-router-dom';

import {
  Customer,
  Manager,
} from './';

import {
  Page404,
  Entry,
} from '../components';

loader.off();
const App = function () {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Entry} />
        <Route path="/customer" component={Customer} />
        <Route path="/manager" component={Manager} />
        <Route component={Page404} />
      </Switch>
    </div>
  );
};


export default App;
