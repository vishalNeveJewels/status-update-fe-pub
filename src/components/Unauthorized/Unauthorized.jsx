import React from 'react';
import './unauthorized.css';

const Unauthorized = () => {
  return (
    <div className="section">
      <h1 className="error">401</h1>
      <div className="page">Oops! The page you are looking for is unauthorized.</div>
    </div>
  );
};

export default Unauthorized;
