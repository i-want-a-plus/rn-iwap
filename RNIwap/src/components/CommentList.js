import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';

import actions from '../actions';

import CommentCard from './CommentCard';
import CollapseView from '../components/CollapseView';

class CommentList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: _.uniqueId()
    };
  }

  fetch () {
    this.props.dispatch(actions.performCommentFetch(this.props, this.state));
  }

  componentDidMount () {
    this.fetch();
  }

  componentWillReceiveProps (nextProps) {
    console.log(nextProps);
  }

  render() {
    let { dispatch, type, id } = this.props;

    let comment = _.get(this.props, `comments.${type}_${id}`);

    if (!comment || comment.isPending) {
      return <View></View>;
    }

    if (!comment.data.length) {
      return <View style={{ alignItems: 'center', padding: 10 }}><Text style={{ color: '#777' }}>No Comments</Text></View>;
    }

    return (
      <View>
        <CollapseView collapsed={_.get(comment, 'data.length') > 2}>
          <FlatList
            style={{ paddingTop: 10, paddingBottom: 10 }}
            data={comment.data}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => <CommentCard comment={item} />}
          />
        </CollapseView>
      </View>
    );
  }
};

CommentList.propTypes = {
  type: PropTypes.string,
  id: PropTypes.number
};

let mapStateToProps = ({ pr, comment }) => ({ pr, comments: comment });

export default connect(mapStateToProps, null, null, { withRef: true })(CommentList);