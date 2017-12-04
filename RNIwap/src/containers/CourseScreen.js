const _ = require('lodash');
const fp = require('lodash/fp');
import React from 'react';
import { Animated, ScrollView, StatusBar, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Content, Item, Icon, Input, Text, Button } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ModelBox from '../components/ModelBox';
import Loading from '../components/Loading';
import CollapseView from '../components/CollapseView';

import SectionList from '../components/SectionList';
import FavoriteButton from '../components/FavoriteButton';
import DetailList from '../components/DetailList';
import GradePlot from '../components/GradePlot';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { reduce } from '../utils';
import { gradeMap } from '../utils/reduce';

import actions from '../actions';

const styles = StyleSheet.create({
  inline: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  closeButtonContainer: {
    position: 'absolute',
    left: 0,
    top: 36,
    width: 45,
    height: 30
  },
  closeButton: {
    flex: 1,
    justifyContent: 'center'
  },
  closeButtonIcon: {
    color: '#aaa',
    textAlign: 'center'
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
    height: 260
  }
});

const reducers = {
  'Default': {
    fn: fp.get('id'),
    icon: 'ios-funnel-outline'
  },
  'Instructor': {
    fn: (section) => {
      return _.join([_.get(section, 'Professors.0.firstName'), _.get(section, 'Professors.0.lastName')], ', ');
    },
    icon: 'ios-person-outline'
  },
  'Term': {
    fn: (section) => {
      return _.join([_.get(section, 'year'), _.get(section, 'term')], ', ');
    },
    icon: 'ios-calendar-outline'
  }
};

class CourseScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      reducer: reducers.Default,
      course: null,
      reducedSections: null,
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

  componentWillUpdate(nextProps, nextState) {
    if (this.state.reducer != nextState.reducer || this.state.course != nextState.course) {
      this.reduceSectionBy(nextState.reducer, nextState.course.Sections);
    }
  }

  updatePlotData (newProps, state) {
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
      this.setState({ course, plotData });
    }
  }

  reduceSectionBy ({ fn }, sections = null) {
    let reducedSections = _.map(reduce(sections || this.state.course.Sections, fn), (v, k) => _.set(v, '_id', k));
    this.setState({ reducedSections });
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
      style={styles.closeButton}
      onPress={() => this.props.dispatch({ type: 'GOBACK' })}>
      <Icon name="ios-arrow-back" style={styles.closeButtonIcon}></Icon>
    </TouchableWithoutFeedback>
  </View>)

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

  handleCommentSubmit () {
    this.refs.commentModel.close();
    this.refs.commentList.getWrappedInstance().fetch();
  }

  render() {
    let { dispatch } = this.props;
    let { course } = this.state;

    if (!course || course.isPending) {
      return <Loading />;
    }

    return (
      <Container style={{ backgroundColor: '#fff' }}>
        <ScrollView
          onScroll={this.handleScroll}
          scrollEventThrottle={16}>
          <Content style={{ paddingBottom: 20 }}>
            {this.goBackButton}
            <View style={styles.headContainer}>
              <View style={styles.inline}>
                <Text style={styles.subject}>{course.subject}</Text>
                <Text style={styles.course}>{course.course}</Text>
              </View>
              <Text style={styles.title}>{course.title}</Text>
              {this.detailList(course)}
            </View>
            <GradePlot plotData={this.state.plotData} />
            <View style={StyleSheet.flatten([ styles.headContainer, styles.inline ])}>
              <Text style={styles.subtitle}>Sections</Text>
              <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <TouchableWithoutFeedback onPress={() => this.refs.linkModel.open()}>
                  <View style={{ paddingLeft: 10, paddingRight: 5 }}>
                    <Icon name={this.state.reducer.icon || 'ios-funnel-outline'} style={{ fontSize: 24 }} />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
            {this.state.reducedSections && <View>
              <CollapseView collapsed={_.get(this.state.reducedSections, 'length') > 2}>
                <SectionList sections={this.state.reducedSections} />
              </CollapseView>
            </View>}
            <View style={StyleSheet.flatten([ styles.headContainer, styles.inline ])}>
              <Text style={styles.subtitle}>Comments</Text>
              <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <TouchableWithoutFeedback onPress={() => this.refs.commentModel.open()}>
                  <View style={{ paddingLeft: 10, paddingRight: 5 }}>
                    <Icon name="ios-create-outline" style={{ fontSize: 24 }} />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
            <CommentList type="course" id={this.state.id} ref="commentList" />
            <View style={styles.footContainer}>
              <FavoriteButton type="course" id={this.state.id} />
            </View>
          </Content>
        </ScrollView>

        <ModelBox style={{ height: reducers.length * 65 + 65, padding: 15 }} position="bottom" ref="linkModel">
          <Text style={styles.subtitle}>Link sections by</Text>
          {_.map(reducers, (reducer, key) => (
            <Button block
              light={reducer != this.state.reducer}
              success={reducer == this.state.reducer}
              style={{ marginTop: 20 }}
              key={key}
              onPress={
                () => {
                  this.setState({ reducer: reducers[key] });
                  this.refs.linkModel.close();
                }
              }>
              <Text>{key}</Text>
            </Button>
          ))}
        </ModelBox>

        <ModelBox style={{ height: 265 }} position="bottom" ref="commentModel">
          <CommentForm type="course" id={this.state.id} onSubmit={() => { this.handleCommentSubmit(); }}/>
        </ModelBox>
      </Container>
    );
  }
};

let mapStateToProps = ({ course }) => ({ courses : course });

export default connect(mapStateToProps)(CourseScreen);