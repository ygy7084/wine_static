import update from 'react-addons-update';
import {
  actions,
} from '../actions';

const initialState = {
  login: {
    status: 'INIT',
  },
  session: {
    status: 'INIT',
    account: null,
  },
  logout: {
    status: 'INIT',
  },
  getList: {
    status: 'INIT',
    list: [],
  },
  insert: {
    status: 'INIT',
    account: null,
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
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.ACCOUNT_LOGIN:
      return update(state, {
        login: {
          status: { $set: 'WAITING' },
        },
      });
    case actions.ACCOUNT_LOGIN_SUCCESS:
      return update(state, {
        login: {
          status: { $set: 'SUCCESS' },
        },
      });
    case actions.ACCOUNT_LOGIN_FAILURE:
      return update(state, {
        login: {
          status: { $set: 'FAILURE' },
        },
      });
    case actions.ACCOUNT_SESSION:
      return update(state, {
        session: {
          status: { $set: 'WAITING' },
        },
      });
    case actions.ACCOUNT_SESSION_SUCCESS:
      return update(state, {
        session: {
          status: { $set: 'SUCCESS' },
          account: { $set: action.account },
        },
      });
    case actions.ACCOUNT_SESSION_FAILURE:
      return update(state, {
        session: {
          status: { $set: 'FAILURE' },
          account: { $set: null },
        },
      });
    case actions.ACCOUNT_LOGOUT:
      return update(state, {
        logout: {
          status: { $set: 'WAITING' },
        },
      });
    case actions.ACCOUNT_LOGOUT_SUCCESS:
      return update(state, {
        logout: {
          status: { $set: 'SUCCESS' },
        },
        session: {
          account: { $set: null },
        },
      });
    case actions.ACCOUNT_LOGOUT_FAILURE:
      return update(state, {
        logout: {
          status: { $set: 'FAILURE' },
        },
      });
    case actions.ACCOUNT_GETLIST:
      return update(state, {
        getList: {
          status: { $set: 'WAITING' },
        },
      });
    case actions.ACCOUNT_GETLIST_SUCCESS:
      return update(state, {
        getList: {
          status: { $set: 'SUCCESS' },
          list: { $set: action.list },
        },
      });
    case actions.ACCOUNT_GETLIST_FAILURE:
      return update(state, {
        getList: {
          status: { $set: 'FAILURE' },
          list: { $set: [] },
        },
      });
    case actions.ACCOUNT_INSERT:
      return update(state, {
        insert: {
          status: { $set: 'WAITING' },
        },
      });
    case actions.ACCOUNT_INSERT_SUCCESS:
      return update(state, {
        insert: {
          status: { $set: 'SUCCESS' },
          account: { $set: action.account },
        },
      });
    case actions.ACCOUNT_INSERT_FAILURE:
      return update(state, {
        insert: {
          status: { $set: 'FAILURE' },
          account: { $set: null },
        },
      });
    case actions.ACCOUNT_MODIFY:
      return update(state, {
        modify: {
          status: { $set: 'WAITING' },
        },
      });
    case actions.ACCOUNT_MODIFY_SUCCESS:
      return update(state, {
        modify: {
          status: { $set: 'SUCCESS' },
        },
      });
    case actions.ACCOUNT_MODIFY_FAILURE:
      return update(state, {
        modify: {
          status: { $set: 'FAILURE' },
        },
      });
    case actions.ACCOUNT_REMOVE:
      return update(state, {
        remove: {
          status: { $set: 'WAITING' },
        },
      });
    case actions.ACCOUNT_REMOVE_SUCCESS:
      return update(state, {
        remove: {
          status: { $set: 'SUCCESS' },
        },
      });
    case actions.ACCOUNT_REMOVE_FAILURE:
      return update(state, {
        remove: {
          status: { $set: 'FAILURE' },
        },
      });
    case actions.ACCOUNT_REMOVEALL:
      return update(state, {
        removeAll: {
          status: { $set: 'WAITING' },
        },
      });
    case actions.ACCOUNT_REMOVEALL_SUCCESS:
      return update(state, {
        removeAll: {
          status: { $set: 'SUCCESS' },
        },
      });
    case actions.ACCOUNT_REMOVEALL_FAILURE:
      return update(state, {
        removeAll: {
          status: { $set: 'FAILURE' },
        },
      });
    default:
      return state;
  }
};
