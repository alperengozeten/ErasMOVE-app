import React, { useState } from 'react';
import { func } from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';


const Login = ({ logInRequest }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const logIn = () => {
    const user = {
      email,
      password,
    };
    logInRequest(user, navigate);
  };
  
  return (
    <div className="login">
      <div>ErasMOVE</div>
        <input id="email" className='inp' placeholder='email' value={ email } onChange={ e => setEmail(e.target.value) }></input>
        <input type={ "password" } id="password" className='inp' placeholder='password' value={ password } onChange={ e => setPassword(e.target.value) }></input>
        <button className='login-btn' onClick={ () => logIn() }>Login</button> 
        <p> Did you forgot your password? <Link to="/forgotPassword">Forgot Password</Link></p>
    </div>
  );
};

Login.propTypes = {
  logInRequest: func.isRequired,
};


export default Login;