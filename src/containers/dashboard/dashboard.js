import React, { Component } from 'react';

//Component
import NavigationMenu from '../../components/navigationMenu/navigationMenu';
import Today from '../today/today';


import classes from './dashboard.module.scss';


class Dashboard extends Component {  

  render() {
    

    return (
      <div className={classes.rootContainer}>
        <NavigationMenu></NavigationMenu>
        <main className={classes.content}>
          <Today></Today>
        </main>
      </div>
    )
  }
}


export default Dashboard;