import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Reusing Login CSS for consistency

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const apiUrl = process.env.REACT_APP_API_URL;

    axios
      .post(`${apiUrl}/api/signup`, { email, password })
      .then((response) => {
        setSuccess('Signup successful! Please login to continue...');
        
        // Assuming the response contains a JWT token
        const { token } = response.data;

        // Save token to localStorage
        localStorage.setItem('jwtToken', token);

        // Redirect to dashboard
        setTimeout(() => navigate('/'), 2000);
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message || 'Signup failed. Try again.');
        } else if (error.request) {
          setError('No response from server. Please try again later.');
        } else {
          setError('An unexpected error occurred. Please try again.');
        }
      });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSignUp}>
        <h2>Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
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
        <button type="submit" className="btn">Sign Up</button>
        <div className="signup-prompt">
          Already have an account? <a href="/">Login</a>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
