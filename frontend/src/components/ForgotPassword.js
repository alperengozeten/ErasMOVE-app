import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  
  return (
    <div className="forgotPassword">
      <div>Forgot password</div>
        <input id="email" className='inp' type={'email'} placeholder='example@bilkent.edu.tr'></input>
        <input id="code" className='inp' type={'text'} placeholder='password'></input>
        <input id="new-pass" className='inp' type={"password"} placeholder='password'></input>
        <input id="new-pass-again" className='inp' type={"password"} placeholder='password'></input>
        <p> Go back to login page. <Link to="/">Login page</Link></p>
    </div>
  );
};

ForgotPassword.propTypes = {};


export default ForgotPassword;