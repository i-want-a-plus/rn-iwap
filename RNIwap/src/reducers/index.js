import { combineReducers } from 'redux';
import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';

import nav from './nav';
import auth from './auth';
import test from './test';

const AppReducer = combineReducers({
  nav,
  auth,
  test
});

export default AppReducer;