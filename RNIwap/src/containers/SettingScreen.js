import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import {
  Container, Content, Text, Button, List, ListItem, Separator,
  Left, Body, Right, Icon, Switch, Header, Title
} from 'native-base';

import actions from '../actions';

class TestScreen extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      appVersion: 'NOT_APPLICABLE'
    };
  }

  componentDidMount () {
    this.getVersion();
  }

  getVersion () {
    if (process.env.NODE_ENV === 'production') {
      let VersionNumber = require('react-native-version-number');
      if (VersionNumber) this.setState({ appVersion: `${VersionNumber.appVersion}` });
    }
  }

  render () {
    let { dispatch } = this.props;
    let { auth } = this.props;

    return (
      <Container style={{ backgroundColor: '#f0eff5' }}>
        <Header>
          <Left>
          </Left>
          <Body>
            <Title style={{ color: '#000' }}>Settings</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content>
          <Separator bordered noTopBorder>
            <Text>Account</Text>
          </Separator>
          {!auth.isLogin ?
          <List style={{ backgroundColor: '#fff' }}>
            <ListItem first last onPress={() => { dispatch(actions.navigateToLoginPage); }}>
              <Text>Login</Text>
            </ListItem>
          </List>
          :
          <List style={{ backgroundColor: '#fff' }}>
            <ListItem first>
              <Text>{auth.user.email}</Text>
            </ListItem>
            <ListItem last onPress={() => { dispatch(actions.performUserLogout()); }}>
              <Text style={{ color: '#f00' }}>Logout</Text>
            </ListItem>
          </List>
          }
          {auth.isLogin && <View><Separator bordered />
          <List style={{ backgroundColor: '#fff' }}>
            <ListItem icon first>
              <Left>
                <Icon name="star" />
              </Left>
              <Body>
                <Text>Favorites</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="chatboxes" />
              </Left>
              <Body>
                <Text>Comments</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="alarm" />
              </Left>
              <Body>
                <Text>Notifications</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem icon last>
              <Left>
                <Icon name="paper-plane" />
              </Left>
              <Body>
                <Text>Push Notification</Text>
              </Body>
              <Right>
                <Switch value={false} disabled />
              </Right>
            </ListItem>
          </List></View>}
          <Separator bordered />
          <List style={{ backgroundColor: '#fff' }}>
            <ListItem first>
              <Text>Version {this.state.appVersion}</Text>
            </ListItem>
            <ListItem icon>
              <Body>
                <Text>Licenses</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem last>
              <Text>About</Text>
            </ListItem>
          </List>
          <Separator bordered noBottomBorder />
        </Content>
      </Container>
    );
  }
};

let mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(TestScreen);