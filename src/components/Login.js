import React, { useState } from 'react';
import './Login.css';
import logo from '../assets/logo.jpg';
import background from '../assets/background.jpg';

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
      </div>
    </div>
  );
}

export default Login;
