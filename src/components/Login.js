import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import './Login.css'; // Create CSS for styling
import logo from '../assets/logo.jpg'; // Logo image
import background from '../assets/background.jpg'; // Background image

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert('Please fill in all fields');
      return;
    }
    console.log('Logged in with username:', username);
  };

  const handleGoogleLogin = (response) => {
    console.log('Google Login successful:', response);
    // Check if the email is in the people table (you'll need backend API for this)
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${background})` }}>
      <div className="login-box">
        <img src={logo} alt="Logo" className="logo" />
        <h2>Welcome to Biochar.Life</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              required
            />
          </div>
          <button type="submit" className="btn">Login</button>
        </form>
        <GoogleLogin onSuccess={handleGoogleLogin} onError={() => console.log('Google login failed')} />
      </div>
    </div>
  );
}

export default Login;
