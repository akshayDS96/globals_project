import React, { useState, useEffect } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom'
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import MainHeader from './components/MainHeader/MainHeader';
import Cookies from 'js-cookie';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginBtn, setShowLoginBtn] = useState(true);
  const history = useHistory();
  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = async(email, password) => {
    try{
      const body = {
        username: email,
        password: password
      }
      const response = await fetch('https://gcdms.hostg.in:1443/api/auth/guest-login', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log(data);
      if(data.success){
        Cookies.set('jwtToken', data.jwt)
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
        history.push('/home')
      }else{
        alert(data.message)
      }
    
    }catch(e){
      console.log(e)
    }
 
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    Cookies.remove('jwtToken')
    history.push('/landing')
  };

  const loginBtnHandler = (status) => {
    setShowLoginBtn(status)
  }

  return (
    <React.Fragment>
      <MainHeader loginBtnHandler={loginBtnHandler} showLoginBtn={showLoginBtn}  isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        <Route path='/' exact>
          <Redirect to="/landing" />
        </Route>
        <Route path='/landing'>
          <Landing loginBtnHandler={loginBtnHandler}/>
        </Route>
        <Route path='/login'>
         <Login onLogin={loginHandler} />
        </Route>
        <Route path='/home'>
          <Home onLogout={logoutHandler} />
        </Route>
      
      </main>
    </React.Fragment>
  );
}

export default App;