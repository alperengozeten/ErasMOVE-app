import React from 'react';
import { Routes, Route } from 'react-router-dom';

// import HeaderContainer from '../containers/HeaderContainer';
import LoginContainer from '../../containers/LoginContainer';
import AuthenticatedRouter from './authenticatedRouter';
import ForgotPasswordContainer from '../../containers/ForgotPasswordContainer';

const mainRouter = () => {

  return (
    <div className="mainRouter">
      {/* <Suspense fallback={<div />}> */}
      <Routes>
        <Route path="/" element={ <LoginContainer /> } />
        <Route path="/main" element={ <AuthenticatedRouter /> } />
        <Route path="/forgotPassword" element={ <ForgotPasswordContainer /> } />
      </Routes>
      {/* </Suspense> */}
    </div>
  );
};

mainRouter.propTypes = {};

mainRouter.defaultProps = {};

export default mainRouter;
