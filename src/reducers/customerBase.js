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
    customerBase: null,
  },
  modify: {
    status: 'INIT',
  },
  remove: {
    status: 'INIT',
  },
  removeAll: {
    status: 'INIT',
  },
  getStore: {
    status: 'INIT',
    list: [],
  },
  getHistory: {
    status: 'INIT',
    list: [],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.CUSTOMERBASE_GETLIST:
      return update(state, {
        getList: {
          status: { $set: 'WAITING' },
        },
      });
    case actions.CUSTOMERBASE_GETLIST_SUCCESS:
      return update(state, {
        getList: {
          status: { $set: 'SUCCESS' },
          list: { $set: action.list },
        },
      });
    case actions.CUSTOMERBASE_GETLIST_FAILURE:
      return update(state, {
        getList: {
          status: { $set: 'FAILURE' },
          list: { $set: [] },
        },
      });
    case actions.CUSTOMERBASE_INSERT:
      return update(state, {
        insert: {
          status: { $set: 'WAITING' },
        },
      });
    case actions.CUSTOMERBASE_INSERT_SUCCESS:
      return update(state, {
        insert: {
          status: { $set: 'SUCCESS' },
          customerbase: { $set: action.customerbase },
        },
      });
    case actions.CUSTOMERBASE_INSERT_FAILURE:
      return update(state, {
        insert: {
          status: { $set: 'FAILURE' },
          customerbase: { $set: null },
        },
      });
    case actions.CUSTOMERBASE_MODIFY:
      return update(state, {
        modify: {
          status: { $set: 'WAITING' },
        },
      });
    case actions.CUSTOMERBASE_MODIFY_SUCCESS:
      return update(state, {
        modify: {
          status: { $set: 'SUCCESS' },
        },
      });
    case actions.CUSTOMERBASE_MODIFY_FAILURE:
      return update(state, {
        modify: {
          status: { $set: 'FAILURE' },
        },
      });
    case actions.CUSTOMERBASE_REMOVE:
      return update(state, {
        remove: {
          status: { $set: 'WAITING' },
        },
      });
    case actions.CUSTOMERBASE_REMOVE_SUCCESS:
      return update(state, {
        remove: {
          status: { $set: 'SUCCESS' },
        },
      });
    case actions.CUSTOMERBASE_REMOVE_FAILURE:
      return update(state, {
        remove: {
          status: { $set: 'FAILURE' },
        },
      });
    case actions.CUSTOMERBASE_REMOVEALL:
      return update(state, {
        removeAll: {
          status: { $set: 'WAITING' },
        },
      });
    case actions.CUSTOMERBASE_REMOVEALL_SUCCESS:
      return update(state, {
        removeAll: {
          status: { $set: 'SUCCESS' },
        },
      });
    case actions.CUSTOMERBASE_REMOVEALL_FAILURE:
      return update(state, {
        removeAll: {
          status: { $set: 'FAILURE' },
        },
      });
    case actions.CUSTOMERBASE_GETSTORE:
      return update(state, {
        getStore: {
          status: { $set: 'WAITING' },
        },
      });
    case actions.CUSTOMERBASE_GETSTORE_SUCCESS:
      return update(state, {
        getStore: {
          status: { $set: 'SUCCESS' },
          list: { $set: action.list },
        },
      });
    case actions.CUSTOMERBASE_GETSTORE_FAILURE:
      return update(state, {
        getStore: {
          status: { $set: 'FAILURE' },
          list: { $set: [] },
        },
      });
    case actions.CUSTOMERBASE_GETHISTORY:
      return update(state, {
        getHistory: {
          status: { $set: 'WAITING' },
        },
      });
    case actions.CUSTOMERBASE_GETHISTORY_SUCCESS:
      return update(state, {
        getHistory: {
          status: { $set: 'SUCCESS' },
          list: { $set: action.list },
        },
      });
    case actions.CUSTOMERBASE_GETHISTORY_FAILURE:
      return update(state, {
        getHistory: {
          status: { $set: 'FAILURE' },
          list: { $set: [] },
        },
      });
    default:
      return state;
  }
};
