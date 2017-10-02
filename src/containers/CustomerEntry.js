import React from 'react';
import {
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import {
  sale,
  store,
  customer,
  shop,
  customerBase,
  customerAccount,
} from '../actions';
import {
  CustomerSide,
  CustomerMain,
} from './';

import {
  CustomerSideEntry,
  Page404,
  SimpleMessage,
} from '../components';
import {
  loader,
  errorHandler,
} from '../modules';

class CustomerEntry extends React.Component {
  constructor(props) {
    super(props);
    this.loginRequest = this.loginRequest.bind(this);
    this.logoutRequest = this.logoutRequest.bind(this);
    this.sessionRequest = this.sessionRequest.bind(this);
  }
  componentWillMount() {
    loader.off();
    this.sessionRequest(`${this.props.location.pathname}`);
  }
  loginRequest(customerAccountInput) {
    loader.on();
    return this.props.customerAccountLoginRequest(customerAccountInput)
      .then(() => {
        if (this.props.customerAccountLogin.status === 'SUCCESS') {
          this.sessionRequest('/');
        } else if (this.props.customerAccountLogin.status === 'FAILURE') {
          loader.off();
          errorHandler({ message: '로그인에 실패하였습니다.' });
        }
      })
      .catch(() => {
        loader.off();
      });
  }
  logoutRequest() {
    loader.on();
    return this.props.customerAccountLogoutRequest()
      .then(() => {
        if (this.props.customerAccountLogout.status === 'SUCCESS') {
          this.sessionRequest('/');
        } else if (this.props.customerAccountLogoutRequest === 'FAILURE') {
          loader.off();
        }
      })
      .catch(() => {
        loader.off();
      });
  }
  sessionRequest(url) {
    return this.props.customerAccountSessionRequest()
      .then(() => {
        if (this.props.customerAccountLogout.status === 'SUCCESS') {
          loader.off();
          this.props.changePage(url);
        } else if (this.props.customerAccountLogoutRequest === 'FAILURE') {
          loader.off();
          errorHandler({ message: '다시 로그인하십시요.' });
        }
      })
      .catch((e) => {
        console.log(e);
        loader.off();
      });
  }
  render() {
    let CustomerEntryPage = null;
    if (this.props.customerAccountSession.status === 'SUCCESS') {
      CustomerEntryPage = (
        <Switch>
          <Route
            path="/cside"
            render={props =>
              <CustomerMain logout={this.logoutRequest} {...props} />
            }
          />
        </Switch>
      );
    } else if (this.props.customerAccountSession.status === 'FAILURE') {
      CustomerEntryPage = (
        <Switch>
          <Route
            exact
            path="/cside"
            render={props => (
              <CustomerSideEntry
                loginRequest={this.loginRequest}
                {...props}
              />
            )}
          />
        </Switch>
      );
    }
    return (
      <div>
        { CustomerEntryPage }
        <SimpleMessage />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  customerAccountLogin: {
    status: state.customerAccount.login.status,
  },
  customerAccountSession: {
    status: state.customerAccount.session.status,
    customerAccount: state.customerAccount.session.customerAccount,
  },
  customerAccountLogout: {
    status: state.customerAccount.logout.status,
  },
});
const mapDispatchToProps = dispatch => bindActionCreators({
  customerAccountLoginRequest: customerAccount.loginRequest,
  customerAccountSessionRequest: customerAccount.sessionRequest,
  customerAccountLogoutRequest: customerAccount.logoutRequest,
  changePage: path => push(path),
}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomerEntry);
