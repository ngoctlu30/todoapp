import React from 'react';


import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => (
  <ul className={classes.NavigationItems} >
    <NavigationItem link="/" exact> Todo App</NavigationItem>
    {props.isAuthenticate ? <NavigationItem link="/todo">Todos</NavigationItem> : null }
    {props.isAuthenticate ? <NavigationItem link="/profile">Xin chào {props.userEmail}</NavigationItem> : null}
    {!props.isAuthenticate ? <NavigationItem link="/signin">Sign in</NavigationItem> : <NavigationItem link="/logout">Logout</NavigationItem>}
  </ul>
  
)

export default NavigationItems;