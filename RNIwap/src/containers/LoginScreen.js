import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image, findNodeHandle } from 'react-native';
import {
  Container, Header, Content, Form, Item, Input, Label,
  Button, Text
} from 'native-base';
import * as Animatable from 'react-native-animatable';
import { BlurView, VibrancyView } from 'react-native-blur';

import actions from '../actions';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1
  },
  content: {
    height: 290,
    width: '100%',
    shadowColor: '#000000',
    shadowRadius: 20,
    shadowOpacity: 0.3,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingTop: 10,
    backgroundColor: '#fff',
    overflow: 'hidden'
  },
  absolute: {
    position: 'absolute',
    top: 0, left: 0, bottom: 0, right: 0
  }
});

class LoginScreen extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      user: {
        email: '',
        password: ''
      },
      register: false
    }
  }

  componentDidMount () {}

  componentWillReceiveProps ({ auth: { isLogin }, navigation: { goBack } }) {
    if (isLogin) goBack();
  }

  handleClick () {
    if (this.state.register) {
      this.props.dispatch(actions.performUserRegister(this.state.user));
    } else {
      this.props.dispatch(actions.performUserLogin(this.state.user));
    }
  }

  render () {
    let { dispatch, navigation } = this.props;

    return (
      <Container style={styles.container}>
        <BlurView
          style={styles.absolute}
          blurType="dark"
        />
        <Animatable.View style={styles.content}
          animation="fadeInUp"
          duration={300}
          easing="ease-out">
          <Content>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row', paddingBottom: 5 }}>
              <View
                style={{ flex: 1 }}>
                <Button
                  style={{ flex: 1 }}
                  onPress={() => this.state.register ? this.setState({ register: false }) : this.props.navigation.goBack()}
                  small transparent>
                  <Text>Cancel</Text>
                </Button>
              </View>
              {!this.state.register && <View
                style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
                <Button
                  onPress={() => this.setState({ register: true })}
                  small transparent primary>
                  <Text>Register</Text>
                </Button>
              </View>}
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
              onPress={() => { this.handleClick(); }}>
              <Text>{this.state.register ? 'Register' : 'Login'}</Text>
            </Button>
          </Content>
        </Animatable.View>
      </Container>
    );
  }
};

let mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(LoginScreen);