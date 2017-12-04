import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image, findNodeHandle, KeyboardAvoidingView } from 'react-native';
import {
  Container, Header, Content, Form, Item, Input, Label,
  Button, Text
} from 'native-base';
import * as Animatable from 'react-native-animatable';
import { BlurView, VibrancyView } from 'react-native-blur';

import ModelBox from '../components/ModelBox';

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
      register: false,
      hasClosed: false
    }
  }

  componentDidMount () {
    this.refs.linkModel.open();
  }

  componentWillUnmount () {
    this.setState({ hasClosed: true });
    this.refs.linkModel.close();
  }

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

  handleModalClose () {
    if (!this.state.hasClosed) {
      this.props.navigation.goBack();
    }
  }

  render () {
    let { dispatch, navigation } = this.props;

    return (
      <Container style={styles.container}>
        <ModelBox
          style={{ height: 300, paddingLeft: 0, paddingRight: 0 }}
          position="bottom"
          ref="linkModel"
          onClosed={() => { this.handleModalClose(); }}>
            <Content bounces={false} scrollEnabled={false}>
              <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                <View
                  style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
                  <Button
                    onPress={() => this.setState({ register: !this.state.register })}
                    small transparent primary>
                    <Text>{this.state.register ? 'Cancel' : 'Register'}</Text>
                  </Button>
                </View>
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
        </ModelBox>
      </Container>
    );
  }
};

let mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(LoginScreen);