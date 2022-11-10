import React from 'react';
import PropTypes from 'prop-types';
import { Routes, Route } from 'react-router-dom';

import HeaderContainer from '../../containers/HeaderContainer';
import DashboardContainer from '../../containers/DashboardContainer';

const authenticatedRouter = () => {
  console.log('authenticated...');

  return (
    <div className="authenticatedRouter">
      {/* <Suspense fallback={<div />}> */}
      <HeaderContainer />
      <Routes>
        <Route path="/main/dash" element={ <DashboardContainer /> } />
      </Routes>
      {/* </Suspense> */}
    </div>
  );
};

authenticatedRouter.propTypes = {
  initApp: PropTypes.func.isRequired,
};

authenticatedRouter.defaultProps = {
  initApp: f => f,
};

export default authenticatedRouter;
