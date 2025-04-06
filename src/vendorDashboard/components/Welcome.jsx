import React from 'react';

const Welcome = () => {
  const firmName = localStorage.getItem('firmName');

  return (
    <div className="welcomeSection">
      <h2>
        Welcome,<br />
        <span style={{ color: '#333' }}>{firmName || "Vendor"}</span>
      </h2>
      <div className="landingImage">
        <img
          src="/assets/del.gif"
          alt="Welcome Illustration"
          width="75%"
          style={{ maxWidth: '400px' }}
        />
      </div>
    </div>
  );
};

export default Welcome;
