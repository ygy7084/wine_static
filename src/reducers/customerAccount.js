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
    customeraccount: null,
  },
  logout: {
    status: 'INIT',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.CUSTOMERACCOUNT_LOGIN:
      return update(state, {
        login: {
          status: { $set: 'WAITING' },
        },
      });
    case actions.CUSTOMERACCOUNT_LOGIN_SUCCESS:
      return update(state, {
        login: {
          status: { $set: 'SUCCESS' },
        },
      });
    case actions.CUSTOMERACCOUNT_LOGIN_FAILURE:
      return update(state, {
        login: {
          status: { $set: 'FAILURE' },
        },
      });
    case actions.CUSTOMERACCOUNT_SESSION:
      return update(state, {
        session: {
          status: { $set: 'WAITING' },
        },
      });
    case actions.CUSTOMERACCOUNT_SESSION_SUCCESS:
      return update(state, {
        session: {
          status: { $set: 'SUCCESS' },
          customerAccount: { $set: action.customerAccount },
        },
      });
    case actions.CUSTOMERACCOUNT_SESSION_FAILURE:
      return update(state, {
        session: {
          status: { $set: 'FAILURE' },
          customerAccount: { $set: null },
        },
      });
    case actions.CUSTOMERACCOUNT_LOGOUT:
      return update(state, {
        logout: {
          status: { $set: 'WAITING' },
        },
      });
    case actions.CUSTOMERACCOUNT_LOGOUT_SUCCESS:
      return update(state, {
        logout: {
          status: { $set: 'SUCCESS' },
        },
        session: {
          customerAccount: { $set: null },
        },
      });
    case actions.CUSTOMERACCOUNT_LOGOUT_FAILURE:
      return update(state, {
        logout: {
          status: { $set: 'FAILURE' },
        },
      });
    default:
      return state;
  }
};
