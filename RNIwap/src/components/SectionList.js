import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';

import SectionCard from './SectionCard';

import actions from '../actions';

class SectionList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { dispatch, sections } = this.props;

    return (
      <View>
        <FlatList
          style={{ paddingTop: 10, paddingBottom: 10 }}
          data={sections}
          keyExtractor={({ id, _id }) => id || _id}
          renderItem={({ item }) => <SectionCard section={item} />}
        />
      </View>
    );
  }
};

SectionList.propTypes = {
  sections: PropTypes.array
};

export default connect()(SectionList);