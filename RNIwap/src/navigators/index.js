import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, TabNavigator, StackNavigator } from 'react-navigation';
import { Root, Text, StyleProvider } from 'native-base';
import getTheme from '../../native-base-theme/components';
import iosTheme from '../../native-base-theme/variables/ios';

import TabNav from './tabNav';

import LoginScreen from '../containers/LoginScreen';
import InitScreen from '../containers/InitScreen';

export const MainNavigator = StackNavigator({
  Tab: {
    screen: TabNav,
  },
}, {
  headerMode: 'none',
  cardStyle: {
    backgroundColor: '#fff'
  }
});

export const AppNavigator = StackNavigator({
  Main: {
    screen: MainNavigator
  },
  Init: {
    screen: InitScreen
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: ({ navigation: { goBack } }) => ({
      title: 'Login',
      headerLeft: <Text style={{ color: '#000' }} onPress={ () => { goBack() } }>   Cancel</Text>
    })
  }
}, {
  mode: 'modal',
  navigationOptions: {
    headerTintColor: '#000',
    headerStyle: {
      backgroundColor: '#fff',
      shadowColor: 'transparent',
      borderBottomWidth: 0,
      elevation: 0
    },
    headerTitleStyle: {
      fontSize: 18
    }
  },
  cardStyle: {
    backgroundColor: '#fff'
  }
});

/**
 * Container with navigation
 */
const AppWithNavigationState = ({ dispatch, nav }) => (
  <Root>
    <StyleProvider  style={getTheme(iosTheme)}>
      <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
    </StyleProvider>
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