import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = ({ sendCodeRequest, changePasswordRequest }) => {
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [codeEmail, setCodeEmail] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const changePassword = () => {
    const user = {
      email,
      password,
      password2
    }
    changePasswordRequest(user);
  }


  return (
    <div className="forgotPassword">
      <div>Forgot password</div>
      <div className='send-code'>
        <input id="codeEmail" className='inp' type={'email'} placeholder='example@bilkent.edu.tr' value={codeEmail} onChange={e => setCodeEmail(e.target.value)}></input>
        <button type='button' onClick={() => sendCodeRequest(codeEmail)}>Send Code</button>
      </div>
      <div className='change-password'>
        <input id="email" className='inp' type={'email'} placeholder='example@bilkent.edu.tr' value={email} onChange={e => setEmail(e.target.value)}></input>
        <input id="code" className='inp' type={'text'} placeholder='Code' value={code} onChange={e => setCode(e.target.value)}></input>
        <input id="new-pass" className='inp' type={"password"} placeholder='password' value={password} onChange={e => setPassword(e.target.value)}></input>
        <input id="new-pass-again" className='inp' type={"password"} placeholder='password again' value={password2} onChange={e => setPassword2(e.target.value)}></input>
        <button type='button' onClick={() => changePassword()}>Change Password</button>
      </div>
      <p> Go back to login page. <Link to="/">Login page</Link></p>
    </div>
  );
};

ForgotPassword.propTypes = {
  sendCodeRequest: f => f,
  changePasswordRequest: f => f,
};


export default ForgotPassword;