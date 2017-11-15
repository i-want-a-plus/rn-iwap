import * as types from '../actions/types';
import _ from 'lodash';

export default function authReducer (state = {}, action) {
  switch (action.type) {
    case types.USER_LOGIN_PREREG:
      return { ...state, isLoading: true, user: _.omit(action.payload, 'password') };
    case types.USER_LOGIN_REJECTED:
      return { ...state, isLoading: false, isLogin: false, user: null };
    case types.USER_LOGIN_FULFILLED:
      if (_.has(action, 'payload.email')) {
        return { ...state, isLoading: false, isLogin: true, user: action.payload };
      } else {
        return { ...state, isLoading: false, isLogin: true, user: { ...state.user, ...action.payload[1] } };
      }
    case types.USER_LOGOUT_FULFILLED:
      return { ...state, isLoading: false, isLogin: false, user: null };
    default:
      return state;
  };
};
