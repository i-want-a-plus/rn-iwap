import React from 'react';
import { AppRegistry, AsyncStorage, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import store from './store';
import AppWithNavigationState from './navigators';
import actions from './actions';

export default class App extends React.Component {

  componentDidMount() {
    // SplashScreen.hide();
    actions.performExtractUserFromStorage(this.props.dispatch);
  }

  render() {
    StatusBar.setBarStyle('dark-content', true);
    return (
      <Provider store={store}>
      	<AppWithNavigationState style={{ backgroundColor: '#fff' }} />
      </Provider>
    );
  }
};