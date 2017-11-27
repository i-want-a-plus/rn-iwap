const _ = require('lodash');
import React from 'react';
import { Animated, ScrollView, StatusBar, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Content, Item, Icon, Input, Text, Button } from 'native-base';
import {
  VictoryAxis, VictoryBar, VictoryChart, VictoryTheme }
from "victory-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ModelBox from '../components/ModelBox';

import SectionList from '../components/SectionList';
import FavoriteButton from '../components/FavoriteButton';
import DetailList from '../components/DetailList';

import { reduce } from '../utils';
import { gradeMap } from '../utils/reduce';

import actions from '../actions';

const styles = StyleSheet.create({
  closeButton: {
    color: '#aaa'
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  closeButtonContainer: {
    position: 'absolute',
    left: 16,
    top: 36
  },
  headContainer: {
    paddingTop: 42,
    marginLeft: 42,
    paddingRight: 30,
    paddingBottom: 10
  },
  footContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  subject: {},
  course: {
    paddingLeft: 5,
    fontWeight: '500'
  },
  title: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: '800',
    color: '#000'
  },
  subtitle: {
    marginTop: 3,
    fontSize: 16,
    fontWeight: '800'
  },
  detailList: {
    marginTop: 10,
    marginLeft: -20,
    marginBottom: 10
  },
  modal: {
    height: 130
  }
});

class CourseScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      reducer: false,
      plotData: null
    };
  }

  componentDidMount () {
    let state = { id: this.props.navigation.state.params.courseId };
    this.setState(state);
    if (!this.props.courses[state.id]) {
      this.props.dispatch(actions.performCourseFetch(state));
    } else {
      this.updatePlotData(this.props, state);
    }
  }

  componentWillUnmount () {
    StatusBar.setHidden(false, 'slide');
  }

  componentWillReceiveProps (newProps) {
    this.updatePlotData(newProps, this.state);
  }

  updatePlotData (newProps, state) {
    console.log('mount', newProps);
    if (!_.has(newProps, [ 'courses', state.id, 'isPending' ])) return;
    let course = newProps.courses[state.id];
    if (!course.isPending) {
      let plotData = null;
      if (course.totalStudentCount) {
        plotData = _.map(reduce(course.Sections), ({ stat }) => {
          return _.zipWith(
            gradeMap.gradeText,
            gradeMap.grade,
            gradeMap.dist,
            (text, grade, key) => ({
              text, grade, value: _.get(stat, key), percent: _.get(stat, key) / stat.totalStudentCount
            })
          );
        });
      }
      console.log('plot data', plotData);
      this.setState({ plotData });
    }
  }

  handleScroll (event) {
    let y = event.nativeEvent.contentOffset.y;
    if (y > 30) {
      StatusBar.setHidden(true, 'slide');
    } else {
      StatusBar.setHidden(false, 'slide');
    }
  }

  goBackButton = (<View style={styles.closeButtonContainer}>
    <TouchableWithoutFeedback
      onPress={() => this.props.dispatch({ type: 'GOBACK' })}>
      <Icon name="ios-arrow-back" style={styles.closeButton}></Icon>
    </TouchableWithoutFeedback>
  </View>)

  plot = () => (
    <View
      style={{ backgroundColor: '#f5f5f5' }}>
      <VictoryChart
        theme={VictoryTheme.material}
        height={200}
        padding={{ left: 0, right: 10, bottom: 50, top: 30 }}>
        <VictoryAxis
          tickValues={gradeMap.grade}
          tickFormat={gradeMap.gradeText}
        />
        {_.map(this.state.plotData, (data, idx) => (
          <VictoryBar
            key={idx}
            style={{}}
            alignment="end"
            data={data}
            x="text"
            y="percent"
          />
        ))}
      </VictoryChart>
    </View>
  )

  detailList = (course) => {
    let iconSize = 14;

    return (
      <View style={styles.detailList}>
        <DetailList
          limitToMap
          data={course}
          map={{
            averageGpa: {
              displayText: 'Average GPA',
              p: v => v.toFixed(2),
              icon: () => <MaterialCommunityIcons size={iconSize} name="minus" />
            },
            totalStudentCount: {
              displayText: 'Total Student Count',
              icon: () => <MaterialCommunityIcons size={iconSize} name="sigma" />
            },
            sd: {
              displayText: 'Standard Deviation',
              p: v => v.toFixed(3),
              icon: () => <MaterialCommunityIcons size={iconSize} name="sigma-lower" />
            }
          }}
        />
      </View>
    );
  }

  render() {
    let { dispatch } = this.props;
    let { courses } = this.props;
    let course = courses[this.state.id] || {};

    return (
      <Container style={{ backgroundColor: '#fff', paddingBottom: 20 }}>
        <ScrollView
          onScroll={this.handleScroll}
          scrollEventThrottle={16}>
          <Content>
            {this.goBackButton}
            <View style={styles.headContainer}>
              <View style={styles.inline}>
                <Text style={styles.subject}>{course.subject}</Text>
                <Text style={styles.course}>{course.course}</Text>
              </View>
              <Text style={styles.title}>{course.title}</Text>
              {this.detailList(course)}
            </View>
            {this.state.plotData && this.plot()}
            <View style={StyleSheet.flatten([ styles.headContainer, styles.inline ])}>
              <Text style={styles.subtitle}>Sections</Text>
              <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <TouchableWithoutFeedback onPress={() => this.refs.linkModel.open()}>
                  <Icon name="ios-funnel-outline" style={{ fontSize: 24 }} />
                </TouchableWithoutFeedback>
              </View>
            </View>
            <View>
              <SectionList sections={course.Sections} />
            </View>
            <View style={styles.footContainer}>
              <FavoriteButton />
            </View>
          </Content>
        </ScrollView>

        <ModelBox style={styles.modal} position="bottom" ref="linkModel">
          <Text style={styles.subtitle}>Link sections by</Text>
          <Button block light style={{ marginTop: 20 }}>
            <Text>Instructor</Text>
          </Button>
        </ModelBox>
      </Container>
    );
  }
};

let mapStateToProps = ({ course }) => ({ courses : course });

export default connect(mapStateToProps)(CourseScreen);