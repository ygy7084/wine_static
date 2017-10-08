/* global fetch */
import {
  EXCEL_TABLETOEXCEL,
  EXCEL_TABLETOEXCEL_SUCCESS,
  EXCEL_TABLETOEXCEL_FAILURE,
  EXCEL_EXCELTOTABLE,
  EXCEL_EXCELTOTABLE_SUCCESS,
  EXCEL_EXCELTOTABLE_FAILURE,
} from './actions';

import { configure } from '../modules';

const API = configure.url;

const tableToExcel = function tableToExcel() {
  return {
    type: EXCEL_TABLETOEXCEL,
  };
};
const tableToExcelSuccess = function tableToExcelSuccess(file) {
  return {
    type: EXCEL_TABLETOEXCEL_SUCCESS,
    file,
  };
};
const tableToExcelFailure = function tableToExcelFailure(error) {
  return {
    type: EXCEL_TABLETOEXCEL_FAILURE,
    error,
  };
};
const tableToExcelRequest = function tableToExcelRequest(table) {
  return (dispatch) => {
    dispatch(tableToExcel());
    return fetch(`${API}/api/excel/tabletoexcel`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: table,
      }),
    })
      .then((res) => {
        if (res.ok) { return res.blob(); }
        return res.json().then((error) => {
          throw error;
        });
      })
      .then(file => {
        if (file) {
          return dispatch(tableToExcelSuccess(file));
        }
        return dispatch(tableToExcelFailure({
          error: null,
          message: '에러가 있습니다.',
        }));
      })
      .catch(e => dispatch(tableToExcelFailure(e)));
  };
};

const excelToTable = function excelToTable() {
  return {
    type: EXCEL_EXCELTOTABLE,
  };
};
const excelToTableSuccess = function excelToTableSuccess(table) {
  return {
    type: EXCEL_EXCELTOTABLE_SUCCESS,
    table,
  };
};
const excelToTableFailure = function excelToTableFailure(error) {
  return {
    type: EXCEL_EXCELTOTABLE_FAILURE,
    error,
  };
};
const excelToTableRequest = function excelToTableRequest(file, mode) {
  return (dispatch) => {
    dispatch(excelToTable());
    const data = new FormData();
    data.append('file', file);
    return fetch(`${configure.url}/api/excel/exceltotable/${mode}`, {
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
          return dispatch(excelToTableSuccess(res.data));
        }
        return dispatch(excelToTableFailure({
          error: null,
          message: '알 수 없는 오류',
        }));
      })
      .catch(e => dispatch(excelToTableFailure(e)));
  };
};
export default {
  tableToExcelRequest,
  excelToTableRequest,
};
