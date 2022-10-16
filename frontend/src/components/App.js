import '../styles/App.css';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const App = ({ initApp }) => {
  useEffect(() => {
    initApp('appText');
  }, [initApp]);

  return (<div className="App">ErasMOVE</div>);
};

App.propTypes = {
  initApp: PropTypes.func.isRequired,
};

App.defaultProps = {
  initApp: f => f,
};

export default App;
