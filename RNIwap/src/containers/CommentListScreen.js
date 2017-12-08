import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, Text, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import {
  Container, Header, Left, Body, Right, Title, Content, Button, Icon
} from 'native-base';
import Swipeout from 'react-native-swipeout';

import actions from '../actions';

import CommentCard from '../components/CommentCard';
import CommentForm from '../components/CommentForm';
import ModelBox from '../components/ModelBox';

class CommentListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: {
        commentId: null,
        rating: null,
        content: null
      }
    };
  }

  handleDelete (commentId) {
    this.props.dispatch(actions.performCommentDelete({ id: commentId }));
  }

  handleEdit ({ id, rating, content }) {
    this.commentRef[`REF-FLATLIST-${id}`]._close();
    this.setState({
      current: {
        id, rating, content
      }
    }, () => {
      this.refs.commentModel.open();
    });
  }

  handleCommentSubmit () {
    this.refs.commentModel.close();
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
          ref="REF-FLATLIST"
          style={{ paddingTop: 10, paddingBottom: 10 }}
          data={_.toArray(myComment)}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <Swipeout
              autoClose={true}
              ref={(ref) => this.commentRef = {...this.commentRef, [`REF-FLATLIST-${item.id}`]: ref}}
              right={[{
                backgroundColor: '#fff',
                component:
                  <View style={{ paddingTop: 10, paddingRight: 5, paddingLeft: 10 }}>
                    <Button danger large block onPress={() => { this.handleDelete(item.id); }}>
                      <Icon active name="trash" />
                    </Button>
                  </View>
              }, {
                backgroundColor: '#fff',
                component:
                  <View style={{ paddingTop: 10, paddingLeft: 5, paddingRight: 10 }}>
                    <Button success large block onPress={() => { this.handleEdit(item); }}>
                      <Icon active name="create" />
                    </Button>
                  </View>
              }]}
              backgroundColor='#fff'>
              <TouchableWithoutFeedback onPress={() => { this.handlePress(item); }}>
                <CommentCard comment={item} />
              </TouchableWithoutFeedback>
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

        <ModelBox style={{ height: 265 }} position="bottom" ref="commentModel">
          <CommentForm
            commentId={this.state.current.id}
            rating={this.state.current.rating}
            content={this.state.current.content}
            onSubmit={() => { this.handleCommentSubmit(); }}
          />
        </ModelBox>
      </Container>
    );
  }
};

let mapStateToProps = ({ myComment }) => ({ myComment });

export default connect(mapStateToProps)(CommentListScreen);