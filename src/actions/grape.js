/* global fetch */ // FOR ESLINT
import {
  GRAPE_GETLIST,
  GRAPE_GETLIST_SUCCESS,
  GRAPE_GETLIST_FAILURE,
  GRAPE_INSERT,
  GRAPE_INSERT_SUCCESS,
  GRAPE_INSERT_FAILURE,
  GRAPE_REMOVE,
  GRAPE_REMOVE_SUCCESS,
  GRAPE_REMOVE_FAILURE,
  GRAPE_REMOVEALL,
  GRAPE_REMOVEALL_SUCCESS,
  GRAPE_REMOVEALL_FAILURE,
} from './actions';

import { configure } from '../modules';

const API = configure.url;

const getList = function getList() {
  return {
    type: GRAPE_GETLIST,
  };
};
const getListSuccess = function getListSuccess(list) {
  return {
    type: GRAPE_GETLIST_SUCCESS,
    list,
  };
};
const getListFailure = function getListFailure(error) {
  return {
    type: GRAPE_GETLIST_FAILURE,
    error,
  };
};
const getListRequest = function getListRequest() {
  return (dispatch) => {
    dispatch(getList());
    return fetch(`${API}/api/grape`, {
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
    type: GRAPE_INSERT,
  };
};
const insertSuccess = function insertSuccess(grape) {
  return {
    type: GRAPE_INSERT_SUCCESS,
    grape,
  };
};
const insertFailure = function insertFailure(error) {
  return {
    type: GRAPE_INSERT_FAILURE,
    error,
  };
};
const insertRequest = function insertRequest(grape) {
  return (dispatch) => {
    dispatch(insert());
    return fetch(`${API}/api/grape`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        data: grape,
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
const remove = function remove() {
  return {
    type: GRAPE_REMOVE,
  };
};
const removeSuccess = function removeSuccess() {
  return {
    type: GRAPE_REMOVE_SUCCESS,
  };
};
const removeFailure = function removeFailure(error) {
  return {
    type: GRAPE_REMOVE_FAILURE,
    error,
  };
};
const removeRequest = function removeRequest(grape) {
  return (dispatch) => {
    dispatch(remove());
    return fetch(`${API}/api/grape`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        data: grape,
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
    type: GRAPE_REMOVEALL,
  };
};
const removeAllSuccess = function removeAllSuccess() {
  return {
    type: GRAPE_REMOVEALL_SUCCESS,
  };
};
const removeAllFailure = function removeAllFailure(error) {
  return {
    type: GRAPE_REMOVEALL_FAILURE,
    error,
  };
};
const removeAllRequest = function removeAllRequest() {
  return (dispatch) => {
    dispatch(removeAll());
    return fetch(`${API}/api/grape/all`, {
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
  removeRequest,
  removeAllRequest,
};
