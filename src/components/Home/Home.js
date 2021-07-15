import React, {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import Card from '../UI/Card/Card';
import classes from './Home.module.css';

const Home = (props) => {
  const [userState, setUserState] = useState({
    name:"",
    userId:"",
    username:"",
    role:""
  })
  const getUserData = async() => {
    try{

      const header = {
        'Authorization' : "Bearer "+Cookies.get('jwtToken')
      }
      const response = await fetch('https://gcdms.hostg.in:1443/api/auth/get_user_details', {
        method: 'GET',
        headers: header
      });
      const data = await response.json();
      console.log('UserData',data);
      if(data.success){
        setUserState({
          name:data.data.first_name+" "+data.data.middle_name+" "+data.data.last_name,
          userId: data.data.user_id,
          username: data.data.username,
          role: data.data.role
        })
      }
    }catch(e){
      console.log(e)
    }
  }
  useEffect(() => {
   getUserData();
  }, []);
  return (
    <Card className={classes.home}>
      <img src='https://www.fairtravel4u.org/wp-content/uploads/2018/06/sample-profile-pic.png'></img>
      <h3>{userState.name}</h3>
      <h3>{userState.userId}</h3>
      <h3>{userState.username}</h3>
      <h3>{userState.role}</h3>
    </Card>
  );
};

export default Home;
