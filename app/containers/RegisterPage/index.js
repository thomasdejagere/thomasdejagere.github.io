import React from 'react';
import {connect} from 'react-redux';
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import Button from 'components/Button';
import {registerUser} from '../app/actions';
import {push} from 'react-router-redux';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      errorMessage: [],
      validationState: {
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        confirmPassword: false
      }
    }
  }

  onSubmit() {
    let validationState = {};
    let errorMessage = [];
    if (this.state.firstName === "") {
      validationState.firstName = true;
    }

    if (this.state.lastName === "") {
      validationState.lastName = true;
    }

    if (this.state.email === "") {
      validationState.email = true;
    }

    if (this.state.password === "") {
      validationState.password = true;
    }

    if (this.state.confirmPassword === "") {
      validationState.confirmPassword = true;
    }

    if (this.state.password !== this.state.confirmPassword) {
      validationState.confirmPassword = true;
      errorMessage.push("Password and confirm password aren't the same!");
    }

    if (!isOkPass(this.state.password)) {
      validationState.password = true;
      errorMessage.push("Password must have at least 8 characters");
      errorMessage.push("Password must have at least 1 uppercase character");
      errorMessage.push("Password must have at least 1 lowercase character");
      errorMessage.push("Password must have at least 1 special character (@, !, ?,...)");
    }

    const {dispatch} = this.props;

    if (Object.keys(validationState).length === 0 && validationState.constructor === Object) {
      dispatch(registerUser({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password
      }));
      dispatch(push('/login'));
    } else {
      this.setState({
        validationState,
        errorMessage
      });
    }
  }


  handleChange(arg1, arg2) {
    const value = {};
    value[arg1] = arg2.target.value;
    this.setState(
      value
    )
  }
  render() {
    return (
      <div>
        <FormGroup
          controlId="firstName"
          validationState={this.state.validationState.firstName ? "error" : null}
        >
          <ControlLabel>First name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.firstName}
            onChange={this.handleChange.bind(this, "firstName")}
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup
          controlId="lastName"
          validationState={this.state.validationState.lastName ? "error" : null}
        >
          <ControlLabel>Last name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.lastName}
            onChange={this.handleChange.bind(this, "lastName")}
          />
          <FormControl.Feedback />
          </FormGroup>
          <FormGroup
            controlId="email"
            validationState={this.state.validationState.email ? "error" : null}
          >
            <ControlLabel>Email</ControlLabel>
            <FormControl
              type="text"
              value={this.state.username}
              onChange={this.handleChange.bind(this, "email")}
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup
            controlId="password"
            validationState={this.state.validationState.password ? "error" : null}
          >
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="password"
              value={this.state.password}
              onChange={this.handleChange.bind(this, "password")}
            />

            <FormControl.Feedback />
          </FormGroup>
          <FormGroup
            controlId="confirmPassword"
            validationState={this.state.validationState.confirmPassword ? "error" : null}
          >
            <ControlLabel>Confirm password</ControlLabel>
            <FormControl
              type="password"
              value={this.state.confirmPassword}
              onChange={this.handleChange.bind(this, "confirmPassword")}
            />
            <FormControl.Feedback />
          </FormGroup>
          <Button text="Submit" onClick={this.onSubmit.bind(this)} />
          {this.state.errorMessage.map((element) => {
              return (<p style={{color: "#a94442"}}>{element}</p>)
            })
          }
      </div>
    )
  }
}

function isOkPass(p){
    var anUpperCase = /[A-Z]/;
    var aLowerCase = /[a-z]/;
    var aNumber = /[0-9]/;
    var aSpecial = /[!|@|#|$|%|^|&|*|(|)|-|_]/;

    if(p.length < 9){
        return false;
    }

    var numUpper = 0;
    var numLower = 0;
    var numNums = 0;
    var numSpecials = 0;
    for(var i=0; i<p.length; i++){
        if(anUpperCase.test(p[i]))
            numUpper++;
        else if(aLowerCase.test(p[i]))
            numLower++;
        else if(aNumber.test(p[i]))
            numNums++;
        else if(aSpecial.test(p[i]))
            numSpecials++;
    }

    if(numUpper < 1 || numLower < 1 || numNums < 1 || numSpecials < 1){
        return false;
    }
    return true;
}

function mapStateToProps(state) {
  return {

  }
}

export default connect(mapStateToProps)(RegisterPage);
