/* global fetch */ // FOR ESLINT
import {
  CUSTOMERACCOUNT_LOGIN,
  CUSTOMERACCOUNT_LOGIN_SUCCESS,
  CUSTOMERACCOUNT_LOGIN_FAILURE,
  CUSTOMERACCOUNT_SESSION,
  CUSTOMERACCOUNT_SESSION_SUCCESS,
  CUSTOMERACCOUNT_SESSION_FAILURE,
  CUSTOMERACCOUNT_LOGOUT,
  CUSTOMERACCOUNT_LOGOUT_SUCCESS,
  CUSTOMERACCOUNT_LOGOUT_FAILURE,
} from './actions';

import { configure } from '../modules';

const API = configure.url;

const login = function customerAccountLogin() {
  return {
    type: CUSTOMERACCOUNT_LOGIN,
  };
};
const loginSuccess = function loginSuccess(customerAccount) {
  return {
    type: CUSTOMERACCOUNT_LOGIN_SUCCESS,
    customerAccount,
  };
};
const loginFailure = function loginFailure(error) {
  return {
    type: CUSTOMERACCOUNT_LOGIN_FAILURE,
    error,
  };
};
const loginRequest = function loginRequest(customerAccountInput) {
  return (dispatch) => {
    dispatch(login());
    return fetch(`${API}/auth/customerlogin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        username: customerAccountInput.username,
        password: customerAccountInput.password,
      }),
    })
      .then((res) => {
        if (res.ok) { return res.json(); }
        return res.json().then((error) => {
          throw error;
        });
      })
      .then((res) => {
        if (res.data) {
          return dispatch(loginSuccess(res.data));
        }
        return dispatch(loginFailure({
          error: null,
          message: '알 수 없는 오류',
        }));
      })
      .catch(error => dispatch(loginFailure(error)));
  };
};
const session = function session() {
  return {
    type: CUSTOMERACCOUNT_SESSION,
  };
};
const sessionSuccess = function sessionSuccess(customerAccount) {
  return {
    type: CUSTOMERACCOUNT_SESSION_SUCCESS,
    customerAccount,
  };
};
const sessionFailure = function sessionFailure(error) {
  return {
    type: CUSTOMERACCOUNT_SESSION_FAILURE,
    error,
  };
};
const sessionRequest = function sessionRequest() {
  return (dispatch) => {
    dispatch(session());
    return fetch(`${API}/customerauth`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'pragma': 'no-cache',
        'cache-control': 'no-cache',
      },
    })
      .then((res) => {
        if (res.ok) { return res.json(); }
        return res.json().then((error) => {
          throw error;
        });
      })
      .then((res) => {
        if (res.data) {
          return dispatch(sessionSuccess(res.data));
        }
        return dispatch(sessionFailure({
          error: null,
          message: '알 수 없는 오류',
        }));
      })
      .catch(e => dispatch(sessionFailure(e)));
  };
};
const logout = function logout() {
  return {
    type: CUSTOMERACCOUNT_LOGOUT,
  };
};
const logoutSuccess = function logoutSuccess() {
  return {
    type: CUSTOMERACCOUNT_LOGOUT_SUCCESS,
  };
};
const logoutFailure = function logoutFailure(error) {
  return {
    type: CUSTOMERACCOUNT_LOGOUT_FAILURE,
    error,
  };
};
const logoutRequest = function logoutRequest() {
  return (dispatch) => {
    dispatch(logout());
    return fetch(`${API}/auth/logout`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'pragma': 'no-cache',
        'cache-control': 'no-cache',
      },
    })
      .then((res) => {
        if (res.ok) { return res.json(); }
        return res.json().then((error) => {
          throw error;
        });
      })
      .then((data) => {
        if (data) {
          return dispatch(logoutSuccess());
        }
        return dispatch(logoutFailure({
          error: null,
          message: '알 수 없는 오류',
        }));
      })
      .catch(error => dispatch(logoutFailure(error)));
  };
};
export default {
  loginRequest,
  sessionRequest,
  logoutRequest,
};
