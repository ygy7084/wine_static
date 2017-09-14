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
    original: null,
  },
  modify: {
    status: 'INIT',
  },
  remove: {
    status: 'INIT',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.ORIGINAL_GETLIST:
      return update(state, {
        getList: {
          status: { $set: 'WAITING' },
        },
      });
    case actions.ORIGINAL_GETLIST_SUCCESS:
      return update(state, {
        getList: {
          status: { $set: 'SUCCESS' },
          list: { $set: action.list },
        },
      });
    case actions.ORIGINAL_GETLIST_FAILURE:
      return update(state, {
        getList: {
          status: { $set: 'FAILURE' },
          list: { $set: [] },
        },
      });
    case actions.ORIGINAL_INSERT:
      return update(state, {
        insert: {
          status: { $set: 'WAITING' },
        },
      });
    case actions.ORIGINAL_INSERT_SUCCESS:
      return update(state, {
        insert: {
          status: { $set: 'SUCCESS' },
          original: { $set: action.original },
        },
      });
    case actions.ORIGINAL_INSERT_FAILURE:
      return update(state, {
        insert: {
          status: { $set: 'FAILURE' },
          original: { $set: null },
        },
      });
    case actions.ORIGINAL_MODIFY:
      return update(state, {
        modify: {
          status: { $set: 'WAITING' },
        },
      });
    case actions.ORIGINAL_MODIFY_SUCCESS:
      return update(state, {
        modify: {
          status: { $set: 'SUCCESS' },
        },
      });
    case actions.ORIGINAL_MODIFY_FAILURE:
      return update(state, {
        modify: {
          status: { $set: 'FAILURE' },
        },
      });
    case actions.ORIGINAL_REMOVE:
      return update(state, {
        remove: {
          status: { $set: 'WAITING' },
        },
      });
    case actions.ORIGINAL_REMOVE_SUCCESS:
      return update(state, {
        remove: {
          status: { $set: 'SUCCESS' },
        },
      });
    case actions.ORIGINAL_REMOVE_FAILURE:
      return update(state, {
        remove: {
          status: { $set: 'FAILURE' },
        },
      });
    default:
      return state;
  }
};