import React from 'react';

import Navigation from './Navigation';
import classes from './MainHeader.module.css';

const MainHeader = (props) => {
  return (
    <header className={classes['main-header']}>
      <h1>Sample Project</h1>
      <Navigation loginBtnHandler={props.loginBtnHandler} showLoginBtn = {props.showLoginBtn}  isLoggedIn={props.isAuthenticated} onLogout={props.onLogout} />
    </header>
  );
};

export default MainHeader;
