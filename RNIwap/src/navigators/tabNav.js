import React from 'react';
import { TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import TestScreen from '../containers/TestScreen';

const iconSize = 26;

export default TabNav = TabNavigator({
  Course: {
    screen: TestScreen,
    navigationOptions: {
      title: 'Course',
      tabBarLabel: 'Course',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-bookmarks' : 'ios-bookmarks-outline'}
          size={iconSize}
          style={{ color: tintColor }}
        />
      ),
    }
  },
  Professor: {
    screen: TestScreen,
    navigationOptions: {
      title: 'Professor',
      tabBarLabel: 'Professor',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-people' : 'ios-people-outline'}
          size={iconSize}
          style={{ color: tintColor }}
        />
      ),
    }
  },
  Settings: {
    screen: TestScreen,
    navigationOptions: {
      title: 'Settings',
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-settings' : 'ios-settings-outline'}
          size={iconSize}
          style={{ color: tintColor }}
        />
      ),
    }
  }
}, {
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false,
  tabBarOptions: {
    activeTintColor: '#409EFF',
    labelStyle: {
      fontSize: 12,
    }
  },
  navigationOptions: {
    headerTintColor: '#fff',
    headerStyle: { backgroundColor: '#409EFF' },
    headerTitleStyle: {
      fontSize: 20
    }
  }
});