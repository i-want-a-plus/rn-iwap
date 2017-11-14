import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, TabNavigator, StackNavigator } from 'react-navigation';
import { Root } from 'native-base';

import TabNav from './tabNav';

export const AppNavigator = StackNavigator({
  Root: {
    screen: TabNav,
  }
}, {
  mode: 'modal',
  header: null,
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