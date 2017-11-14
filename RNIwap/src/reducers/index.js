import { combineReducers } from 'redux';
import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';

import nav from './nav';

import auth from './auth';

const AppReducer = combineReducers({
  nav
});

export default AppReducer;