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

import CourseList from '../components/CourseList';
import FavoriteButton from '../components/FavoriteButton';
import DetailList from '../components/DetailList';
import GradePlot from '../components/GradePlot';

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
    paddingTop: 40,
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
  title: {
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

const sorters = {
  'Default': {
    fn: ({ subject, course }) => `${subject} ${course}`,
    icon: 'ios-arrow-round-down'
  },
  'Average GPA': {
    fn: fp.get('averageGpa'),
    icon: 'ios-create-outline'
  },
  'Student Count': {
    fn: fp.get('totalStudentCount'),
    icon: 'ios-person-outline'
  }
};

class ProfessorScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      professor: null,
      reducedSections: null,
      sortedCourses: null,
      sorter: sorters.Default,
      plotData: null
    };
  }

  componentDidMount () {
    let state = { id: this.props.navigation.state.params.professorId };
    this.setState(state);
    if (!this.props.professors[state.id]) {
      this.props.dispatch(actions.performProfessorFetch(state));
    } else {
      this.updateProfessorState(this.props, state);
    }
  }

  componentWillUnmount () {
    StatusBar.setHidden(false, 'slide');
  }

  componentWillReceiveProps (nextProps) {
    this.updateProfessorState(nextProps);
  }

  updateProfessorState (props = null, state = null) {
    state = state || this.state;
    props = props || this.props;
    if (!_.has(props, [ 'professors', state.id, 'isPending' ])) return;
    let professor = props.professors[state.id];
    if (!professor.isPending) {
      this.setState({ professor });
      this.updatePlotData(professor)
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.sorter != nextState.sorter || this.state.professor != nextState.professor) {
      this.sortCourseBy(nextState.sorter, nextState.professor.Courses);
    }
  }

  updatePlotData (professor) {
    let sections = _.flatMap(professor.Courses, 'Sections');
    let reducedSections = reduce(sections);
    let plotData = _.map(reducedSections, ({ stat }) => {
      return _.zipWith(
        gradeMap.gradeText,
        gradeMap.grade,
        gradeMap.dist,
        (text, grade, key) => ({
          text, grade, value: _.get(stat, key), percent: _.get(stat, key) / stat.totalStudentCount
        })
      );
    });
    this.setState({ plotData, reducedSections });
  }

  sortCourseBy ({ fn }, courses = null) {
    let sortedCourses = _.sortBy(courses || this.state.course, fn);
    this.setState({ sortedCourses });
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

  render() {
    let { dispatch } = this.props;
    let { professor } = this.state;

    if (!professor || professor.isPending) {
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
              <Text style={styles.title}>{professor.lastName}, {professor.firstName}</Text>
              {this.detailList(_.get(this.state.reducedSections, 'undefined.stat'))}
            </View>
            <GradePlot plotData={this.state.plotData} />
            <View style={StyleSheet.flatten([ styles.headContainer, styles.inline ])}>
              <Text style={styles.subtitle}>Courses</Text>
              <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <TouchableWithoutFeedback onPress={() => this.refs.linkModel.open()}>
                  <View style={{ paddingLeft: 10, paddingRight: 5 }}>
                    <Icon name={this.state.sorter.icon || 'ios-funnel-outline'} style={{ fontSize: 24 }} />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
            {this.state.sortedCourses && <View>
              <CollapseView collapsed={_.get(this.state.sortedCourses, 'length') > 2}>
                <CourseList courses={this.state.sortedCourses} />
              </CollapseView>
            </View>}
            <View style={styles.footContainer}>
              <FavoriteButton />
            </View>
          </Content>
        </ScrollView>

        <ModelBox style={{ height: sorters.length * 65 + 65 }} position="bottom" ref="linkModel">
          <Text style={styles.subtitle}>Sort courses by</Text>
          {_.map(sorters, (sorter, key) => (
            <Button block
              light={sorter != this.state.sorter}
              success={sorter == this.state.sorter}
              style={{ marginTop: 20 }}
              key={key}
              onPress={
                () => {
                  this.setState({ sorter: sorters[key] });
                  this.refs.linkModel.close();
                }
              }>
              <Text>{key}</Text>
            </Button>
          ))}
        </ModelBox>
      </Container>
    );
  }
};

let mapStateToProps = ({ professor }) => ({ professors: professor });

export default connect(mapStateToProps)(ProfessorScreen);