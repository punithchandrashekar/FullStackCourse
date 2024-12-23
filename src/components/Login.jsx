import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    axios
      .post('/api/login', { email, password })
      .then((response) => {
        // Assuming the response contains a JWT token
        const { token } = response.data;

        // Save token to localStorage
        localStorage.setItem('jwtToken', token);

        // Redirect to dashboard upon successful login
        navigate('/dashboard');
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message || 'Invalid credentials');
        } else if (error.request) {
          setError('No response from server. Please try again later.');
        } else {
          setError('An unexpected error occurred. Please try again.');
        }
      });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="btn">Login</button>
        <div className="signup-prompt">
          Don't have an account? <a href="/signup">Sign up</a>
        </div>
        <button className="social-login-btn google">Login with Google</button>
        <button className="social-login-btn facebook">Login with Facebook</button>
      </form>
    </div>
  );
};

export default Login;
