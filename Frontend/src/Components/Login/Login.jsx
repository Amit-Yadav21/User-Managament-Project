import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://user-managament-project.vercel.app/api/user/login', {
        email,
        password,
      });

      // Save the token to local storage
      localStorage.setItem('token', response.data.token);
      toast.success('Login successful!');

      // Redirect to user list after successful login
      navigate('/users');
    } catch (error) {
      toast.error(`${error.response?.status} ${error.response?.statusText}, ${error.response?.data?.message || (error.status && error.message)}`);
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