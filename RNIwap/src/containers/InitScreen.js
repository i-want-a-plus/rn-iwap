import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { NavigationActions } from 'react-navigation';

import AppWithNavigationState from '../navigators';
import actions from '../actions';

export class InitScreen extends React.Component {

  componentDidMount() {
    this.props.dispatch(actions.appLoading());
  }

  componentWillReceiveProps (newProps) {
    if (newProps.init.hasFinished) {
      SplashScreen.hide();
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [ NavigationActions.navigate({ routeName: 'Main' }) ]
      });
      this.props.navigation.dispatch(resetAction);
    }
  }

  render() {
    return (
      <View></View>
    );
  }
};

let mapStateToProps = ({ init }) => ({ init });

export default connect(mapStateToProps)(InitScreen);
