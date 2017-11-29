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
    this.props.onSearch && this.props.onSearch(this.state.query);
  }

  handleChange (t) {
    this.setState({ query: t });
    this.props.onChange && this.props.onChange(t);
  }

  render() {
    let { dispatch } = this.props;

    return (
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder={this.props.placeholder}
            autoCapitalize="none"
            blurOnSubmit={true}
            returnKeyType="search"
            clearButtonMode="always"
            onBlur={() => { this.setState({ isFocus: false }); }}
            onFocus={() => { this.setState({ isFocus: true }); }}
            onChangeText={(t) => { this.handleChange(t); }}
            onSubmitEditing={() => { this.handleSearch(); }}
          />
        </Item>
        {this.state.isFocus && <Button transparent small primary onPress={Keyboard.dismiss}><Text>Cancel</Text></Button>}
      </Header>
    );
  }
};

export default HeaderWithSearchBar;