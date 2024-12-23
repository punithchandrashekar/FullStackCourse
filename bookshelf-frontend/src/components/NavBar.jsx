import React from "react";
import { useNavigate } from "react-router-dom";  // Use useNavigate instead of useHistory
import '../styles/Navbar.css';

const NavBar = () => {
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleSignOut = () => {
    // Logic for sign-out (e.g., clearing tokens or user data)
    localStorage.removeItem("jwtToken");  // Clear the token
    navigate("/login"); // Navigate to the login page after signing out
  };

  return (
    <div className="navbar">
      <div className="logo">Punith's Bookstore</div>
      <div className="navbar-links">
        <a href="/dashboard">Dashboard</a>
        <a href="/bookshelf">Bookshelf</a>
      </div>
      <div className="user-info">
        <img
          src="https://via.placeholder.com/30"
          alt="User"
          className="user-avatar"
        />
        <div className="dropdown">
          <button>Welcome, Punith</button>
          <div className="dropdown-content">
            <a href="/" onClick={handleSignOut}>Sign Out</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
