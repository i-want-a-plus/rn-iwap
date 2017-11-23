import React from 'react';
import { Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, TabNavigator, StackNavigator } from 'react-navigation';
import { Root, Text, StyleProvider } from 'native-base';
import getTheme from '../../native-base-theme/components';
import iosTheme from '../../native-base-theme/variables/ios';

import TabNav from './tabNav';

import LoginScreen from '../containers/LoginScreen';
import InitScreen from '../containers/InitScreen';
import CourseScreen from '../containers/CourseScreen';

export const MainNavigator = StackNavigator({
  Tab: {
    screen: TabNav,
  },
  Course: {
    screen: CourseScreen,
    navigationOptions: {
      header: null
    }
  }
}, {
  mode: 'stack',
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
    navigationOptions: {
      header: null
    },
    transitionProps: '123'
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
  transitionConfig : (transitionProps) => ({
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const { index } = scene;
      const width = layout.initWidth;
      const translateX = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [width, 0, 0],
      });
      if (
        sceneProps.scene.route.routeName === "Login"
      ) {
        return {};
      }
      return { transform: [{ translateX }] };
    },
    containerStyle: {
      backgroundColor: '#fff'
    }
  }),
  cardStyle: {
    backgroundColor: 'transparent',
    opacity: 1
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