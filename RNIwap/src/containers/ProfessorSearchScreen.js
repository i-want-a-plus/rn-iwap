import React from 'react';
import { Keyboard, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Content, Item, Icon, Input, Text, Button } from 'native-base';

import Loading from '../components/Loading';

import HeaderWithSearchBar from '../components/HeaderWithSearchBar';
import ProfessorList from '../components/ProfessorList';
import LogoBackground from '../components/LogoBackground';

import actions from '../actions';

class ProfessorSearchScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocus: false
    };
  }

  handleSearch (query) {
    this.props.dispatch(actions.performProfessorSearch({ query }));
  }

  render() {
    let { dispatch } = this.props;
    let { professorSearch } = this.props;

    return (
      <Container>
        <HeaderWithSearchBar
          onChange={(query) => { this.handleSearch(query); }}
          placeholder="Search professor"
        />
        {professorSearch.isPending
          ? <Loading />
          : professorSearch.data === null || !professorSearch.data.length
            ? <LogoBackground />
            : <Content>
                {professorSearch.data && <ProfessorList professors={professorSearch.data} />}
              </Content>
        }
      </Container>
    );
  }
};

let mapStateToProps = ({ professorSearch }) => ({ professorSearch });

export default connect(mapStateToProps)(ProfessorSearchScreen);