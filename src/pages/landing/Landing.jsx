import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page-wrapper">
      <div className="landing-border-container">
        <div className="landing-content-bottom">
          <h1 className="landing-title">Welcome to PopX</h1>

          <div className="landing-text">
            <p>Lorem ipsum dolor sit amet,</p>
            <p>consectetur adipiscing elit.</p>
          </div>

          <div className="landing-buttons">
            <button className="create-account-btn" onClick={() => navigate('/create-account')}>
              Create Account
            </button>
            <button className="login-btn" onClick={() => navigate('/login')}>
              Already Registered? Login
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Landing;