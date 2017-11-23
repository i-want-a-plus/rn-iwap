import React from 'react';
import { TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CourseSearchScreen from '../containers/CourseSearchScreen';
import SettingScreen from '../containers/SettingScreen';

const iconSize = 26;

export default TabNav = TabNavigator({
  Course: {
    screen: CourseSearchScreen,
    navigationOptions: {
      header: null,
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
    screen: CourseSearchScreen,
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
    screen: SettingScreen,
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
    style: {
      borderTopWidth: 0,
      backgroundColor: '#fff'
    },
    activeBackgroundColor: '#409EFF',
    tabStyle: {
      borderRadius: 10,
      margin: 1
    },
    activeTintColor: '#fff',
    labelStyle: {
      fontSize: 12,
    },
  },
  cardStyle: {
    backgroundColor: '#fff'
  }
});