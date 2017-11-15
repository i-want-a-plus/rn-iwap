import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Container, Text, Button } from 'native-base';
import SplashScreen from 'react-native-splash-screen';

import { test } from '../actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});

class TestScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // SplashScreen.hide();
  }

  testRender = (testResult) => {
    if (testResult.isPending) return <Text>Loading</Text>;
    if (testResult.error) return <Text>{(testResult.error[0] || testResult.error).message}</Text>;
    return <Text>{testResult.data}</Text>;
  }

  render() {
    let { dispatch } = this.props;
    let { testResult } = this.props;

    return (
      <Container>
        <Text>{this.testRender(testResult)}</Text>
        <Button onPress={() => { dispatch(test()) }}><Text>Send Request</Text></Button>
        <Button onPress={() => { dispatch(test(true)) }}><Text>Send Request Which Will Fail</Text></Button>
      </Container>
    );
  }
};

let mapStateToProps = ({ test }) => ({ testResult: test });

export default connect(mapStateToProps)(TestScreen);