import React from 'react'

const NavBar = ({ showLoginHandler, showRegisterHandler, showLogOut, logOutHandler }) => {

  const firmName = localStorage.getItem('firmName') || 'Your Firm';

  return (
    <div className="navSection">
      
      <div className="logo">
        <img src="/assets/logo.jpg" alt="App Logo" />
      </div>

      <div className="company">
        Vendor Control Panel
      </div>

      <div className="firmName">
        <h4>Firm Name: <span style={{ fontWeight: 'normal' }}>{firmName}</span></h4>
      </div>

      <div className="userAuth">
        {!showLogOut ? (
          <>
            <span onClick={showLoginHandler} className="authLink">Login</span>
            <span> / </span>
            <span onClick={showRegisterHandler} className="authLink">Register</span>
          </>
        ) : (
          <span
            onClick={logOutHandler}
            className="logout"
          >
            Logout
          </span>
        )}
      </div>

    </div>
  );
};

export default NavBar;
