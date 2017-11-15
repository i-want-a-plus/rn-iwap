import React from 'react';
import { AppRegistry, AsyncStorage, StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';

import AppWithNavigationState from './navigators';

let store = configureStore();

export default class App extends React.Component {
  render() {
    StatusBar.setBarStyle('light-content', true);
    return (
      <Provider store={store}>
      	<AppWithNavigationState />
      </Provider>
    );
  }
};