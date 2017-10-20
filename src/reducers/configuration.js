import update from 'react-addons-update';
import {
  actions,
} from '../actions';

const initialState = {
  get: {
    status: 'INIT',
    configuration: null,
  },
  modify: {
    status: 'INIT',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.CONFIGURATION_GET:
      return update(state, {
        get: {
          status: { $set: 'WAITING' },
        },
      });
    case actions.CONFIGURATION_GET_SUCCESS:
      return update(state, {
        get: {
          status: { $set: 'SUCCESS' },
          configuration: { $set: action.configuration },
        },
      });
    case actions.CONFIGURATION_GET_FAILURE:
      return update(state, {
        get: {
          status: { $set: 'FAILURE' },
          configuration: { $set: null },
        },
      });
    case actions.CONFIGURATION_MODIFY:
      return update(state, {
        modify: {
          status: { $set: 'WAITING' },
        },
      });
    case actions.CONFIGURATION_MODIFY_SUCCESS:
      return update(state, {
        modify: {
          status: { $set: 'SUCCESS' },
        },
      });
    case actions.CONFIGURATION_MODIFY_FAILURE:
      return update(state, {
        modify: {
          status: { $set: 'FAILURE' },
        },
      });
    default:
      return state;
  }
};
