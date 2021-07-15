import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import classes from './Navigation.module.css';

const Navigation = (props) => {
 
  return (
    <nav className={classes.nav}>
      <ul>
        {props.isLoggedIn && (
          <li>
            <button onClick={props.onLogout}>Logout</button>
          </li>
        )}
          {!props.isLoggedIn && props.showLoginBtn && (
          <li>
            <Link to='/login'><button onClick={props.loginBtnHandler.bind(this,false)}>Login</button></Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
