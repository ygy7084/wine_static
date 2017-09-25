/* global fetch */ // FOR ESLINT
import {
  ACCOUNT_LOGIN,
  ACCOUNT_LOGIN_SUCCESS,
  ACCOUNT_LOGIN_FAILURE,
  ACCOUNT_SESSION,
  ACCOUNT_SESSION_SUCCESS,
  ACCOUNT_SESSION_FAILURE,
  ACCOUNT_LOGOUT,
  ACCOUNT_LOGOUT_SUCCESS,
  ACCOUNT_LOGOUT_FAILURE,
  ACCOUNT_GETLIST,
  ACCOUNT_GETLIST_SUCCESS,
  ACCOUNT_GETLIST_FAILURE,
  ACCOUNT_INSERT,
  ACCOUNT_INSERT_SUCCESS,
  ACCOUNT_INSERT_FAILURE,
  ACCOUNT_MODIFY,
  ACCOUNT_MODIFY_SUCCESS,
  ACCOUNT_MODIFY_FAILURE,
  ACCOUNT_REMOVE,
  ACCOUNT_REMOVE_SUCCESS,
  ACCOUNT_REMOVE_FAILURE,
  ACCOUNT_REMOVEALL,
  ACCOUNT_REMOVEALL_SUCCESS,
  ACCOUNT_REMOVEALL_FAILURE,
} from './actions';

import { configure } from '../modules';

const API = configure.url;

const login = function accountLogin() {
  return {
    type: ACCOUNT_LOGIN,
  };
};
const loginSuccess = function loginSuccess(account) {
  return {
    type: ACCOUNT_LOGIN_SUCCESS,
    account,
  };
};
const loginFailure = function loginFailure(error) {
  return {
    type: ACCOUNT_LOGIN_FAILURE,
    error,
  };
};
const loginRequest = function loginRequest(accountInput) {
  return (dispatch) => {
    dispatch(login());
    return fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        username: accountInput.username,
        password: accountInput.password,
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
    type: ACCOUNT_SESSION,
  };
};
const sessionSuccess = function sessionSuccess(account) {
  return {
    type: ACCOUNT_SESSION_SUCCESS,
    account,
  };
};
const sessionFailure = function sessionFailure(error) {
  return {
    type: ACCOUNT_SESSION_FAILURE,
    error,
  };
};
const sessionRequest = function sessionRequest() {
  return (dispatch) => {
    dispatch(session());
    return fetch(`${API}/auth`, {
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
    type: ACCOUNT_LOGOUT,
  };
};
const logoutSuccess = function logoutSuccess() {
  return {
    type: ACCOUNT_LOGOUT_SUCCESS,
  };
};
const logoutFailure = function logoutFailure(error) {
  return {
    type: ACCOUNT_LOGOUT_FAILURE,
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
const getList = function getList() {
  return {
    type: ACCOUNT_GETLIST,
  };
};
const getListSuccess = function getListSuccess(list) {
  return {
    type: ACCOUNT_GETLIST_SUCCESS,
    list,
  };
};
const getListFailure = function getListFailure(error) {
  return {
    type: ACCOUNT_GETLIST_FAILURE,
    error,
  };
};
const getListRequest = function getListRequest() {
  return (dispatch) => {
    dispatch(getList());
    return fetch(`${API}/api/account`, {
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
          return dispatch(getListSuccess(res.data));
        }
        return dispatch(getListFailure({
          error: null,
          message: '알 수 없는 오류',
        }));
      })
      .catch(e => dispatch(getListFailure(e)));
  };
};
const insert = function insert() {
  return {
    type: ACCOUNT_INSERT,
  };
};
const insertSuccess = function insertSuccess(account) {
  return {
    type: ACCOUNT_INSERT_SUCCESS,
    account,
  };
};
const insertFailure = function insertFailure(error) {
  return {
    type: ACCOUNT_INSERT_FAILURE,
    error,
  };
};
const insertRequest = function insertRequest(account) {
  return (dispatch) => {
    dispatch(insert());
    return fetch(`${API}/api/account`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        data: account,
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
          return dispatch(insertSuccess(res.data));
        }
        return dispatch(insertFailure({
          error: null,
          message: '알 수 없는 오류',
        }));
      })
      .catch(e => dispatch(insertFailure(e)));
  };
};
const modify = function modify() {
  return {
    type: ACCOUNT_MODIFY,
  };
};
const modifySuccess = function modifySuccess() {
  return {
    type: ACCOUNT_MODIFY_SUCCESS,
  };
};
const modifyFailure = function modifyFailure(error) {
  return {
    type: ACCOUNT_MODIFY_FAILURE,
    error,
  };
};
const modifyRequest = function modifyRequest(account) {
  return (dispatch) => {
    dispatch(modify());
    return fetch(`${API}/api/account`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        data: account,
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
          return dispatch(modifySuccess(res.data));
        }
        return dispatch(modifyFailure({
          error: null,
          message: '알 수 없는 오류',
        }));
      })
      .catch(e => dispatch(modifyFailure(e)));
  };
};
const remove = function remove() {
  return {
    type: ACCOUNT_REMOVE,
  };
};
const removeSuccess = function removeSuccess() {
  return {
    type: ACCOUNT_REMOVE_SUCCESS,
  };
};
const removeFailure = function removeFailure(error) {
  return {
    type: ACCOUNT_REMOVE_FAILURE,
    error,
  };
};
const removeRequest = function removeRequest(account) {
  return (dispatch) => {
    dispatch(remove());
    return fetch(`${API}/api/account`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        data: account,
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
          return dispatch(removeSuccess(res.data));
        }
        return dispatch(removeFailure({
          error: null,
          message: '알 수 없는 오류',
        }));
      })
      .catch(e => dispatch(removeFailure(e)));
  };
};
const removeAll = function removeAll() {
  return {
    type: ACCOUNT_REMOVEALL,
  };
};
const removeAllSuccess = function removeAllSuccess() {
  return {
    type: ACCOUNT_REMOVEALL_SUCCESS,
  };
};
const removeAllFailure = function removeAllFailure(error) {
  return {
    type: ACCOUNT_REMOVEALL_FAILURE,
    error,
  };
};
const removeAllRequest = function removeAllRequest() {
  return (dispatch) => {
    dispatch(removeAll());
    return fetch(`${API}/api/account/all`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({}),
    })
      .then((res) => {
        if (res.ok) { return res.json(); }
        return res.json().then((error) => {
          throw error;
        });
      })
      .then((res) => {
        if (res.data) {
          return dispatch(removeAllSuccess(res.data));
        }
        return dispatch(removeAllFailure({
          error: null,
          message: '알 수 없는 오류',
        }));
      })
      .catch(e => dispatch(removeAllFailure(e)));
  };
};
export default {
  loginRequest,
  sessionRequest,
  logoutRequest,
  getListRequest,
  insertRequest,
  modifyRequest,
  removeRequest,
  removeAllRequest,
};
