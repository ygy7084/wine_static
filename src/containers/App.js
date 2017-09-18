import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { loader } from '../modules';

import {
  Main,
  CustomerSide,
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
        <Route path="/test" component={CustomerSide} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default App;
