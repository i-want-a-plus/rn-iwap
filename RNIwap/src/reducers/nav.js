import { AppNavigator, TabNav } from '../navigators';

export default navReducer = (state, action) =>
  AppNavigator.router.getStateForAction(action, state);
