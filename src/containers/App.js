import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { loader } from '../modules';

import {
  Main,
} from './';

import {
  Entry,
} from '../components';

loader.off();
const App = function app() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Entry} />
        <Route path="/main" render={props => (<Main {...props} />)} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default App;
