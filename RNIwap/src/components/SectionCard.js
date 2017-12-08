import _ from 'lodash';
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
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 5
  },
  lineC: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden'
  },
  lineCp: {
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
    paddingLeft: 2,
    paddingRight: 7
  }
});

class SectionCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { pressed: false };
  }

  renderInfo = (info) => {
    return (
      <View style={StyleSheet.flatten([ styles.lineC, { marginTop: 0 } ])}>
        {info.Professors &&
          <View style={styles.lineCp}>
            <Text style={styles.lineCA}>Prof</Text>
            <Text style={styles.lineCB}>{_.chain(info.Professors[0]).pick('lastName', 'firstName').values().join(', ').value()}</Text>
          </View>
        }
        {(info.year || info.term) &&
          <View style={styles.lineCp}>
            <Text style={styles.lineCA}>Term</Text>
            <Text style={styles.lineCB}>{_.chain(info).pick('year', 'term').values().join(', ').value()}</Text>
          </View>
        }
      </View>
    );
  }

  render() {
    let { dispatch, section } = this.props;

    let info = _.pick(section, [ 'Professors.0', 'year', 'term' ]);

    let stat = section.PastSection || section.stat;

    return (
      <View style={styles.container}>
          <TouchableWithoutFeedback
            onPressIn={() => this.setState({ pressed: true })}
            onPressOut={() => this.setState({ pressed: false })}>
            <Animatable.View
              transition="scale"
              style={StyleSheet.flatten([
                styles.card,
                stat.averageGpa ? { backgroundColor:
                  shadeColor(colorMap[stat.averageGpa.toFixed(1) * 10], -0.25)
                } : { backgroundColor: '#777' },
                this.state.pressed ? { transform: [{ scale: 0.95 }] } : {}
              ])}
              underlayColor='#fff'>
              <View>
                {section.crn && <Text style={styles.lineB}>{section.crn}</Text>}
                {!_.isEmpty(info) && this.renderInfo(info)}
                <View style={styles.lineC}>
                  <Text style={styles.lineCA}>GPA</Text>
                  <Text style={styles.lineCB}>{stat.averageGpa ? stat.averageGpa.toFixed(2) : '---'}</Text>
                  <Text style={styles.lineCA}>Student Count</Text>
                  <Text style={styles.lineCB}>{stat.totalStudentCount || '---'}</Text>
                </View>
              </View>
            </Animatable.View>
          </TouchableWithoutFeedback>
      </View>
    );
  }
};

SectionCard.propTypes = {
  section: PropTypes.shape({
    id: PropTypes.number,
    crn: PropTypes.string,
    PastSection: PropTypes.shape({
      averageGpa: PropTypes.number,
      totalStudentCount: PropTypes.number,
      sd: PropTypes.number
    })
  }).isRequired
};

export default connect()(SectionCard);