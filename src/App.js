import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Bookshelf from './pages/Bookshelf';
import Login from './components/Login';
import Signup from './components/Signup'; // Import the Signup component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bookshelf" element={<Bookshelf />} />
      </Routes>
    </Router>
  );
};

export default App;
