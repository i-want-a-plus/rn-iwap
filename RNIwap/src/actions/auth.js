import * as types from './types';
import { NavigationActions } from 'react-navigation';
import { api } from '../services';
import { AsyncStorage } from 'react-native';
import store from '../store';

export const checkAuth = () => new Promise((resolve, reject) => {
  if (store.getState().auth.isLogin) {
    resolve();
  } else {
    reject();
  }
});

export const performAuthCheck = () => ({
  type: types.AUTH_CHECK,
  payload: checkAuth()
});

export const navigateToLoginPage = NavigationActions.navigate({
  routeName: 'Login',
  params: {}
});

export const performUserLogin = user => dispatch => dispatch({
  type: types.USER_LOGIN,
  payload: Promise.all([
    dispatch({
      type: types.USER_LOGIN_PREREG,
      payload: user
    }),
    api.fetchUserLogin(user)
  ])
}).then(() => {
  return AsyncStorage.setItem('@iwap:user', JSON.stringify(store.getState().auth.user));
}).catch(e => {
  return dispatch({ type: types.GLOBAL_ERROR, payload: e });
});

export const performExtractUserFromStorage = dispatch => {
  AsyncStorage.getItem('@iwap:user').then(JSON.parse).then(res => {
    console.log(res);
  });
};