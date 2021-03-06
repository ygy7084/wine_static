/* global fetch */ // FOR ESLINT
import {
  ORIGINAL_GETLIST,
  ORIGINAL_GETLIST_SUCCESS,
  ORIGINAL_GETLIST_FAILURE,
  ORIGINAL_BULKINSERT,
  ORIGINAL_BULKINSERT_SUCCESS,
  ORIGINAL_BULKINSERT_FAILURE,
  ORIGINAL_INSERT,
  ORIGINAL_INSERT_SUCCESS,
  ORIGINAL_INSERT_FAILURE,
  ORIGINAL_MODIFY,
  ORIGINAL_MODIFY_SUCCESS,
  ORIGINAL_MODIFY_FAILURE,
  ORIGINAL_REMOVE,
  ORIGINAL_REMOVE_SUCCESS,
  ORIGINAL_REMOVE_FAILURE,
  ORIGINAL_REMOVEALL,
  ORIGINAL_REMOVEALL_SUCCESS,
  ORIGINAL_REMOVEALL_FAILURE,
} from './actions';

import { configure } from '../modules';

const API = configure.url;

const getList = function getList() {
  return {
    type: ORIGINAL_GETLIST,
  };
};
const getListSuccess = function getListSuccess(list) {
  return {
    type: ORIGINAL_GETLIST_SUCCESS,
    list,
  };
};
const getListFailure = function getListFailure(error) {
  return {
    type: ORIGINAL_GETLIST_FAILURE,
    error,
  };
};
const getListRequest = function getListRequest() {
  return (dispatch) => {
    dispatch(getList());
    return fetch(`${API}/api/original/all`, {
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
const bulkInsert = function bulkInsert() {
  return {
    type: ORIGINAL_BULKINSERT,
  };
};
const bulkInsertSuccess = function bulkInsertSuccess() {
  return {
    type: ORIGINAL_BULKINSERT_SUCCESS,
  };
};
const bulkInsertFailure = function bulkInsertFailure(error) {
  return {
    type: ORIGINAL_BULKINSERT_FAILURE,
    error,
  };
};
const bulkInsertRequest = function bulkInsertRequest(bulk) {
  return (dispatch) => {
    dispatch(bulkInsert());
    return fetch(`${API}/api/original/bulk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        data: bulk,
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
          return dispatch(bulkInsertSuccess(res.data));
        }
        return dispatch(bulkInsertFailure({
          error: null,
          message: '알 수 없는 오류',
        }));
      })
      .catch(e => dispatch(bulkInsertFailure(e)));
  };
};
const insert = function insert() {
  return {
    type: ORIGINAL_INSERT,
  };
};
const insertSuccess = function insertSuccess(original) {
  return {
    type: ORIGINAL_INSERT_SUCCESS,
    original,
  };
};
const insertFailure = function insertFailure(error) {
  return {
    type: ORIGINAL_INSERT_FAILURE,
    error,
  };
};
const insertRequest = function insertRequest(original, file) {
  return (dispatch) => {
    dispatch(insert());
    const data = new FormData();
    data.append('file', file);
    data.append('data', JSON.stringify(original));
    return fetch(`${API}/api/original`, {
      method: 'POST',
      credentials: 'include',
      body: data,
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
    type: ORIGINAL_MODIFY,
  };
};
const modifySuccess = function modifySuccess() {
  return {
    type: ORIGINAL_MODIFY_SUCCESS,
  };
};
const modifyFailure = function modifyFailure(error) {
  return {
    type: ORIGINAL_MODIFY_FAILURE,
    error,
  };
};
const modifyRequest = function modifyRequest(original, file) {
  return (dispatch) => {
    dispatch(modify());
    const data = new FormData();
    data.append('file', file);
    data.append('data', JSON.stringify(original));
    return fetch(`${API}/api/original`, {
      method: 'PUT',
      credentials: 'include',
      body: data,
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
    type: ORIGINAL_REMOVE,
  };
};
const removeSuccess = function removeSuccess() {
  return {
    type: ORIGINAL_REMOVE_SUCCESS,
  };
};
const removeFailure = function removeFailure(error) {
  return {
    type: ORIGINAL_REMOVE_FAILURE,
    error,
  };
};
const removeRequest = function removeRequest(original) {
  return (dispatch) => {
    dispatch(remove());
    return fetch(`${API}/api/original`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        data: original,
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
    type: ORIGINAL_REMOVEALL,
  };
};
const removeAllSuccess = function removeAllSuccess() {
  return {
    type: ORIGINAL_REMOVEALL_SUCCESS,
  };
};
const removeAllFailure = function removeAllFailure(error) {
  return {
    type: ORIGINAL_REMOVEALL_FAILURE,
    error,
  };
};
const removeAllRequest = function removeAllRequest() {
  return (dispatch) => {
    dispatch(removeAll());
    return fetch(`${API}/api/original/all`, {
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
  bulkInsertRequest,
  insertRequest,
  modifyRequest,
  removeRequest,
  removeAllRequest,
};
