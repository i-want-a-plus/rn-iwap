import * as types from './types';
import { NavigationActions } from 'react-navigation';
import { api } from '../services';
import { AsyncStorage } from 'react-native';
import store from '../store';
import { performFavoriteFetch } from './favorite';

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

export const performUserRegister = user => dispatch => dispatch({
  type: types.USER_REGISTER,
  payload: api.fetchUserRegister(user)
}).then(() => {
  return performUserLogin(user)(dispatch);
}).catch(e => {
  return dispatch({ type: types.GLOBAL_ERROR, payload: e });
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
}).then(() => {
  return dispatch(performFavoriteFetch());
}).catch(e => {
  return dispatch({ type: types.GLOBAL_ERROR, payload: e });
});

export const performUserLogout = () => dispatch => dispatch({
  type: types.USER_LOGOUT,
  payload: Promise.all([
    AsyncStorage.removeItem('@iwap:user')
  ])
});

export const performExtractUserFromStorage = dispatch => {
  return AsyncStorage.getItem('@iwap:user').then(JSON.parse).then(res => {
    if (res) return dispatch({
      type: types.USER_LOGIN_FULFILLED,
      payload: res
    });
  }).then(() => {
    if (store.getState().auth.isLogin) {
      return dispatch(performFavoriteFetch());
    }
  });
};