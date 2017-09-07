/* global fetch */ // FOR ESLINT
import {
  HISTORY_LISTLOAD,
  HISTORY_LISTLOAD_SUCCESS,
  HISTORY_LISTLOAD_FAILURE,
} from './actions';

const API = 'http://localhost:4000';

const historyListload = function historyListload() {
  return {
    type: HISTORY_LISTLOAD,
  };
};
const historyListloadSuccess = function historyListloadSuccess(list) {
  return {
    type: HISTORY_LISTLOAD_SUCCESS,
    list,
  };
};
const historyListloadFailure = function historyListloadFailure(error) {
  return {
    type: HISTORY_LISTLOAD_FAILURE,
    error,
  };
};
const historyListloadRequest = function historyListloadRequest(phone) {
  return (dispatch) => {
    dispatch(historyListload());
    return fetch(`${API}/api/history/${phone}`, {
      headers: {
        pragma: 'no-cache',
        'cache-control': 'no-cache',
      },
    })
      .then((res) => {
        if (res.ok) { return res.json(); }
        return res.json().then((error) => {
          throw error;
        });
      })
      .then((data) => {
        if (data) {
          const newList = [];
          data.list.forEach((obj) => {
            const temp = JSON.parse(JSON.stringify(obj));
            temp.datetime = new Date(obj.datetime);
            newList.push(temp);
          });
          return dispatch(historyListloadSuccess(newList));
        }
        return dispatch(historyListloadFailure({
          error: null,
          message: '알 수 없는 오류',
        }));
      })
      .catch(error => dispatch(historyListloadFailure(error)));
  };
};


export {
  historyListloadRequest,
};
