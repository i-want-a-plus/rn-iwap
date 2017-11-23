import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Icon } from 'native-base';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  line: {
    paddingTop: 2,
    paddingBottom: 2
  },
  iconContainer: {
    width: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  displayText: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.7)'
  },
  value: {
    paddingLeft: 10,
    fontWeight: '600'
  }
});

class DetailList extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    let { data, map, limitToMap } = this.props;

    if (limitToMap) {
      data = _.pick(data, _.keys(map));
    }

    data = _.map(data, (value, key) => ({
      key,
      value: _.get(map, [key, 'p'], a => a)(value),
      displayText: _.get(map, [key, 'displayText'], key),
      icon: _.get(map, [key, 'icon'])
    }));

    return (
      <View>
        <FlatList
          data={data}
          renderItem={({ item: { icon, value, displayText } }) => (
            <View style={StyleSheet.flatten([ styles.line, styles.inline ])}>
              {icon && <View style={styles.iconContainer}>
                {_.isString(icon) ? <Icon name={icon} /> : icon()}
              </View>}
              <Text style={styles.displayText}>{displayText}</Text>
              <Text style={styles.value}>{value}</Text>
            </View>
          )}
        />
      </View>
    );
  }
};

DetailList.propTypes = {
  data: PropTypes.object.isRequired,
  map: PropTypes.shape({
    icon: PropTypes.oneOfType([ PropTypes.string, PropTypes.function ]),
    displayText: PropTypes.string
  }),
  limitToMap: PropTypes.bool
};

export default connect()(DetailList);