import React from 'react';
import { func } from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';


const Login = ({ logInRequest }) => {
  console.log("login page");

  const navigate = useNavigate();
  
  return (
    <div className="login">
      <div>ErasMOVE</div>
        <input id="username" className='inp' placeholder='username'></input>
        <input type={"password"} id="password" className='inp' placeholder='password'></input>
        <button className='login-btn' onClick={() => logInRequest(navigate)}>Login</button> 
        <p> Did you forgot your password? <Link to="/forgotPassword">Forgot Password</Link></p>
    </div>
  );
};

Login.propTypes = {
  logInRequest: func.isRequired,
};


export default Login;