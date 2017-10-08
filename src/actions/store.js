/* global fetch */ // FOR ESLINT
import {
  STORE_GETLIST,
  STORE_GETLIST_SUCCESS,
  STORE_GETLIST_FAILURE,
  STORE_INSERT,
  STORE_INSERT_SUCCESS,
  STORE_INSERT_FAILURE,
  STORE_BULKINSERT,
  STORE_BULKINSERT_SUCCESS,
  STORE_BULKINSERT_FAILURE,
  STORE_REMOVEALL,
  STORE_REMOVEALL_SUCCESS,
  STORE_REMOVEALL_FAILURE,
} from './actions';

import { configure } from '../modules';

const API = configure.url;

const getList = function getList() {
  return {
    type: STORE_GETLIST,
  };
};
const getListSuccess = function getListSuccess(list, result) {
  return {
    type: STORE_GETLIST_SUCCESS,
    list,
    result
  };
};
const getListFailure = function getListFailure(error) {
  return {
    type: STORE_GETLIST_FAILURE,
    error,
  };
};
const getListRequest = function getListRequest(id) {
  return (dispatch) => {
    dispatch(getList());
    return fetch(id ?
      `${API}/api/store/all/${id}` :
      `${API}/api/store/all`, {
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
          const data = res.data;
          for (const obj of data) {
            if (obj.datetime) {
              obj.datetime = new Date(obj.datetime);
              obj.datetimeString = obj.datetime.toLocaleString();
            } else {
              data.splice(data.findIndex(datum => datum._id === obj._id), 1);
            }
          }
          const sortedData = data.sort((a, b) =>
            b.datetime.getTime() - a.datetime.getTime(),
          );

          const result = [];
          let a = {};
          for (const obj of data) {
            if (a = result.find(o => o.customer._id === obj.customer._id && o.sale._id === obj.sale._id && o.shop._id === obj.shop._id)) {
              a.remain += obj.quantityChange || 0;
            } else {
              result.push({
                _id: obj._id,
                customer: obj.customer,
                sale: obj.sale,
                shop: obj.shop,
                remain: obj.quantityChange,
              });
            }
          }
          return dispatch(getListSuccess(sortedData, result.filter(o => o.remain)));
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
    type: STORE_INSERT,
  };
};
const insertSuccess = function insertSuccess(store) {
  return {
    type: STORE_INSERT_SUCCESS,
    store,
  };
};
const insertFailure = function insertFailure(error) {
  return {
    type: STORE_INSERT_FAILURE,
    error,
  };
};
const insertRequest = function insertRequest(store) {
  return (dispatch) => {
    dispatch(insert());
    return fetch(`${API}/api/store`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        data: store,
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
    type: STORE_BULKINSERT,
  };
};
const bulkInsertSuccess = function bulkInsertSuccess(store) {
  return {
    type: STORE_BULKINSERT_SUCCESS,
    store,
  };
};
const bulkInsertFailure = function bulkInsertFailure(error) {
  return {
    type: STORE_BULKINSERT_FAILURE,
    error,
  };
};
const bulkInsertRequest = function bulkInsertRequest(store) {
  return (dispatch) => {
    dispatch(bulkInsert());
    return fetch(`${API}/api/store/bulk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        data: store,
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
const removeAll = function removeAll() {
  return {
    type: STORE_REMOVEALL,
  };
};
const removeAllSuccess = function removeAllSuccess() {
  return {
    type: STORE_REMOVEALL_SUCCESS,
  };
};
const removeAllFailure = function removeAllFailure(error) {
  return {
    type: STORE_REMOVEALL_FAILURE,
    error,
  };
};
const removeAllRequest = function removeAllRequest() {
  return (dispatch) => {
    dispatch(removeAll());
    return fetch(`${API}/api/store/all`, {
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
  bulkInsertRequest,
  removeAllRequest,
};
