import React from 'react';
import './Login.css';
import logo from '../assets/logo.jpg';
import background from '../assets/background.jpg';

function Login({ onGoogleSignIn }) {
  return (
    <div className="login-container" style={{ backgroundImage: `url(${background})` }}>
      <div className="login-box">
        <img src={logo} alt="Logo" className="logo" />
        <h2>Welcome to Biochar.Life</h2>
        <button className="btn" onClick={onGoogleSignIn}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
