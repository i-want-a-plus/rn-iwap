import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Button, Text, Icon } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
  container: {
  },
  limited: {
    flex: 1,
    height: 260,
    overflow: 'hidden'
  },
  loadMore: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10000
  },
  loadMoreButton: {
    width: '100%',
    alignItems: 'center',
    padding: 20
  }
});

class CollapseView extends React.Component {
  constructor(props) {
    super(props);

    this.state = { collapsed: !!props.collapsed }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.collapsed ? <View
          style={styles.limited}>
            <View style={styles.loadMore}>
              <TouchableWithoutFeedback
                onPressIn={() => { this.setState({ collapsed: false }) }}>
                <LinearGradient
                  colors={[
                    'rgba(255, 255, 255, 0)',
                    'rgba(255, 255, 255, 0.75)',
                    'rgba(255, 255, 255, 1)'
                  ]}
                  style={styles.loadMoreButton}>
                  <Icon name="ios-arrow-down"></Icon>
                </LinearGradient>
              </TouchableWithoutFeedback>
            </View>
            <View>{this.props.children}</View>
        </View> : this.props.children}
      </View>
    );
  }
};

export default CollapseView;