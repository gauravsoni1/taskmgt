import React, { Component } from 'react';
import { withRouter, Route, Switch,Redirect } from 'react-router-dom';

import Login from './containers/login/login';
import Dashboard from './containers/dashboard/dashboard';
import RegisterUser from './containers/login/registerUser/registerUser';

class App extends Component {
  render() {
    return (
        <Switch>
          <Route path='/login' exact component={Login}></Route>
          <Route path="/dashboard" component={Dashboard}></Route>
          <Route path="/register" component={RegisterUser}></Route>
          <Route path="/" component={Login}></Route>
          <Redirect to="/"></Redirect>
        </Switch>
    );
  }
}

export default withRouter(App);