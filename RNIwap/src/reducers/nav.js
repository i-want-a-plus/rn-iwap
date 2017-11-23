import { AppNavigator, TabNav } from '../navigators';
import { NavigationActions } from 'react-navigation';

let initialState = AppNavigator.router.getStateForAction(
  NavigationActions.navigate({ routeName: 'Init' })
);

export default navReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOTO':
      console.log(NavigationActions.navigate({
          routeName: 'Main',
          action: NavigationActions.navigate(action)
        }));
      return AppNavigator.router.getStateForAction(
        NavigationActions.navigate({
          routeName: 'Main',
          action: NavigationActions.navigate(action)
        }),
        state
      );
    case 'GOBACK':
      return AppNavigator.router.getStateForAction({ type: 'Navigation/BACK' }, state);
    default:
      return AppNavigator.router.getStateForAction(action, state);
  }
}
