import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import { List, ListItem, Text, Body, Right, Icon } from 'native-base'
import { connect } from 'react-redux';

import actions from '../actions';

class ProfessorList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { dispatch, professors } = this.props;

    return (
      <View>
        <List>
          <FlatList
            style={{ paddingTop: 10, paddingBottom: 10 }}
            data={professors}
            keyExtractor={({ id, _id }) => id || _id}
            renderItem={({ item: { lastName, firstName, id } }) => (
              <ListItem icon
                button
                onPress={() => dispatch({ type: 'GOTO', routeName: 'Professor', params: { professorId: id } })}
              >
                <Body>
                  <Text>{lastName}, {firstName}</Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            )}
          />
        </List>
      </View>
    );
  }
};

ProfessorList.propTypes = {
  professors: PropTypes.array
};

export default connect()(ProfessorList);