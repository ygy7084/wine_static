/* global window */
import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import {
  customerBase,
  customerAccount,
} from '../actions';
import {
  CustomerMain,
} from './';

import {
  CustomerSideEntry,
  SimpleMessage,
} from '../components';
import {
  loader,
  errorHandler,
  notify,
} from '../modules';

class CustomerEntry extends React.Component {
  constructor(props) {
    super(props);
    this.loginRequest = this.loginRequest.bind(this);
    this.logoutRequest = this.logoutRequest.bind(this);
    this.sessionRequest = this.sessionRequest.bind(this);
    this.preLoginRequest = this.preLoginRequest.bind(this);
    this.initialLoginRequest = this.initialLoginRequest.bind(this);
    this.findPassword = this.findPassword.bind(this);
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
          loader.off();
          window.location = '/cside';
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
          loader.off();
          window.location = '/cside';
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
        loader.off();
      });
  }
  preLoginRequest(phoneInput) {
    loader.on();
    return this.props.customerBasePreLoginRequest(phoneInput)
      .then(() => {
        if (this.props.customerBasePreLogin.status === 'SUCCESS') {
          loader.off();
        } else if (this.props.customerBasePreLogin.status === 'FAILURE') {
          loader.off();
          errorHandler({ message: '로그인에 실패하였습니다.' });
        }
      })
      .catch(() => {
        loader.off();
      });
  }
  initialLoginRequest(data) {
    const { password, email } = data;
    if (!password || password === '') {
      errorHandler({ message: '패스워드를 입력해주십시요.' });
    } else {
      loader.on();
      const input = {
        _id: this.props.customerBasePreLogin.customer,
        password,
        email,
      };
      this.props.customerBaseModifyRequest(input)
        .then((data) => {
          if (this.props.customerBaseModify.status === 'SUCCESS') {
            loader.off();
            this.loginRequest({
              username: this.props.customerBasePreLogin.customer.phone,
              password,
            });
          } else if (this.props.customerBaseModify.status === 'FAILURE') {
            loader.off();
            throw data;
          }
        })
        .catch((data) => {
          loader.off();
          errorHandler(data);
        });
    }
  }
  findPassword(phone) {
    loader.on();
    this.props.customerBaseFindPasswordRequest({ phone })
      .then((data) => {
        if (this.props.customerBaseFindPassword.status === 'SUCCESS') {
          loader.off();
          notify('고객님의 이메일로 전송되었습니다.');
        } else if (this.props.customerBaseFindPassword.status === 'FAILURE') {
          loader.off();
          throw data;
        }
      })
      .catch((data) => {
        loader.off();
        errorHandler(data);
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
              <CustomerMain
                logout={this.logoutRequest}
                sessionRequest={this.sessionRequest}
                {...props} />
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
                preLoginRequest={this.preLoginRequest}
                preLoginStatus={this.props.customerBasePreLogin.status}
                initialLogin={this.props.customerBasePreLogin.initialLogin}
                initialLoginRequest={this.initialLoginRequest}
                findPassword={this.findPassword}
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
  customerBasePreLogin: {
    status: state.customerBase.preLogin.status,
    initialLogin: state.customerBase.preLogin.initialLogin,
    customer: state.customerBase.preLogin.customer,
  },
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
  customerBaseModify: {
    status: state.customerBase.modify.status,
  },
  customerBaseFindPassword: {
    status: state.customerBase.findPassword.status,
  },
});
const mapDispatchToProps = dispatch => bindActionCreators({
  customerBasePreLoginRequest: customerBase.preLoginRequest,
  customerAccountLoginRequest: customerAccount.loginRequest,
  customerAccountSessionRequest: customerAccount.sessionRequest,
  customerAccountLogoutRequest: customerAccount.logoutRequest,
  customerBaseModifyRequest: customerBase.modifyRequest,
  customerBaseFindPasswordRequest: customerBase.findPasswordRequest,
  changePage: path => push(path),
}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomerEntry);
