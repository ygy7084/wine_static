import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import {
  CustomerEntry,
  ManagerEntry,
} from './';
import {
  Page404,
} from '../components';

const App = function App() {
  return (
    <div>
      <Switch>
        <Route path="/manager" component={ManagerEntry} />
        <Route path="/" component={CustomerEntry} />
        <Route component={Page404} />
      </Switch>
    </div>
  );
};
export default App;
