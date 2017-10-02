/* global window */
import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import {
  Account,
  Wine,
  Shop,
  Customer,
  CustomerBase,
  Store,
  SaleBulk,
} from './';

import {
  Header,
  Contents,
  Page404,
} from '../components';

class Main extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      menuClose: window.innerWidth < 768,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.menuClick = this.menuClick.bind(this);
  }
  toggleMenu() {
    this.setState({
      menuClose: !this.state.menuClose,
    });
  }
  menuClick(path) {
    this.setState({
      menuClose:
        window.innerWidth < 768 ? true : this.state.menuClose });
    this.props.changePage(`${path}`);
  }
  render() {
    console.log(this.props.accountSession.account, );
    if (
      this.props.accountSession.account && (
      !this.props.accountSession.account.level === '관리자' ||
      !this.props.accountSession.account.level === '매장')
    ) {
      console.log('hi');
      return <Redirect to='/cside'/>
    } else if (
      !this.props.accountSession.account
    ) {
      return <Redirect to='/'/>
    }
    return (
      <div>
        <Route
          path="/"
          render={props => (
            <Header
              {...props}
              toggleMenu={this.toggleMenu}
              menuClick={this.menuClick}
              menuClose={this.state.menuClose}
              account={this.props.accountSession.account}
              logout={this.props.logout}
            />
          )}
        />
        {
            <Contents menuClose={this.state.menuClose} >
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => (
                    this.props.accountSession.account.level === '관리자' ?
                      <Redirect to="/account" /> :
                      <Redirect to="/store" />
                  )}
                />
                <Route path="/account" component={Account} />
                <Route path="/wine" component={Wine} />
                <Route path="/sale" component={SaleBulk} />
                <Route path="/shop" component={Shop} />
                <Route path="/customer" component={Customer} />
                <Route path="/customerbase" component={CustomerBase} />
                <Route path="/store" component={Store} />
                <Route component={Page404} />
              </Switch>
            </Contents>
        }
      </div>
    );
  }
}
const mapStateToProps = state => ({
  accountSession: {
    status: state.account.session.status,
    account: state.account.session.account,
  },
});
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
