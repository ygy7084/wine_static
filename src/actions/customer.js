/* global fetch */ // FOR ESLINT
import {
  CUSTOMER_GETLIST,
  CUSTOMER_GETLIST_SUCCESS,
  CUSTOMER_GETLIST_FAILURE,
  CUSTOMER_INSERT,
  CUSTOMER_INSERT_SUCCESS,
  CUSTOMER_INSERT_FAILURE,
  CUSTOMER_MODIFY,
  CUSTOMER_MODIFY_SUCCESS,
  CUSTOMER_MODIFY_FAILURE,
  CUSTOMER_REMOVE,
  CUSTOMER_REMOVE_SUCCESS,
  CUSTOMER_REMOVE_FAILURE,
  CUSTOMER_REMOVEALL,
  CUSTOMER_REMOVEALL_SUCCESS,
  CUSTOMER_REMOVEALL_FAILURE,
} from './actions';

import { configure } from '../modules';

const API = configure.url;

const getList = function getList() {
  return {
    type: CUSTOMER_GETLIST,
  };
};
const getListSuccess = function getListSuccess(list) {
  return {
    type: CUSTOMER_GETLIST_SUCCESS,
    list,
  };
};
const getListFailure = function getListFailure(error) {
  return {
    type: CUSTOMER_GETLIST_FAILURE,
    error,
  };
};
const getListRequest = function getListRequest() {
  return (dispatch) => {
    dispatch(getList());
    return fetch(`${API}/api/customer/all`, {
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
    type: CUSTOMER_INSERT,
  };
};
const insertSuccess = function insertSuccess(customer) {
  return {
    type: CUSTOMER_INSERT_SUCCESS,
    customer,
  };
};
const insertFailure = function insertFailure(error) {
  return {
    type: CUSTOMER_INSERT_FAILURE,
    error,
  };
};
const insertRequest = function insertRequest(customer) {
  return (dispatch) => {
    dispatch(insert());
    return fetch(`${API}/api/customer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        data: customer,
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
    type: CUSTOMER_MODIFY,
  };
};
const modifySuccess = function modifySuccess() {
  return {
    type: CUSTOMER_MODIFY_SUCCESS,
  };
};
const modifyFailure = function modifyFailure(error) {
  return {
    type: CUSTOMER_MODIFY_FAILURE,
    error,
  };
};
const modifyRequest = function modifyRequest(customer) {
  return (dispatch) => {
    dispatch(modify());
    return fetch(`${API}/api/customer`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        data: customer,
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
    type: CUSTOMER_REMOVE,
  };
};
const removeSuccess = function removeSuccess() {
  return {
    type: CUSTOMER_REMOVE_SUCCESS,
  };
};
const removeFailure = function removeFailure(error) {
  return {
    type: CUSTOMER_REMOVE_FAILURE,
    error,
  };
};
const removeRequest = function removeRequest(customer) {
  return (dispatch) => {
    dispatch(remove());
    return fetch(`${API}/api/customer`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        data: customer,
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
    type: CUSTOMER_REMOVEALL,
  };
};
const removeAllSuccess = function removeAllSuccess() {
  return {
    type: CUSTOMER_REMOVEALL_SUCCESS,
  };
};
const removeAllFailure = function removeAllFailure(error) {
  return {
    type: CUSTOMER_REMOVEALL_FAILURE,
    error,
  };
};
const removeAllRequest = function removeAllRequest() {
  return (dispatch) => {
    dispatch(removeAll());
    return fetch(`${API}/api/customer/all`, {
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
  getListRequest,
  insertRequest,
  modifyRequest,
  removeRequest,
  removeAllRequest,
};
