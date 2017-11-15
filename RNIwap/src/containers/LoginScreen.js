import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image } from 'react-native';
import {
  Container, Header, Content, Form, Item, Input, Label,
  Button, Text
} from 'native-base';
import actions from '../actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 100,
    height: 100
  }
});

class LoginScreen extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      user: {
        email: '',
        password: ''
      }
    }
  }

  componentDidMount () {
  }

  componentWillReceiveProps ({ auth: { isLogin }, navigation: { goBack } }) {
    if (isLogin) goBack();
  }

  render () {
    let { dispatch } = this.props;

    return (
      <Container>
        <Content>
          <View style={StyleSheet.flatten([ styles.container, { margin: 30 } ])}>
            <Image
              source={require('../../icons/icon.png')}
              style={styles.logo}
            />
          </View>
          <Form>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input
                onChangeText={(t) => this.setState(({ user }) => ({ user: { ...user, email: t } }))}
                autoCapitalize='none'
                keyboardType='email-address'
              />
            </Item>
            <Item stackedLabel last>
              <Label>Password</Label>
              <Input
                onChangeText={(t) => this.setState(({ user }) => ({ user: { ...user, password: t } }))}
                secureTextEntry={true}
              />
            </Item>
          </Form>
          <Button
            style={{ margin: 15, marginTop: 30 }}
            block primary
            onPress={() => { dispatch(actions.performUserLogin(this.state.user)); }}
          >
            <Text>Login</Text>
          </Button>
          <Button
            small block transparent primary>
            <Text>Register</Text>
          </Button>
        </Content>
      </Container>
    );
  }
};

let mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(LoginScreen);