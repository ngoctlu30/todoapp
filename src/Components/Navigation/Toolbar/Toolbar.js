import React from 'react';

import classes from './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
  
  <header className={classes.Toolbar} > 
    <div className={classes.Logo}>
      <h3>LOGO</h3>
    </div>
    <nav>
      <NavigationItems isAuthenticate={props.isAuth} userEmail={props.userEmail}/>
    </nav>
  </header>
)
export default toolbar;