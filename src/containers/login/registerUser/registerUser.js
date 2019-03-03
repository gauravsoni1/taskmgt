import React, { Component } from 'react';
import { Paper, TextField, Typography, Button, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';

import classes from '../login.module.scss';
import registerUserClass from './registerUser.module.scss';

import logo from '../../../assets/images/logo.png';


class RegisterUser extends Component {
  state = {
    isRegistering: false,
    registrationSuccess: false,
    error: {
      status: false,
      message: null
    }
  }

  //Called on Submit of form
  registerUser = (event) => {
    event.preventDefault();
    this.setState({ isRegistering: true });
    const userData = {
      email: event.target.email.value,
      password: event.target.password.value
    }
    axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAyr0tBXo5Zy_0yds02_dzdjfXCmxQdjHM', userData)
      .then(data => {
        let err = {...this.state.error,status:false,message:null};
        this.setState({ isRegistering: false, registrationSuccess: true,error:err });
        console.log(data);
      })
      .catch(error => {
        let err = {...this.state.error,status:true,message:error.response.data.error.message};
        this.setState({isRegistering: false,error:err });
      })
  };

  redirectToLogin = () =>{
    this.props.history.push('/');
  }

  render() {
    let registrationForm = null;
    if (!this.state.registrationSuccess) {
      registrationForm = (
        <form name="registration" onSubmit={this.registerUser}>
          <div className={classes.loginFields}>
            <TextField name="email" type="email" className={classes.textField} label="Email"></TextField>
            <TextField name="password" type="password" className={classes.textField} label="Password"></TextField>
          </div>
          <div className={classes.loginActionButtons}>
            {this.state.isRegistering ? <CircularProgress></CircularProgress> : <Button variant="contained" size="medium" color="primary" type="submit">Register</Button>}
            <Link to="/" >Login</Link>
          </div>
        </form>)
    } else {
      registrationForm = (
        <div className={registerUserClass.regComplete}>
          <Typography variant="h4" className={registerUserClass.regSuccess}>Registration Success</Typography>
          <Button variant="contained" color="primary" onClick={this.redirectToLogin}> Return To Login</Button>
        </div>
      )
    }

    let errorForm = null;
    if (this.state.error.status) {
      errorForm = (
        <div className={classes.errorContainer}>
          <ul>
            <li>{this.state.error.message}</li>
          </ul>
        </div>
      )
    }

    return (
      <div className={classes.loginContainer}>
        <div className={classes.loginTitle}>
          <img src={logo} alt="logo"></img>
          <Typography variant="h2">Robo Tasks</Typography>
        </div>
        <Paper className={classes.loginItems}>
          <Typography variant="h4">Registration</Typography>
          <hr></hr>
          {registrationForm}
          {errorForm}
        </Paper>
      </div>
    )
  }
}

export default RegisterUser;