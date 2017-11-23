import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';

import CourseCard from './CourseCard';

import actions from '../actions';

class CourseList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { dispatch, courses } = this.props;

    return (
      <View>
        <FlatList
          style={{ paddingTop: 10, paddingBottom: 10 }}
          data={courses}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => <CourseCard course={item} />}
        />
      </View>
    );
  }
};

CourseList.propTypes = {
  courses: PropTypes.array
};

export default connect()(CourseList);