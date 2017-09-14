/* global fetch */ // FOR ESLINT
import {
  ORIGINAL_GETLIST,
  ORIGINAL_GETLIST_SUCCESS,
  ORIGINAL_GETLIST_FAILURE,
  ORIGINAL_INSERT,
  ORIGINAL_INSERT_SUCCESS,
  ORIGINAL_INSERT_FAILURE,
  ORIGINAL_MODIFY,
  ORIGINAL_MODIFY_SUCCESS,
  ORIGINAL_MODIFY_FAILURE,
  ORIGINAL_REMOVE,
  ORIGINAL_REMOVE_SUCCESS,
  ORIGINAL_REMOVE_FAILURE,
} from './actions';

const API = 'http://220.230.112.62:4000';
// const API = 'http://localhost:8080';

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
    return fetch(`${API}/api/wine/all`, {
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
const insertRequest = function insertRequest(original) {
  return (dispatch) => {
    dispatch(insert());
    return fetch(`${API}/api/wine`, {
      method: 'POST',
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
const modifyRequest = function modifyRequest(original) {
  return (dispatch) => {
    dispatch(modify());
    return fetch(`${API}/api/wine`, {
      method: 'PUT',
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
const removeRequest = function removeRequest(originalId) {
  return (dispatch) => {
    dispatch(remove());
    return fetch(`${API}/api/wine`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        data: originalId,
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

export default {
  getListRequest,
  insertRequest,
  modifyRequest,
  removeRequest,
};
