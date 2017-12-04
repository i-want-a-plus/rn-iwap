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

    this.state = {
      favorite: null
    }
  }

  componentDidMount () {
    this.getFavorite(this.props);
  }

  componentWillReceiveProps (nextProps) {
    this.getFavorite(nextProps);
  }

  getFavorite (props) {
    let { type, id } = props;
    let favorite = _.get(props, `favorites.${type}_${id}`);
    this.setState({ favorite });
  }

  handlePress () {
    let { dispatch, type, id } = this.props;
    if (this.state.favorite) {
      dispatch(actions.performFavoriteDelete(this.state.favorite, this.props));
    } else {
      dispatch(actions.performFavoriteAdd({ [ _.capitalize(type) + 'Id' ]: id }, this.props));
    }
  }

  render() {
    let { type, id } = this.props;
    let { favorite } = this.state;

    return (
      <View>
        <TouchableWithoutFeedback onPress={() => { this.handlePress(); }}>
          <Icon name={ favorite ? 'ios-star' : 'ios-star-outline'} />
        </TouchableWithoutFeedback>
      </View>
    );
  }
};

FavoriteButton.propTypes = {
};

let mapStateToProps = ({ favorite }) => ({ favorites: favorite });

export default connect(mapStateToProps)(FavoriteButton);