import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { account } from '../actions';
import {
  Main,
} from './';
import {
  Entry,
  SimpleMessage,
} from '../components';
import { loader, errorHandler } from '../modules';

class ManagerEntry extends React.Component {
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
  loginRequest(accountInput) {
    const { match } = this.props;
    loader.on();
    return this.props.accountLoginRequest(accountInput)
      .then(() => {
        if (this.props.accountLogin.status === 'SUCCESS') {
          loader.off();
          this.sessionRequest(`${match.url}`);
        } else if (this.props.accountLogin.status === 'FAILURE') {
          loader.off();
          errorHandler({ message: '로그인에 실패하였습니다.' });
        }
      })
      .catch(() => {
        loader.off();
      });
  }
  logoutRequest() {
    const { match } = this.props;
    console.log(match);
    loader.on();
    return this.props.accountLogoutRequest()
      .then(() => {
        if (this.props.accountLogout.status === 'SUCCESS') {
          loader.off();
          this.sessionRequest(`${match.url}`);
        } else if (this.props.accountLogoutRequest === 'FAILURE') {
          loader.off();
        }
      })
      .catch(() => {
        loader.off();
      });
  }
  sessionRequest(url) {
    return this.props.accountSessionRequest()
      .then(() => {
        if (this.props.accountLogout.status === 'SUCCESS') {
          loader.off();
          this.props.changePage(url);
        } else if (this.props.accountLogoutRequest === 'FAILURE') {
          loader.off();
          errorHandler({ message: '다시 로그인하십시요.' });
        }
      })
      .catch(() => {
        loader.off();
      });
  }
  render() {
    const { match } = this.props;
    let ManagerEntryPage = null;
    if (this.props.accountSession.status === 'SUCCESS') {
      ManagerEntryPage =
        <Switch>
          <Route
            path={`${match.url}`}
            render={props =>
              <Main logout={this.logoutRequest} {...props} />
            }
          />
        </Switch>;
    } else if (this.props.accountSession.status === 'FAILURE') {
      ManagerEntryPage = (
        <Switch>
          <Route
            exact
            path={`${match.url}`}
            render={props => (
              <Entry
                loginRequest={this.loginRequest}
                {...props}
              />
            )}
          />
          <Redirect to={`${match.url}`} />
        </Switch>
      );
    }
    return (
      <div>
        { ManagerEntryPage }
        <SimpleMessage />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  accountLogin: {
    status: state.account.login.status,
  },
  accountSession: {
    status: state.account.session.status,
    account: state.account.session.account,
  },
  accountLogout: {
    status: state.account.logout.status,
  },
});
const mapDispatchToProps = dispatch => bindActionCreators({
  accountLoginRequest: account.loginRequest,
  accountSessionRequest: account.sessionRequest,
  accountLogoutRequest: account.logoutRequest,
  changePage: path => push(path),
}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManagerEntry);
