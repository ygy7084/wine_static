/* global fetch */ // FOR ESLINT
import {
  SALE_GETLIST,
  SALE_GETLIST_SUCCESS,
  SALE_GETLIST_FAILURE,
  SALE_INSERT,
  SALE_INSERT_SUCCESS,
  SALE_INSERT_FAILURE,
  SALE_MODIFY,
  SALE_MODIFY_SUCCESS,
  SALE_MODIFY_FAILURE,
  SALE_REMOVE,
  SALE_REMOVE_SUCCESS,
  SALE_REMOVE_FAILURE,
  SALE_REMOVEALL,
  SALE_REMOVEALL_SUCCESS,
  SALE_REMOVEALL_FAILURE,
} from './actions';

import { configure } from '../modules';

const API = configure.url;

const getList = function getList() {
  return {
    type: SALE_GETLIST,
  };
};
const getListSuccess = function getListSuccess(list) {
  return {
    type: SALE_GETLIST_SUCCESS,
    list,
  };
};
const getListFailure = function getListFailure(error) {
  return {
    type: SALE_GETLIST_FAILURE,
    error,
  };
};
const getListRequest = function getListRequest() {
  return (dispatch) => {
    dispatch(getList());
    return fetch(`${API}/api/sale/all`, {
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
    type: SALE_INSERT,
  };
};
const insertSuccess = function insertSuccess(sale) {
  return {
    type: SALE_INSERT_SUCCESS,
    sale,
  };
};
const insertFailure = function insertFailure(error) {
  return {
    type: SALE_INSERT_FAILURE,
    error,
  };
};
const insertRequest = function insertRequest(sale) {
  return (dispatch) => {
    dispatch(insert());
    return fetch(`${API}/api/sale`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        data: sale,
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
    type: SALE_MODIFY,
  };
};
const modifySuccess = function modifySuccess() {
  return {
    type: SALE_MODIFY_SUCCESS,
  };
};
const modifyFailure = function modifyFailure(error) {
  return {
    type: SALE_MODIFY_FAILURE,
    error,
  };
};
const modifyRequest = function modifyRequest(sale) {
  console.log(sale);
  return (dispatch) => {
    dispatch(modify());
    return fetch(`${API}/api/sale`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        data: sale,
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
    type: SALE_REMOVE,
  };
};
const removeSuccess = function removeSuccess() {
  return {
    type: SALE_REMOVE_SUCCESS,
  };
};
const removeFailure = function removeFailure(error) {
  return {
    type: SALE_REMOVE_FAILURE,
    error,
  };
};
const removeRequest = function removeRequest(sale) {
  return (dispatch) => {
    dispatch(remove());
    return fetch(`${API}/api/sale`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        data: sale,
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
    type: SALE_REMOVEALL,
  };
};
const removeAllSuccess = function removeAllSuccess() {
  return {
    type: SALE_REMOVEALL_SUCCESS,
  };
};
const removeAllFailure = function removeAllFailure(error) {
  return {
    type: SALE_REMOVEALL_FAILURE,
    error,
  };
};
const removeAllRequest = function removeAllRequest() {
  return (dispatch) => {
    dispatch(removeAll());
    return fetch(`${API}/api/sale/all`, {
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
