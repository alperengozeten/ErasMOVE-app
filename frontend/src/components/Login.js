import React from 'react';
import { func } from 'prop-types';
import { useNavigate } from 'react-router-dom';


const Login = ({ logInRequest }) => {
  console.log("login page");

  const navigate = useNavigate();
  
  return (
    <div className="login">
      <div>ErasMOVE</div>
        <input id="username" className='inp' placeholder='username'></input>
        <input type={"password"} id="password" className='inp' placeholder='password'></input>
        <button className='login-btn' onClick={() => logInRequest(navigate)}>Login</button> 
    </div>
  );
};

Login.propTypes = {
  logInRequest: func.isRequired,
};


export default Login;