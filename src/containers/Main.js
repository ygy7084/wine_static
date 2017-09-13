/* global window */
import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { push } from 'react-router-redux'

import { loader } from '../modules';

import {
  Wine,
  Shop,
  Customer,
  Store,
} from './';

import {
  Header,
  Contents,
} from '../components';

class Main extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      menuClose: window.innerWidth < 768,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }
  toggleMenu() {
    this.setState({
      menuClose: !this.state.menuClose,
    });
  }
  render() {
    return (
      <div>
        <a onClick={()=>{this.props.changePage()}} block>
          접속
        </a>
        <Header
          {...this.props}
          toggleMenu={this.toggleMenu}
          menuClose={this.state.menuClose}
        />
        <Contents menuClose={this.state.menuClose} >
          <Switch>
            <Redirect exact from="/main" to="/main/wine" />
            <Route path="/main/wine" component={Wine} />
            <Route path="/main/shop" component={Shop} />
            <Route path="/main/customer" component={Customer} />
            <Route path="/main/store" component={Store} />
            <Redirect to="/main/wine" />
          </Switch>
        </Contents>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('abcde'),
}, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(Main);
