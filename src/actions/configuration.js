/* global fetch */ // FOR ESLINT
import {
  CONFIGURATION_GET,
  CONFIGURATION_GET_SUCCESS,
  CONFIGURATION_GET_FAILURE,
  CONFIGURATION_MODIFY,
  CONFIGURATION_MODIFY_SUCCESS,
  CONFIGURATION_MODIFY_FAILURE,
} from './actions';

import { configure } from '../modules';

const API = configure.url;

const get = function get() {
  return {
    type: CONFIGURATION_GET,
  };
};
const getSuccess = function getSuccess(configuration) {
  return {
    type: CONFIGURATION_GET_SUCCESS,
    configuration,
  };
};
const getFailure = function getFailure(error) {
  return {
    type: CONFIGURATION_GET_FAILURE,
    error,
  };
};
const getRequest = function getRequest() {
  return (dispatch) => {
    dispatch(get());
    return fetch(`${API}/api/configuration`, {
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
          return dispatch(getSuccess(res.data));
        }
        return dispatch(getFailure({
          error: null,
          message: '알 수 없는 오류',
        }));
      })
      .catch(error => dispatch(getFailure(error)));
  };
};
const modify = function modify() {
  return {
    type: CONFIGURATION_MODIFY,
  };
};
const modifySuccess = function modifySuccess() {
  return {
    type: CONFIGURATION_MODIFY_SUCCESS,
  };
};
const modifyFailure = function modifyFailure(error) {
  return {
    type: CONFIGURATION_MODIFY_FAILURE,
    error,
  };
};
const modifyRequest = function modifyRequest(configuration) {
  return (dispatch) => {
    dispatch(modify());
    return fetch(`${API}/api/configuration`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        data: configuration,
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
export default {
  getRequest,
  modifyRequest,
};
