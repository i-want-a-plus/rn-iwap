import React from 'react';
import { connect } from 'react-redux';
import { Container, Content, Text, Button, List, ListItem, Separator } from 'native-base';

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
              <Text>Logout</Text>
            </ListItem>
          </List>
          }
          <Separator bordered />
          <List style={{ backgroundColor: '#fff' }}>
            <ListItem first>
              <Text>Version {this.state.appVersion}</Text>
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