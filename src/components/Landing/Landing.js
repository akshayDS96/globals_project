import React , {useEffect} from 'react';

import Card from '../UI/Card/Card';
import classes from './Landing.module.css';

const Landing = (props) => {
 useEffect(() => {
        props.loginBtnHandler(true)
  }, []);
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
    </Card>
  );
};

export default Landing;
