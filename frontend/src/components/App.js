import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import PropTypes from 'prop-types';

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";

import Routes from '../routes';
import themes from '../themes';
// import NavigationScroll from '../layout/NavigationScroll';
import { getUserRequest, getApplicationRequest, getNotificationsRequest } from '../actions';

const App = ({ getUserRequest, getApplicationRequest, typeForReq, status, userId, getNotificationsRequest }) => {
  useEffect(() => {
    if (status == 'authenticated') {
      getUserRequest(userId, typeForReq);

      if (typeForReq == 'outgoingStudent') {
        getApplicationRequest(userId);
      }
      
      getNotificationsRequest(userId);
    }

  }, [getUserRequest, getApplicationRequest, typeForReq, status, userId, getNotificationsRequest]);
  const customization = useSelector(state => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <Router>
          <Routes />
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

const mapStateToProps = state => {
  const typeForReq = state.auth.authTypeForReq;
  const status = state.auth.status;
  const userId = state.auth.userId; 
  return {
    typeForReq,
    status,
    userId,
  };
};

const mapActionsToProps = {
  getUserRequest,
  getApplicationRequest,
  getNotificationsRequest,
};

App.propTypes = {
  typeForReq: PropTypes.string,
  status: PropTypes.string,
  userId: PropTypes.string,
  getUserRequest: PropTypes.func,
  getApplicationRequest: PropTypes.func,
  getNotificationsRequest: PropTypes.func,
};

export default connect(mapStateToProps, mapActionsToProps)(App);
