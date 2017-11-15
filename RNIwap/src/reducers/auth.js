import { AUTH_CHECK, USER_LOGIN_PREREG, USER_LOGIN_REJECTED, USER_LOGIN_FULFILLED } from '../actions/types';
import _ from 'lodash';

export default function authReducer (state = {}, action) {
  switch (action.type) {
    case USER_LOGIN_PREREG:
      return { ...state, isLoading: true, user: _.omit(action.payload, 'password') };
    case USER_LOGIN_REJECTED:
      return { ...state, isLoading: false, isLogin: false, user: null };
    case USER_LOGIN_FULFILLED:
      return { ...state, isLoading: false, isLogin: true, user: { ...state.user, ...action.payload[1] } };
    default:
      return state;
  };
};
