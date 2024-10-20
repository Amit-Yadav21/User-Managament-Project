// src/components/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import the CSS file for styling
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons for show/hide

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/user/login', {
        email,
        password,
      });
      
      // Save the token to local storage
      localStorage.setItem('token', response.data.token);
      alert(`Login successful: ${response.data.token}`);
    } catch (error) {
      alert(`Login failed: ${error.response.data.message}`);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card"> {/* Added a wrapper for the card effect */}
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />
          <div className="password-container"> {/* Container for password input and icon */}
            <input
              type={showPassword ? 'text' : 'password'} // Toggle input type based on state
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
            <span className="password-icon" onClick={() => setShowPassword(!showPassword)}> {/* Toggle visibility on click */}
              {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Show/hide icon */}
            </span>
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
