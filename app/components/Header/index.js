import React from 'react';
import { FormattedMessage } from 'react-intl';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import Banner from './banner.jpg';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  routeToHome() {
    const {dispatch} = this.props;
    dispatch(push('/'));
  }

  render() {
    return (
      <div>
        <div>
          <h3 style={{"text-align": "center"}, {"cursor": "pointer"}} onClick={this.routeToHome.bind(this)}>Serie Manager</h3>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {

  }
}

export default connect(mapStateToProps)(Header);
