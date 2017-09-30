import update from 'react-addons-update';
import {
  actions,
} from '../actions';

const initialState = {
  getList: {
    status: 'INIT',
    list: [],
  },
  insert: {
    status: 'INIT',
    sale: null,
  },
  bulkInsert: {
    status: 'INIT',
  },
  modify: {
    status: 'INIT',
  },
  bulkModify: {
    status: 'INIT',
  },
  remove: {
    status: 'INIT',
  },
  bulkRemove: {
    status: 'INIT',
  },
  removeAll: {
    status: 'INIT',
  },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SALE_GETLIST:
      return update(state, {
        getList: {
          status: { $set: 'WAITING' },
        },
      });
    case actions.SALE_GETLIST_SUCCESS:
      return update(state, {
        getList: {
          status: { $set: 'SUCCESS' },
          list: { $set: action.list },
        },
      });
    case actions.SALE_GETLIST_FAILURE:
      return update(state, {
        getList: {
          status: { $set: 'FAILURE' },
          list: { $set: [] },
          options: { $set: {} },
        },
      });
    case actions.SALE_INSERT:
      return update(state, {
        insert: {
          status: { $set: 'WAITING' },
        },
      });
    case actions.SALE_INSERT_SUCCESS:
      return update(state, {
        insert: {
          status: { $set: 'SUCCESS' },
          sale: { $set: action.sale },
        },
      });
    case actions.SALE_INSERT_FAILURE:
      return update(state, {
        insert: {
          status: { $set: 'FAILURE' },
          sale: { $set: null },
        },
      });
    case actions.SALE_BULKINSERT:
      return update(state, {
        bulkInsert: {
          status: { $set: 'WAITING' },
        },
      });
    case actions.SALE_BULKINSERT_SUCCESS:
      return update(state, {
        bulkInsert: {
          status: { $set: 'SUCCESS' },
        },
      });
    case actions.SALE_BULKINSERT_FAILURE:
      return update(state, {
        bulkInsert: {
          status: { $set: 'FAILURE' },
        },
      });
    case actions.SALE_MODIFY:
      return update(state, {
        modify: {
          status: { $set: 'WAITING' },
        },
      });
    case actions.SALE_MODIFY_SUCCESS:
      return update(state, {
        modify: {
          status: { $set: 'SUCCESS' },
        },
      });
    case actions.SALE_MODIFY_FAILURE:
      return update(state, {
        modify: {
          status: { $set: 'FAILURE' },
        },
      });
    case actions.SALE_BULKMODIFY:
      return update(state, {
        bulkModify: {
          status: { $set: 'WAITING' },
        },
      });
    case actions.SALE_BULKMODIFY_SUCCESS:
      return update(state, {
        bulkModify: {
          status: { $set: 'SUCCESS' },
        },
      });
    case actions.SALE_BULKMODIFY_FAILURE:
      return update(state, {
        bulkModify: {
          status: { $set: 'FAILURE' },
        },
      });
    case actions.SALE_REMOVE:
      return update(state, {
        remove: {
          status: { $set: 'WAITING' },
        },
      });
    case actions.SALE_REMOVE_SUCCESS:
      return update(state, {
        remove: {
          status: { $set: 'SUCCESS' },
        },
      });
    case actions.SALE_REMOVE_FAILURE:
      return update(state, {
        remove: {
          status: { $set: 'FAILURE' },
        },
      });
    case actions.SALE_REMOVEALL:
      return update(state, {
        removeAll: {
          status: { $set: 'WAITING' },
        },
      });
    case actions.SALE_REMOVEALL_SUCCESS:
      return update(state, {
        removeAll: {
          status: { $set: 'SUCCESS' },
        },
      });
    case actions.SALE_REMOVEALL_FAILURE:
      return update(state, {
        removeAll: {
          status: { $set: 'FAILURE' },
        },
      });
    case actions.SALE_BULKREMOVE:
      return update(state, {
        bulkRemove: {
          status: { $set: 'WAITING' },
        },
      });
    case actions.SALE_BULKREMOVE_SUCCESS:
      return update(state, {
        bulkRemove: {
          status: { $set: 'SUCCESS' },
        },
      });
    case actions.SALE_BULKREMOVE_FAILURE:
      return update(state, {
        bulkRemove: {
          status: { $set: 'FAILURE' },
        },
      });
    default:
      return state;
  }
};
