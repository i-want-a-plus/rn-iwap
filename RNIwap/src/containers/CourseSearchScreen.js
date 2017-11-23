import React from 'react';
import { Keyboard, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Content, Item, Icon, Input, Text, Button } from 'native-base';

import HeaderWithSearchBar from '../components/HeaderWithSearchBar';
import CourseList from '../components/CourseList';
import LogoBackground from '../components/LogoBackground';

import actions from '../actions';

class CourseSearchScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocus: false
    };
  }

  handleSearch (query) {
    this.props.dispatch(actions.performCourseSearch({ subject: query }))
  }

  render() {
    let { dispatch } = this.props;
    let { courseSearch } = this.props;

    return (
      <Container>
        <HeaderWithSearchBar
          onSearch={(query) => { this.handleSearch(query); }}
        />
        {courseSearch.isPending
          ? <ActivityIndicator size="large" style={{ marginTop: 30 }} />
          : courseSearch.data === null || !courseSearch.data.length
            ? <LogoBackground />
            : <Content>
                {courseSearch.data && <CourseList courses={courseSearch.data} />}
              </Content>
        }
      </Container>
    );
  }
};

let mapStateToProps = ({ courseSearch }) => ({ courseSearch });

export default connect(mapStateToProps)(CourseSearchScreen);