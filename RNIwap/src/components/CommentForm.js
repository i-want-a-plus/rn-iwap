import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Content, Form, Item, Input, Button, Text } from 'native-base';
import StarRating from 'react-native-star-rating';

import actions from '../actions';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      params: {},
      prId: null
    }
  }

  componentDidMount () {
    this.setState({ params: _.pick(this.props, 'rating', 'content') });
  }

  handleSubmit () {
    let { dispatch, type, id } = this.props;
    let prId = _.uniqueId();
    this.setState({ prId }, () => {
      return this.props.commentId
        ? dispatch(actions.performCommentUpdate({ ...this.state.params, id: this.props.commentId }, { id: prId }))
        : dispatch(actions.performCommentSubmit({ ...this.state.params, type, id }, { id: prId }));
    });
  }

  componentWillReceiveProps (nextProps) {
    console.log(nextProps);
    let pr = _.get(nextProps.pr, this.state.prId);
    if (!_.isEmpty(pr.data)) {
      this.props.onSubmit();
    }
  }

  render() {
    return (
      <Content bounces={false} scrollEnabled={false}>
        <View style={{ padding: 15 }}>
          <View style={{ width: 150 }}>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={this.state.params.rating}
              selectedStar={(rating) => this.setState(({ params }) => ({ params: { ...params, rating: rating } }))}
              starSize={20}
              starColor={'#fd8125'}
              emptyStarColor={'#fd8125'}
            />
          </View>
        </View>
        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
          <Input
            multiline={true}
            autoGrow={false}
            style={{ height: 100 }}
            placeholder="Your comments here..."
            value={this.state.params.content}
            onChangeText={(t) => this.setState(({ params }) => ({ params: { ...params, content: t } }))}
            autoCapitalize='none'
          />
        </View>
        <Button
          style={{ margin: 15, marginTop: 30 }}
          block primary
          onPress={() => { this.handleSubmit(); }}>
          <Text>Submit</Text>
        </Button>
      </Content>
    );
  }
};

CommentForm.propTypes = {
  type: PropTypes.string,
  id: PropTypes.number,
  commentId: PropTypes.number,
  rating: PropTypes.number,
  content: PropTypes.string
};

let mapStateToProps = ({ pr }) => ({ pr });

export default connect(mapStateToProps)(CommentForm);