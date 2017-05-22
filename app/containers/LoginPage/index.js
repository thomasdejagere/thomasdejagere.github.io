import React from 'react';
import { Field, reduxForm } from 'redux-form'
import {connect} from 'react-redux';
import Button from 'components/Button';
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {authenticateUser} from '../app/actions';
import {push} from 'react-router-redux';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMessage: ""
    }
  }

  handleChange(arg1, arg2) {
    const value = {};
    value[arg1] = arg2.target.value;
    this.setState(
      value
    )
  }

  login() {
    const {dispatch} = this.props;
    dispatch(authenticateUser(this.state.username, this.state.password))
      .then(() => {
        dispatch(push('/'));
      })
      .catch((err) => {
        console.log("catch err", err);
        this.setState({
          errorMessage: err
        })
      })
  }

  register() {
    const {dispatch} = this.props;
    dispatch(push('/register'));
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
        <div>
          <FormGroup
            controlId="username"
          >
            <ControlLabel>Email</ControlLabel>
            <FormControl
              type="text"
              value={this.state.username}
              placeholder="Username"
              onChange={this.handleChange.bind(this, "username")}
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup
            controlId="password"
          >
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="password"
              value={this.state.password}
              placeholder="Password"
              onChange={this.handleChange.bind(this, "password")}
            />
            <FormControl.Feedback />
          </FormGroup>
          <p>{this.state.errorMessage}</p>
          <Button text="Login" onClick={this.login.bind(this)} />
          <Button text="Register" onClick={this.register.bind(this)}/>
        </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {

  }
};

export default connect(mapStateToProps)(LoginPage);
