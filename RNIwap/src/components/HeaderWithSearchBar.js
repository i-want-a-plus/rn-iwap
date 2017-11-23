import React from 'react';
import { Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Content, Item, Icon, Input, Text, Button } from 'native-base';

import actions from '../actions';

class HeaderWithSearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocus: false,
      query: ''
    };
  }

  handleSearch () {
    Keyboard.dismiss();
    this.props.onSearch(this.state.query);
  }

  render() {
    let { dispatch } = this.props;

    return (
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Search course"
            onBlur={() => {this.setState({ isFocus: false })}}
            onFocus={() => {this.setState({ isFocus: true })}}
            onChangeText={(t) => this.setState({ query: t })}
            onSubmitEditing={() => { this.handleSearch() }}
          />
        </Item>
        {this.state.isFocus && <Button transparent small primary onPress={Keyboard.dismiss}><Text>Cancel</Text></Button>}
      </Header>
    );
  }
};

export default HeaderWithSearchBar;