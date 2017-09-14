import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {

} from '../actions';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import {
  WineList,
} from '../components';

import {
  loader,
} from '../modules';

const A = () => {
  return (<div>wine</div>);
};
const B = () => {
  return (<div>vintage</div>);
};
const C = () => {
  return (<div>sale</div>);
};


class Wine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/main/wine" component={WineList} />
          <Route path="/main/wine/vintage" component={B} />
          <Route path="/main/wine/sale" component={C} />
          <Redirect to="/main/wine" />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Wine);
