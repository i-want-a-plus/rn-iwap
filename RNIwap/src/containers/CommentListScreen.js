import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import {
  Container, Header, Left, Body, Right, Title, Content, Button, Icon
} from 'native-base';
import Swipeout from 'react-native-swipeout';

import actions from '../actions';

import CommentCard from '../components/CommentCard';

class CommentListScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  fetch () {
    // this.props.dispatch(actions.performCommentFetch(this.props, this.state));
  }

  componentDidMount () {
    // this.fetch();
  }

  componentWillReceiveProps (nextProps) {
    console.log(nextProps);
  }

  handleDelete (commentId) {
    this.props.dispatch(actions.performCommentDelete({ id: commentId }));
  }

  commentList () {
    let { dispatch, myComment } = this.props;

    if (!myComment) {
      return <View></View>;
    }

    if (_.isEmpty(myComment)) {
      return <View style={{ alignItems: 'center', padding: 10 }}><Text style={{ color: '#777' }}>No Comments</Text></View>;
    }

    return (
      <View>
        <FlatList
          style={{ paddingTop: 10, paddingBottom: 10 }}
          data={_.toArray(myComment)}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <Swipeout
              right={[{
                backgroundColor: '#fff',
                component:
                  <View style={{ padding: 10 }}>
                    <Button danger onPress={() => { this.handleDelete(item.id); }}>
                      <Icon active name="trash" />
                    </Button>
                  </View>
              }]}
              backgroundColor='#fff'>
              <CommentCard comment={item} />
            </Swipeout>
          )}
        />
      </View>
    );
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent
              onPress={() => this.props.dispatch({ type: 'GOBACK' })}>
              <Icon name='arrow-back' style={{ color: '#000' }} />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: '#000' }}>Comments</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content>
          {this.commentList()}
        </Content>
      </Container>
    );
  }
};

let mapStateToProps = ({ myComment }) => ({ myComment });

export default connect(mapStateToProps)(CommentListScreen);