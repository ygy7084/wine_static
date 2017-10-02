/* global fetch */ // FOR ESLINT
import {
  SALE_GETLIST,
  SALE_GETLIST_SUCCESS,
  SALE_GETLIST_FAILURE,
  SALE_INSERT,
  SALE_INSERT_SUCCESS,
  SALE_INSERT_FAILURE,
  SALE_BULKINSERT,
  SALE_BULKINSERT_SUCCESS,
  SALE_BULKINSERT_FAILURE,
  SALE_MODIFY,
  SALE_MODIFY_SUCCESS,
  SALE_MODIFY_FAILURE,
  SALE_BULKMODIFY,
  SALE_BULKMODIFY_SUCCESS,
  SALE_BULKMODIFY_FAILURE,
  SALE_REMOVE,
  SALE_REMOVE_SUCCESS,
  SALE_REMOVE_FAILURE,
  SALE_BULKREMOVE,
  SALE_BULKREMOVE_SUCCESS,
  SALE_BULKREMOVE_FAILURE,
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
const getListRequest = function getListRequest(id) {
  return (dispatch) => {
    dispatch(getList());
    return fetch(id ?
      `${API}/api/sale/all/${id}` :
      `${API}/api/sale/all`, {
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
const bulkInsert = function bulkInsert() {
  return {
    type: SALE_BULKINSERT,
  };
};
const bulkInsertSuccess = function bulkInsertSuccess(sale) {
  return {
    type: SALE_BULKINSERT_SUCCESS,
    sale,
  };
};
const bulkInsertFailure = function bulkInsertFailure(error) {
  return {
    type: SALE_BULKINSERT_FAILURE,
    error,
  };
};
const bulkInsertRequest = function bulkInsertRequest(sale) {
  return (dispatch) => {
    dispatch(bulkInsert());
    return fetch(`${API}/api/sale/bulk`, {
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
const bulkModify = function bulkModify() {
  return {
    type: SALE_BULKMODIFY,
  };
};
const bulkModifySuccess = function bulkModifySuccess(sale) {
  return {
    type: SALE_BULKMODIFY_SUCCESS,
    sale,
  };
};
const bulkModifyFailure = function bulkModifyFailure(error) {
  return {
    type: SALE_BULKMODIFY_FAILURE,
    error,
  };
};
const bulkModifyRequest = function bulkModifyRequest(sale) {
  return (dispatch) => {
    dispatch(bulkModify());
    return fetch(`${API}/api/sale/bulk`, {
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
          return dispatch(bulkModifySuccess(res.data));
        }
        return dispatch(bulkModifyFailure({
          error: null,
          message: '알 수 없는 오류',
        }));
      })
      .catch(e => dispatch(bulkModifyFailure(e)));
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
const removeAllRequest = function removeAllRequest(id) {
  return (dispatch) => {
    dispatch(removeAll());
    return fetch(id ?
      `${API}/api/sale/all/${id}` :
      `${API}/api/sale/all`, {
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
const bulkRemove = function bulkRemove() {
  return {
    type: SALE_BULKREMOVE,
  };
};
const bulkRemoveSuccess = function bulkRemoveSuccess(sale) {
  return {
    type: SALE_BULKREMOVE_SUCCESS,
    sale,
  };
};
const bulkRemoveFailure = function bulkRemoveFailure(error) {
  return {
    type: SALE_BULKREMOVE_FAILURE,
    error,
  };
};
const bulkRemoveRequest = function bulkRemoveRequest(sale) {
  return (dispatch) => {
    dispatch(bulkRemove());
    return fetch(`${API}/api/sale/bulk`, {
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
          return dispatch(bulkRemoveSuccess(res.data));
        }
        return dispatch(bulkRemoveFailure({
          error: null,
          message: '알 수 없는 오류',
        }));
      })
      .catch(e => dispatch(bulkRemoveFailure(e)));
  };
};
export default {
  getListRequest,
  insertRequest,
  bulkInsertRequest,
  modifyRequest,
  bulkModifyRequest,
  removeRequest,
  removeAllRequest,
  bulkRemoveRequest,
};
