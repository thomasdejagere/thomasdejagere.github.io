import React from 'react';
import {authenticateApi} from '../app/containers/App/actions';
import {connect} from 'react-redux';

class Wrapper extends React.Component {
  componentWillMount() {
    const {dispatch} = this.props;
    console.log("this");
    console.log(this);
    dispatch(authenticateApi());
  }

  render() {

    return (
      <div>
        {this.props.children}
      </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {

  }
};

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(Wrapper);
