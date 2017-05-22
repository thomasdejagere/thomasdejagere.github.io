import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Button from 'components/Button';
import styled from 'styled-components';
import {push} from 'react-router-redux';
import {logoutUser, showOnlySeen, showOnlyBookmarked, showAll} from '../app/actions';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    if (!this.props.isAuthenticated) {
      this.props.routeToLogin();
    }
  }

  logout() {
    this.props.logout();
  }

  render() {
    const {routeToSearchPage, routeToSeenPage, routeToBookmarkedPage, logout} = this.props;

    return (
      <article>
        <Helmet
          title="Home Page"
          meta={[
            { name: 'description', content: 'A React.js Boilerplate application homepage' },
          ]}
        />
        <ButtonsDiv>
          <ButtonDiv>
            <Button
              text="  Search"
              icon="search"
              size="large"
              onClick={routeToSearchPage}
            />
          </ButtonDiv>
          <ButtonDiv>
            <Button
              text="  Bookmarks"
              icon="heart"
              size="large"
              onClick={routeToBookmarkedPage}
            />
          </ButtonDiv>
          <ButtonDiv>
            <Button
              text="  Seen"
              icon="eye-open"
              size="large"
              onClick={routeToSeenPage}
            />
          </ButtonDiv>
          <ButtonDiv>
            <Button
              text="  Updates"
              icon="refresh"
              size="large"
            />
          </ButtonDiv>
          <ButtonDiv>
            <Button
              text="  Logout"
              size="large"
              onClick={logout}
            />
          </ButtonDiv>
        </ButtonsDiv>
        <p></p>
      </article>
    );
  }
}


const ButtonsDiv = styled.div`
  padding: 2px;
`;

const ButtonDiv = styled.div`
  padding: 2px;
`;



HomePage.propTypes = {
};

export function mapDispatchToProps(dispatch) {
  return {
    routeToSearchPage: () => {
      dispatch(showAll());
      dispatch(push('/search'))
    },
    routeToLogin: () => dispatch(push('/login')),
    logout: () => {
      dispatch(dispatch(push('/login')));
      dispatch(logoutUser());
    },
    routeToSeenPage: () =>  {
      dispatch(showOnlySeen());
      dispatch(push('/seen'));
    },
    routeToBookmarkedPage: () =>  {
      dispatch(showOnlyBookmarked());
      dispatch(push('/bookmarked'));
    }
  };
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.get('global').get('isAuthenticated')
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
