import '../styles/App.css';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HeaderContainer from '../containers/HeaderContainer';
import DashboardContainer from '../containers/DashboardContainer';
import LoginContainer from '../containers/LoginContainer';
import ForgotPasswordContainer from '../containers/ForgotPasswordContainer';

const App = ({ initApp }) => {
  useEffect(() => {
    initApp('appText');
  }, [initApp]);

  return (
    <Router>
      <div className="App">
        {/* <Suspense fallback={<div />}> */}
        <HeaderContainer />
        <Routes>
          <Route path="/dash" element={ <DashboardContainer /> } />
          <Route path="/" element={ <LoginContainer /> } />
          <Route path="/forgotPassword" element={ <ForgotPasswordContainer /> } />
        </Routes>
        {/* </Suspense> */}
      </div>
    </Router>
  );
};

App.propTypes = {
  initApp: PropTypes.func.isRequired,
};

App.defaultProps = {
  initApp: f => f,
};

export default App;
