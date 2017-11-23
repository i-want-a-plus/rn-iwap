import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';

import actions from '../actions';

const styles = StyleSheet.create({
});

class FavoriteButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { dispatch } = this.props;

    return (
      <View>
        <TouchableWithoutFeedback>
          <Icon name="ios-star-outline" />
        </TouchableWithoutFeedback>
      </View>
    );
  }
};

FavoriteButton.propTypes = {
};

export default connect()(FavoriteButton);