/* global fetch */ // FOR ESLINT
import {
  SHOP_GETLIST,
  SHOP_GETLIST_SUCCESS,
  SHOP_GETLIST_FAILURE,
  SHOP_INSERT,
  SHOP_INSERT_SUCCESS,
  SHOP_INSERT_FAILURE,
  SHOP_MODIFY,
  SHOP_MODIFY_SUCCESS,
  SHOP_MODIFY_FAILURE,
  SHOP_REMOVE,
  SHOP_REMOVE_SUCCESS,
  SHOP_REMOVE_FAILURE,
  SHOP_REMOVEALL,
  SHOP_REMOVEALL_SUCCESS,
  SHOP_REMOVEALL_FAILURE,
} from './actions';

import { configure } from '../modules';

const API = configure.url;

const getList = function getList() {
  return {
    type: SHOP_GETLIST,
  };
};
const getListSuccess = function getListSuccess(list) {
  return {
    type: SHOP_GETLIST_SUCCESS,
    list,
  };
};
const getListFailure = function getListFailure(error) {
  return {
    type: SHOP_GETLIST_FAILURE,
    error,
  };
};
const getListRequest = function getListRequest() {
  return (dispatch) => {
    dispatch(getList());
    return fetch(`${API}/api/shop/all`, {
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
    type: SHOP_INSERT,
  };
};
const insertSuccess = function insertSuccess(shop) {
  return {
    type: SHOP_INSERT_SUCCESS,
    shop,
  };
};
const insertFailure = function insertFailure(error) {
  return {
    type: SHOP_INSERT_FAILURE,
    error,
  };
};
const insertRequest = function insertRequest(shop) {
  return (dispatch) => {
    dispatch(insert());
    return fetch(`${API}/api/shop`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        data: shop,
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
    type: SHOP_MODIFY,
  };
};
const modifySuccess = function modifySuccess() {
  return {
    type: SHOP_MODIFY_SUCCESS,
  };
};
const modifyFailure = function modifyFailure(error) {
  return {
    type: SHOP_MODIFY_FAILURE,
    error,
  };
};
const modifyRequest = function modifyRequest(shop) {
  return (dispatch) => {
    dispatch(modify());
    return fetch(`${API}/api/shop`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        data: shop,
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
    type: SHOP_REMOVE,
  };
};
const removeSuccess = function removeSuccess() {
  return {
    type: SHOP_REMOVE_SUCCESS,
  };
};
const removeFailure = function removeFailure(error) {
  return {
    type: SHOP_REMOVE_FAILURE,
    error,
  };
};
const removeRequest = function removeRequest(shop) {
  return (dispatch) => {
    dispatch(remove());
    return fetch(`${API}/api/shop`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        data: shop,
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
    type: SHOP_REMOVEALL,
  };
};
const removeAllSuccess = function removeAllSuccess() {
  return {
    type: SHOP_REMOVEALL_SUCCESS,
  };
};
const removeAllFailure = function removeAllFailure(error) {
  return {
    type: SHOP_REMOVEALL_FAILURE,
    error,
  };
};
const removeAllRequest = function removeAllRequest() {
  return (dispatch) => {
    dispatch(removeAll());
    return fetch(`${API}/api/shop/all`, {
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
