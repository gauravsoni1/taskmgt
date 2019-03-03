import React from 'react';

//Library
import { ListItem, Divider, ListItemText, ListItemIcon, Drawer, List, Typography } from '@material-ui/core';
import { Star, CalendarToday, TrendingUp, TurnedIn } from '@material-ui/icons';

//Assets
import logo from '../../assets/images/logo.png';
import classes from './navigationMenu.module.scss';

const NavigationMenu = () => {
  const menuItems = [
    { menuName: "Today", icon: 'star' },
    { menuName: "Tomorrow", icon: 'calendar_today' },
    { menuName: "Upcoming", icon: 'trending_up' },
    { menuName: "Unplanned", icon: 'turned_in' },
  ];

  const getIcon = (icon) => {
    switch (icon) {
      case 'star':
        return (<Star></Star>)
      case 'calendar_today':
        return (<CalendarToday></CalendarToday>)
      case 'trending_up':
        return (<TrendingUp></TrendingUp>)
      case 'turned_in':
        return (<TurnedIn></TurnedIn>)
      default:
        return (<div></div>)
    }

  }

  return (
      <Drawer variant="permanent" className={classes.navDrawer}>
        <div className={classes.navHeader}>
          <img src={logo} alt="logo"></img>
          <Typography variant="h4">RoboTASK</Typography>
        </div>
        <Divider />
        <List>
          {menuItems.map((menu, index) => (
            <ListItem button key={menu.menuName}>
              <ListItemIcon>{getIcon(menu.icon)}</ListItemIcon>
              <ListItemText primary={menu.menuName} />
            </ListItem>
          ))}
        </List>
      </Drawer>
  )
};

export default NavigationMenu;