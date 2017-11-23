import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import store from './store';
import AppWithNavigationState from './navigators';

export default class App extends React.Component {
  render() {
    StatusBar.setBarStyle('dark-content', true);
    return (
      <Provider store={store}>
      	<AppWithNavigationState style={{ backgroundColor: '#fff' }} />
      </Provider>
    );
  }
};