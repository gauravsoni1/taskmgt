import React, { Component } from 'react';
import axios from 'axios';

import { Button, Paper, Typography, TextField, CircularProgress} from '@material-ui/core';
import { Link } from 'react-router-dom';


import classes from './login.module.scss';
import logo from '../../assets/images/logo.png';



class Login extends Component {

  state = {
    isAuthenticated: true,
    isAuthenticating: false,
    loginForm: true,
    formData: {
      email: '',
      password: ''
    },
    errorMessage: null
  }

  storeToken(data){
    localStorage.setItem('id',data.localId);
    localStorage.setItem('token',data.idToken);
  }

  authenticateUser = (evt) => {
    evt.preventDefault();
    this.setState({isAuthenticating:true});
    const loginData = {
      email: evt.target.email.value,
      password: evt.target.password.value,
      returnSecureToken: true
    }
    axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAyr0tBXo5Zy_0yds02_dzdjfXCmxQdjHM', loginData)
      .then(data => {
        console.log(data);
        this.setState({isAuthenticating:false});
        this.storeToken(data.data);
        this.props.history.push('/dashboard');
      }).catch(error => {
        const errorMsg = error.response.data.error.message;
        console.log(error.response.data);
        this.setState({ errorMessage: errorMsg,isAuthenticating:false});
      })
  };

  handleChange = (evt) => {
    let emailData = { ...this.state.formData };
    emailData.email = evt.target.value;
    this.setState({ formData: emailData });
  }

  render() {

    let displayErrorMessage = null;

    if (this.state.errorMessage) {
      displayErrorMessage = (
        <div className={classes.errorContainer}>
          <ul>
            <li>{this.state.errorMessage}</li>
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
          <Typography variant="h4">Login</Typography>
          <hr></hr>

          <form name="login" onSubmit={this.authenticateUser}>
            <div className={classes.loginFields}>
              <TextField name="email" type="email" className={classes.textField} label="Email"></TextField>
              <TextField name="password" type="password" className={classes.textField} label="Password"></TextField>
            </div>
            <div className={classes.loginActionButtons}>
              {!this.state.isAuthenticating ? <Button variant="contained" size="medium" color="primary" type="submit">Login</Button> : <CircularProgress></CircularProgress>}
              <Link to="/register" >Forgot Password ?</Link>
              <Link to="/register" >Register Now</Link>
            </div>
          </form>
          {displayErrorMessage}
        </Paper>
      </div>
    )
  }
}

export default Login;