/* global fetch */ // FOR ESLINT
import {
  LOCATION_GETLIST,
  LOCATION_GETLIST_SUCCESS,
  LOCATION_GETLIST_FAILURE,
  LOCATION_INSERT,
  LOCATION_INSERT_SUCCESS,
  LOCATION_INSERT_FAILURE,
  LOCATION_REMOVE,
  LOCATION_REMOVE_SUCCESS,
  LOCATION_REMOVE_FAILURE,
  LOCATION_REMOVEALL,
  LOCATION_REMOVEALL_SUCCESS,
  LOCATION_REMOVEALL_FAILURE,
} from './actions';

import { configure } from '../modules';

const API = configure.url;

const getList = function getList() {
  return {
    type: LOCATION_GETLIST,
  };
};
const getListSuccess = function getListSuccess(list) {
  const options = {
    country: list.map(
      item => item.country).filter(
      (v, i, a) => v !== '' && a.indexOf(v) === i),
    region: {},
    subregion: {},
  };
  for (const item of list) {
    if (item.country &&
      item.country !== '') {
      if (item.region &&
        item.region !== '') {
        if (!Object.prototype.hasOwnProperty.call(options.region, item.country)) {
          options.region[item.country] = [];
        }
        if (options.region[item.country].indexOf(item.region) < 0) {
          options.region[item.country].push(item.region);
        }
        if (item.subregion &&
          item.subregion !== '') {
          if (!Object.prototype.hasOwnProperty.call(options.subregion, `${item.country}${item.region}`)) {
            options.subregion[`${item.country}${item.region}`] = [];
          }
          if (options.subregion[`${item.country}${item.region}`].indexOf(item.subregion) < 0) {
            options.subregion[`${item.country}${item.region}`].push(item.subregion);
          }
        }
      }
    }
  }
  return {
    type: LOCATION_GETLIST_SUCCESS,
    list,
    options,
  };
};
const getListFailure = function getListFailure(error) {
  return {
    type: LOCATION_GETLIST_FAILURE,
    error,
  };
};
const getListRequest = function getListRequest() {
  return (dispatch) => {
    dispatch(getList());
    return fetch(`${API}/api/location`, {
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
    type: LOCATION_INSERT,
  };
};
const insertSuccess = function insertSuccess(location) {
  return {
    type: LOCATION_INSERT_SUCCESS,
    location,
  };
};
const insertFailure = function insertFailure(error) {
  return {
    type: LOCATION_INSERT_FAILURE,
    error,
  };
};
const insertRequest = function insertRequest(location) {
  return (dispatch) => {
    dispatch(insert());
    return fetch(`${API}/api/location`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        data: location,
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
    type: LOCATION_REMOVE,
  };
};
const removeSuccess = function removeSuccess() {
  return {
    type: LOCATION_REMOVE_SUCCESS,
  };
};
const removeFailure = function removeFailure(error) {
  return {
    type: LOCATION_REMOVE_FAILURE,
    error,
  };
};
const removeRequest = function removeRequest(location) {
  return (dispatch) => {
    dispatch(remove());
    return fetch(`${API}/api/location`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        data: location,
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
    type: LOCATION_REMOVEALL,
  };
};
const removeAllSuccess = function removeAllSuccess() {
  return {
    type: LOCATION_REMOVEALL_SUCCESS,
  };
};
const removeAllFailure = function removeAllFailure(error) {
  return {
    type: LOCATION_REMOVEALL_FAILURE,
    error,
  };
};
const removeAllRequest = function removeAllRequest() {
  return (dispatch) => {
    dispatch(removeAll());
    return fetch(`${API}/api/location/all`, {
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
