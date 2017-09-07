import update from 'react-addons-update';
import {
  actions,
} from '../actions';

const initialState = {
  historyListload: {
    status: 'INIT',
    list: undefined,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.HISTORY_LISTLOAD :
      return update(state, {
        historyListload: {
          status: { $set: 'WAITING' },
        },
      });
    case actions.HISTORY_LISTLOAD_SUCCESS :
      return update(state, {
        historyListload: {
          status: { $set: 'SUCCESS' },
          list: { $set: action.list },
        },
      });
    case actions.HISTORY_LISTLOAD_FAILURE :
      return update(state, {
        historyListload: {
          status: { $set: 'FAILURE' },
        },
      });
    default:
      return state;
  }
};
