import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Text } from 'native-base';
import { connect } from 'react-redux';
import { shadeColor } from '../utils';
import StarRating from 'react-native-star-rating';

import actions from '../actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  card: {
    margin: 10,
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#f0f0f8',
    width: '100%',
    transform: [{ scale: 1 }]
  },
  content: {
    fontSize: 14
  }
});

class CommentCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { pressed: false };
  }

  render() {
    let { dispatch, comment } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={{ paddingBottom: 10 }}>
            <View style={{ width: 60 }}>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={comment.rating}
                starSize={12}
                starColor={'#fd8125'}
                emptyStarColor={'#fd8125'}
              />
            </View>
          </View>
          <View>
            <Text style={styles.content}>{comment.content}</Text>
          </View>
        </View>
      </View>
    );
  }
};

CommentCard.propTypes = {
  comment: PropTypes.shape({
  }).isRequired
};

export default (CommentCard);
