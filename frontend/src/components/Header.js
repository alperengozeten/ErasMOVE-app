import React from 'react';
import { string, func } from 'prop-types';
import { Link } from 'react-router-dom';

import '../styles/Header.css';

const Header = () => {

  const logOut = () => {
    console.log("LogOut");
  };

  const status = 'authenticated';
  return (
    <div className="header">
      <div className="app-info">
        <h1 className="none-mobile-1000">ErasMOVE</h1>
      </div>
      { status === 'authenticated' ? (
        <div className="authenticated">
          <div className="nav-container">
            <div className="navigation">
              <Link to="/dash">
                <p className="nav-link" href="/">Dashboard</p>
              </Link>
            </div>
          </div>
          <div className="logout">
            <Link to="/">
              <button className="btn logout-btn" type="button" onClick={ logOut }>
                <span className="none-mobile-500">Sign Out</span>
              </button>
            </Link>
          </div>
        </div>
      ) : null }
    </div>
  );
};

Header.propTypes = {
  status: string,
  logOut: func.isRequired,
};

Header.defaultProps = {
  status: 'not-authenticated',
};

export default Header;
