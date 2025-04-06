import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="errorSection">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you’re looking for doesn’t exist.</p>

      <Link to="/" style={{ fontSize: '1.2rem', color: 'darkblue', textDecoration: 'underline', marginTop: '1rem' }}>
        ← Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
// 