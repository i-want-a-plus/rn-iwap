import { NavigationActions } from 'react-navigation';

import * as types from './types';

import * as courseActions from './course';
import * as professorActions from './professor';
import * as authActions from './auth';

export const appLoading = () => dispatch => dispatch({
  type: types.APP_LOADING,
  payload: Promise.all([
    authActions.performExtractUserFromStorage(dispatch)
  ])
});

export const navigateToMainTabView = NavigationActions.navigate({
  routeName: 'Main',
  params: {}
});

let actions = {
  appLoading,
  ...authActions,
  ...courseActions,
  ...professorActions
};

export default actions;