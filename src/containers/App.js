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
import {
  loader,
} from '../modules';

const App = function App() {
  return (
    <div>
      <Switch>
        <Route path="/cside" component={CustomerEntry} />
        <Route path="/" component={ManagerEntry} />
        <Route component={Page404} />
      </Switch>
    </div>
  );
};
export default App;
