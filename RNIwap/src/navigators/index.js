import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, TabNavigator, StackNavigator } from 'react-navigation';
import { Root, Text } from 'native-base';

import TabNav from './tabNav';

import LoginScreen from '../containers/LoginScreen';

export const MainNavigator = StackNavigator({
  Tab: {
    screen: TabNav,
  },
}, {
  headerMode: 'none'
});

export const AppNavigator = StackNavigator({
  Main: {
    screen: MainNavigator,
    navigationOptions: {
      headerMode: 'none',
    }
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: ({ navigation: { goBack } }) => ({
      title: 'Login',
      headerLeft: <Text style={{ color: '#fff' }} onPress={ () => { goBack() } }> Cancel</Text>
    })
  }
}, {
  mode: 'modal',
  navigationOptions: {
    headerTintColor: '#fff',
    headerStyle: { backgroundColor: '#409EFF' },
  }
});

/**
 * Container with navigation
 */
const AppWithNavigationState = ({ dispatch, nav }) => (
  <Root>
    <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
  </Root>
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);