import React from 'react';
import { connect } from 'react-redux';
import { Container, Text, Button } from 'native-base';

import actions from '../actions';

class TestScreen extends React.Component {
  constructor(props) {
    super(props);
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
        <Button onPress={() => { dispatch(actions.test()) }}><Text>Send Request</Text></Button>
        <Button onPress={() => { dispatch(actions.test(true)) }}><Text>Send Request Which Will Fail</Text></Button>
      </Container>
    );
  }
};

let mapStateToProps = ({ test }) => ({ testResult: test });

export default connect(mapStateToProps)(TestScreen);