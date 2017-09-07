/* global fetch */ // FOR ESLINT
import {
  MEMBER_POINT_SAVE,
  MEMBER_POINT_SAVE_SUCCESS,
  MEMBER_POINT_SAVE_FAILURE,
  MEMBER_LISTLOAD,
  MEMBER_LISTLOAD_SUCCESS,
  MEMBER_LISTLOAD_FAILURE,
  MEMBER_EDIT,
  MEMBER_EDIT_SUCCESS,
  MEMBER_EDIT_FAILURE,
  MEMBER_DELETE,
  MEMBER_DELETE_SUCCESS,
  MEMBER_DELETE_FAILURE,
  MEMBER_POINTUSE,
  MEMBER_POINTUSE_SUCCESS,
  MEMBER_POINTUSE_FAILURE,
} from './actions';

const API = 'http://localhost:4000';
const pointSave = function pointSave() {
  return {
    type: MEMBER_POINT_SAVE,
  };
};
const pointSaveSuccess = member => ({
  type: MEMBER_POINT_SAVE_SUCCESS,
  member,
});
const pointSaveFailure = error => ({
  type: MEMBER_POINT_SAVE_FAILURE,
  error,
});
const pointSaveRequest = function pointSaveRequest(inputNumber) {
  return (dispatch) => {
    dispatch(pointSave());
    return fetch(`${API}/api/member/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: inputNumber,
        datetime: new Date(),
      }),
    })
      .then((res) => {
        if (res.ok) { return res.json(); }
        return res.json().then((error) => {
          throw error;
        });
      })
      .then((member) => {
        if (member) {
          return dispatch(pointSaveSuccess(member));
        }
        return dispatch(pointSaveFailure({
          error: null,
          message: '알 수 없는 오류',
        }));
      })
      .catch(error => dispatch(pointSaveFailure(error)));
  };
};

const memberListload = () => ({
  type: MEMBER_LISTLOAD,
});
const memberListloadSuccess = list => ({
  type: MEMBER_LISTLOAD_SUCCESS,
  list,
});
const memberListloadFailure = error => ({
  type: MEMBER_LISTLOAD_FAILURE,
  error,
});
const memberListloadRequest = () => (dispatch) => {
  dispatch(memberListload());
  return fetch(`${API}/api/member/all`, {
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
          temp.birth = obj.birth ? new Date(obj.birth) : null;
          newList.push(temp);
        });
        return dispatch(memberListloadSuccess(newList));
      }
      return dispatch(memberListloadFailure({
        error: null,
        message: '알 수 없는 오류',
      }));
    })
    .catch(error => dispatch(memberListloadFailure(error)));
};

const memberEdit = () => ({
  type: MEMBER_EDIT,
});
const memberEditSuccess = () => ({
  type: MEMBER_EDIT_SUCCESS,
});
const memberEditFailure = error => ({
  type: MEMBER_EDIT_FAILURE,
  error,
});
const memberEditRequest = member => (dispatch) => {
  dispatch(memberEdit());
  console.log(member);
  const newMember = member;
  if (newMember.birth) {
    newMember.birth = newMember.birth.getTime();
  } else {
    newMember.birth = null;
  }
  return fetch(`${API}/api/member/edit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newMember),
  })
    .then((res) => {
      if (res.ok) { return res.json(); }
      return res.json().then((error) => {
        throw error;
      });
    })
    .then((success) => {
      if (success) {
        return dispatch(memberEditSuccess());
      }
      return dispatch(memberEditFailure({
        error: null,
        message: '알 수 없는 오류',
      }));
    })
    .catch(error => dispatch(memberEditFailure(error)));
};

const memberDelete = () => ({
  type: MEMBER_DELETE,
});
const memberDeleteSuccess = () => ({
  type: MEMBER_DELETE_SUCCESS,
});
const memberDeleteFailure = error => ({
  type: MEMBER_DELETE_FAILURE,
  error,
});
const memberDeleteRequest = phone => (dispatch) => {
  dispatch(memberDelete());
  return fetch(`${API}/api/member/delete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone }),
  })
    .then((res) => {
      if (res.ok) { return res.json(); }
      return res.json().then((error) => {
        throw error;
      });
    })
    .then((success) => {
      if (success) {
        return dispatch(memberDeleteSuccess());
      }
      return dispatch(memberDeleteFailure({
        error: null,
        message: '알 수 없는 오류',
      }));
    })
    .catch(error => dispatch(memberDeleteFailure(error)));
};
const pointUse = function pointUse() {
  return {
    type: MEMBER_POINTUSE,
  };
};
const pointUseSuccess = function pointUseSuccess(newPoint) {
  return {
    type: MEMBER_POINTUSE_SUCCESS,
    newPoint,
  };
};
const pointUseFailure = function pointUseFailre(error) {
  return {
    type: MEMBER_POINTUSE_FAILURE,
    error,
  };
};
const pointUseRequest = function pointUseRequest(request) {
  console.log({
    phone: request.phone,
    usedPoint: request.usedPoint,
    datetime: new Date().getTime(),
    memo:request.memo
  });
  return (dispatch) => {
    dispatch(pointUse());
    return fetch(`${API}/api/member/use`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: request.phone,
        usedPoint: request.usedPoint,
        datetime: new Date().getTime(),
        memo: request.memo,
      }),
    })
      .then((res) => {
        if (res.ok) { return res.json(); }
        return res.json().then((error) => {
          throw error;
        });
      })
      .then((newPoint) => {
        if (newPoint) {
          return dispatch(pointUseSuccess(newPoint));
        }
        return dispatch(pointUseFailure({
          error: null,
          message: '알 수 없는 오류',
        }));
      })
      .catch(error => dispatch(pointUseFailure(error)));
  };
};

export {
  pointSaveRequest,
  memberListloadRequest,
  memberEditRequest,
  memberDeleteRequest,
  pointUseRequest,
};
