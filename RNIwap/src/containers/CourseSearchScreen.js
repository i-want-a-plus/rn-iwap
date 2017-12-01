import React from 'react';
import { Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Content, Item, Icon, Input, Text, Button } from 'native-base';

import Loading from '../components/Loading';

import HeaderWithSearchBar from '../components/HeaderWithSearchBar';
import CourseList from '../components/CourseList';
import LogoBackground from '../components/LogoBackground';

import actions from '../actions';

import { smartSearch } from '../utils';

class CourseSearchScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocus: false
    };
  }

  handleSearch (query) {
    this.props.dispatch(actions.performCourseSearch(smartSearch(query)));
  }

  render() {
    let { dispatch } = this.props;
    let { courseSearch } = this.props;

    return (
      <Container>
        <HeaderWithSearchBar
          onSearch={(query) => { this.handleSearch(query); }}
          placeholder="Search course"
        />
        {courseSearch.isPending
          ? <Loading />
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