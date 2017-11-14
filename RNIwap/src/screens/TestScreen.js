import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Container, Text } from 'native-base';

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

  render() {
    let { dispatch } = this.props;

    return (
      <Container>
        <Text>TEST</Text>
      </Container>
    );
  }
};

export default connect()(TestScreen);