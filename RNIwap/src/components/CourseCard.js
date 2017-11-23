import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Text } from 'native-base';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { shadeColor } from '../utils';

import actions from '../actions';

import colormap from 'colormap';
const colorMap = colormap({
    colormap: 'warm',
    nshades: 41,
    format: 'hex'
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  card: {
    margin: 10,
    shadowColor: '#000000',
    shadowRadius: 10,
    shadowOpacity: 0.3,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#eee',
    width: '100%',
    transform: [{ scale: 1 }]
  },
  lineA: {
    color: '#fff'
  },
  lineB: {
    color: '#fff',
    fontSize: 20,
    fontWeight: "600"
  },
  lineC: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  lineCA: {
    color: '#fff',
    fontSize: 10
  },
  lineCB: {
    color: '#fff',
    fontWeight: "600",
    paddingLeft: 5,
    paddingRight: 10
  }
});

class CourseCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { pressed: false };
  }

  render() {
    let { dispatch, course } = this.props;

    return (
      <View style={styles.container}>
          <TouchableWithoutFeedback
            onPress={() => dispatch({ type: 'GOTO', routeName: 'Course', params: { courseId: course.id } })}
            onPressIn={() => this.setState({ pressed: true })}
            onPressOut={() => this.setState({ pressed: false })}>
            <Animatable.View
              transition="scale"
              style={StyleSheet.flatten([
                styles.card,
                { backgroundColor:
                  shadeColor(colorMap[course.averageGpa.toFixed(1) * 10], -0.25)
                },
                this.state.pressed ? { transform: [{ scale: 0.95 }] } : {}
              ])}
              underlayColor='#fff'>
              <View>
                <Text style={styles.lineA}>{course.subject} {course.course}</Text>
                <Text style={styles.lineB}>{course.title}</Text>
                <View style={styles.lineC}>
                  <Text style={styles.lineCA}>GPA</Text>
                  <Text style={styles.lineCB}>{course.averageGpa.toFixed(2)}</Text>
                  <Text style={styles.lineCA}>Student Count</Text>
                  <Text style={styles.lineCB}>{course.totalStudentCount}</Text>
                </View>
              </View>
            </Animatable.View>
          </TouchableWithoutFeedback>
      </View>
    );
  }
};

CourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    subject: PropTypes.string.isRequired,
    course: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    averageGpa: PropTypes.number.isRequired,
    totalStudentCount: PropTypes.number.isRequired,
    sd: PropTypes.number.isRequired
  }).isRequired
};

export default connect()(CourseCard);