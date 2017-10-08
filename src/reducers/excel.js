import update from 'react-addons-update';
import {
  actions,
} from '../actions';

const initialState = {
  tableToExcel: {
    status: 'INIT',
    file: null,
  },
  excelToTable: {
    status: 'INIT',
    table: [],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.EXCEL_TABLETOEXCEL:
      return update(state, {
        tableToExcel: {
          status: { $set: 'WAITING' },
        },
      });
    case actions.EXCEL_TABLETOEXCEL_SUCCESS:
      return update(state, {
        tableToExcel: {
          status: { $set: 'SUCCESS' },
          file: { $set: action.file },
        },
      });
    case actions.EXCEL_TABLETOEXCEL_FAILURE:
      return update(state, {
        tableToExcel: {
          status: { $set: 'FAILURE' },
          file: { $set: null },
        },
      });
    case actions.EXCEL_EXCELTOTABLE:
      return update(state, {
        excelToTable: {
          status: { $set: 'WAITING' },
        },
      });
    case actions.EXCEL_EXCELTOTABLE_SUCCESS:
      return update(state, {
        excelToTable: {
          status: { $set: 'SUCCESS' },
          table: { $set: action.table },
        },
      });
    case actions.EXCEL_EXCELTOTABLE_FAILURE:
      return update(state, {
        excelTOTable: {
          status: { $set: 'FAILURE' },
          table: { $set: [] },
        },
      });
    default:
      return state;
  }
}
