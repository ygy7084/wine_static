/* global fetch */ // FOR ESLINT
import {
  CUSTOMERBASE_GETLIST,
  CUSTOMERBASE_GETLIST_SUCCESS,
  CUSTOMERBASE_GETLIST_FAILURE,
  CUSTOMERBASE_INSERT,
  CUSTOMERBASE_INSERT_SUCCESS,
  CUSTOMERBASE_INSERT_FAILURE,
  CUSTOMERBASE_MODIFY,
  CUSTOMERBASE_MODIFY_SUCCESS,
  CUSTOMERBASE_MODIFY_FAILURE,
  CUSTOMERBASE_REMOVE,
  CUSTOMERBASE_REMOVE_SUCCESS,
  CUSTOMERBASE_REMOVE_FAILURE,
  CUSTOMERBASE_REMOVEALL,
  CUSTOMERBASE_REMOVEALL_SUCCESS,
  CUSTOMERBASE_REMOVEALL_FAILURE,
  CUSTOMERBASE_GETSTORE,
  CUSTOMERBASE_GETSTORE_SUCCESS,
  CUSTOMERBASE_GETSTORE_FAILURE,
  CUSTOMERBASE_GETHISTORY,
  CUSTOMERBASE_GETHISTORY_SUCCESS,
  CUSTOMERBASE_GETHISTORY_FAILURE,
} from './actions';

import { configure } from '../modules';

const API = configure.url;

const getList = function getList() {
  return {
    type: CUSTOMERBASE_GETLIST,
  };
};
const getListSuccess = function getListSuccess(list) {
  return {
    type: CUSTOMERBASE_GETLIST_SUCCESS,
    list,
  };
};
const getListFailure = function getListFailure(error) {
  return {
    type: CUSTOMERBASE_GETLIST_FAILURE,
    error,
  };
};
const getListRequest = function getListRequest() {
  return (dispatch) => {
    dispatch(getList());
    return fetch(`${API}/api/customerbase`, {
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
    type: CUSTOMERBASE_INSERT,
  };
};
const insertSuccess = function insertSuccess(customerBase) {
  return {
    type: CUSTOMERBASE_INSERT_SUCCESS,
    customerBase,
  };
};
const insertFailure = function insertFailure(error) {
  return {
    type: CUSTOMERBASE_INSERT_FAILURE,
    error,
  };
};
const insertRequest = function insertRequest(customerBase) {
  return (dispatch) => {
    dispatch(insert());
    return fetch(`${API}/api/customerbase`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        data: customerBase,
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
    type: CUSTOMERBASE_MODIFY,
  };
};
const modifySuccess = function modifySuccess() {
  return {
    type: CUSTOMERBASE_MODIFY_SUCCESS,
  };
};
const modifyFailure = function modifyFailure(error) {
  return {
    type: CUSTOMERBASE_MODIFY_FAILURE,
    error,
  };
};
const modifyRequest = function modifyRequest(customerBase) {
  return (dispatch) => {
    dispatch(modify());
    return fetch(`${API}/api/customerbase`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        data: customerBase,
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
    type: CUSTOMERBASE_REMOVE,
  };
};
const removeSuccess = function removeSuccess() {
  return {
    type: CUSTOMERBASE_REMOVE_SUCCESS,
  };
};
const removeFailure = function removeFailure(error) {
  return {
    type: CUSTOMERBASE_REMOVE_FAILURE,
    error,
  };
};
const removeRequest = function removeRequest(customerBase) {
  return (dispatch) => {
    dispatch(remove());
    return fetch(`${API}/api/customerbase`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        data: customerBase,
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
    type: CUSTOMERBASE_REMOVEALL,
  };
};
const removeAllSuccess = function removeAllSuccess() {
  return {
    type: CUSTOMERBASE_REMOVEALL_SUCCESS,
  };
};
const removeAllFailure = function removeAllFailure(error) {
  return {
    type: CUSTOMERBASE_REMOVEALL_FAILURE,
    error,
  };
};
const removeAllRequest = function removeAllRequest(id) {
  return (dispatch) => {
    dispatch(removeAll());
    return fetch(
      `${API}/api/customerbase/all`, {
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
const getStore = function getStore() {
  return {
    type: CUSTOMERBASE_GETSTORE,
  };
};
const getStoreSuccess = function getStoreSuccess(list) {
  return {
    type: CUSTOMERBASE_GETSTORE_SUCCESS,
    list,
  };
};
const getStoreFailure = function getStoreFailure(error) {
  return {
    type: CUSTOMERBASE_GETSTORE_FAILURE,
    error,
  };
};
const getStoreRequest = function getStoreRequest(id) {
  return (dispatch) => {
    dispatch(getStore());
    return fetch(`${API}/api/customerbase/stored/${id}`, {
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
          return dispatch(getStoreSuccess(res.data));
        }
        return dispatch(getStoreFailure({
          error: null,
          message: '알 수 없는 오류',
        }));
      })
      .catch(e => dispatch(getStoreFailure(e)));
  };
};
const getHistory = function getHistory() {
  return {
    type: CUSTOMERBASE_GETHISTORY,
  };
};
const getHistorySuccess = function getHistorySuccess(list) {
  return {
    type: CUSTOMERBASE_GETHISTORY_SUCCESS,
    list,
  };
};
const getHistoryFailure = function getHistoryFailure(error) {
  return {
    type: CUSTOMERBASE_GETHISTORY_FAILURE,
    error,
  };
};
const getHistoryRequest = function getHistoryRequest(id) {
  return (dispatch) => {
    dispatch(getHistory());
    return fetch(`${API}/api/customerbase/history/${id}`, {
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
          return dispatch(getHistorySuccess(res.data));
        }
        return dispatch(getHistoryFailure({
          error: null,
          message: '알 수 없는 오류',
        }));
      })
      .catch(e => dispatch(getHistoryFailure(e)));
  };
};
export default {
  getListRequest,
  insertRequest,
  modifyRequest,
  removeRequest,
  removeAllRequest,
  getStoreRequest,
  getHistoryRequest,
};
