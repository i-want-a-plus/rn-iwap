import { AppNavigator, TabNav } from '../navigators';
import { NavigationActions } from 'react-navigation';

let initialState = AppNavigator.router.getStateForAction(
  NavigationActions.navigate({ routeName: 'Init' })
);

export default navReducer = (state = initialState, action) =>
  AppNavigator.router.getStateForAction(action, state);
