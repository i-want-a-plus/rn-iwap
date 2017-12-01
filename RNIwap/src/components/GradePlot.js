import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import {
  VictoryAxis, VictoryBar, VictoryChart, VictoryTheme }
from "victory-native";

import { gradeMap } from '../utils/reduce';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class GradePlot extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    if (!_.isFinite(_.get(this.props, 'plotData.0.0.percent'))) {
      return <View></View>;
    }

    return (
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
          {_.map(this.props.plotData, (data, idx) => (
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
    );
  }
};

export default connect()(GradePlot);