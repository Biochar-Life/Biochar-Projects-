import React, { useState } from 'react';
import './Login.css';
import logo from '../assets/logo.jpg';
import background from '../assets/background.jpg';
import { useNavigate } from 'react-router-dom'; // If using React Router

function Login({ onGoogleSignIn }) {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Hook to navigate to the Create Account page

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /\S+@\S+\.\S+/; // Simple regex for email validation
    if (!email || !emailRegex.test(email)) {
      alert('Please enter a valid email address');
    } else {
      onGoogleSignIn(email); // Proceed with Google sign-in
    }
  };

  const handleCreateAccount = () => {
    navigate('/create-account'); // Navigate to the Create Account page when the button is clicked
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${background})` }}>
      <div className="login-box">
        <img src={logo} alt="Logo" className="logo" />
        <h2>Welcome to Biochar.Life</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Please enter your email to login</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Please enter your email to login"
              required
            />
          </div>
          <button type="submit" className="btn">
            Login
          </button>
        </form>

        {/* Create Account Section */}
        <div className="create-account-section">
          <p>Don't have an account?</p>
          <button onClick={handleCreateAccount} className="btn">
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
