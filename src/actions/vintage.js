/* global fetch */ // FOR ESLINT
import {
  VINTAGE_GETLIST,
  VINTAGE_GETLIST_SUCCESS,
  VINTAGE_GETLIST_FAILURE,
  VINTAGE_INSERT,
  VINTAGE_INSERT_SUCCESS,
  VINTAGE_INSERT_FAILURE,
  VINTAGE_MODIFY,
  VINTAGE_MODIFY_SUCCESS,
  VINTAGE_MODIFY_FAILURE,
  VINTAGE_REMOVE,
  VINTAGE_REMOVE_SUCCESS,
  VINTAGE_REMOVE_FAILURE,
  VINTAGE_REMOVEALL,
  VINTAGE_REMOVEALL_SUCCESS,
  VINTAGE_REMOVEALL_FAILURE,
} from './actions';

import { configure } from '../modules';

const API = configure.url;

const getList = function getList() {
  return {
    type: VINTAGE_GETLIST,
  };
};
const getListSuccess = function getListSuccess(list) {
  return {
    type: VINTAGE_GETLIST_SUCCESS,
    list,
  };
};
const getListFailure = function getListFailure(error) {
  return {
    type: VINTAGE_GETLIST_FAILURE,
    error,
  };
};
const getListRequest = function getListRequest() {
  return (dispatch) => {
    dispatch(getList());
    return fetch(`${API}/api/vintage/all`, {
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
    type: VINTAGE_INSERT,
  };
};
const insertSuccess = function insertSuccess(vintage) {
  return {
    type: VINTAGE_INSERT_SUCCESS,
    vintage,
  };
};
const insertFailure = function insertFailure(error) {
  return {
    type: VINTAGE_INSERT_FAILURE,
    error,
  };
};
const insertRequest = function insertRequest(vintage) {
  return (dispatch) => {
    dispatch(insert());
    return fetch(`${API}/api/vintage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        data: vintage,
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
    type: VINTAGE_MODIFY,
  };
};
const modifySuccess = function modifySuccess() {
  return {
    type: VINTAGE_MODIFY_SUCCESS,
  };
};
const modifyFailure = function modifyFailure(error) {
  return {
    type: VINTAGE_MODIFY_FAILURE,
    error,
  };
};
const modifyRequest = function modifyRequest(vintage) {
  return (dispatch) => {
    dispatch(modify());
    return fetch(`${API}/api/vintage`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        data: vintage,
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
    type: VINTAGE_REMOVE,
  };
};
const removeSuccess = function removeSuccess() {
  return {
    type: VINTAGE_REMOVE_SUCCESS,
  };
};
const removeFailure = function removeFailure(error) {
  return {
    type: VINTAGE_REMOVE_FAILURE,
    error,
  };
};
const removeRequest = function removeRequest(vintage) {
  return (dispatch) => {
    dispatch(remove());
    return fetch(`${API}/api/vintage`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        data: vintage,
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
    type: VINTAGE_REMOVEALL,
  };
};
const removeAllSuccess = function removeAllSuccess() {
  return {
    type: VINTAGE_REMOVEALL_SUCCESS,
  };
};
const removeAllFailure = function removeAllFailure(error) {
  return {
    type: VINTAGE_REMOVEALL_FAILURE,
    error,
  };
};
const removeAllRequest = function removeAllRequest() {
  return (dispatch) => {
    dispatch(removeAll());
    return fetch(`${API}/api/vintage/all`, {
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
