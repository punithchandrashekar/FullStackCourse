// src/pages/Bookshelf.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/Bookshelf.css";

const Bookshelf = () => {
  const [bookshelf, setBookshelf] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getToken = () => localStorage.getItem("jwtToken");
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleError = (error, defaultMessage) => {
    if (error.response?.status === 401) {
      setError("Your session has expired. Please log in again.");
      localStorage.removeItem("jwtToken");
    } else {
      setError(error.response?.data?.error || defaultMessage);
    }
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setError("You are not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    

    axios
      .get(`${apiUrl}/api/my-bookshelf`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setBookshelf(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching bookshelf:", error);
        handleError(error, "Failed to load bookshelf. Please try again.");
        setLoading(false);
      });
  }, []);

  const removeFromBookshelf = (bookId) => {
    const token = getToken();
    if (!token) {
      setError("You are not authenticated. Please log in.");
      return;
    }

    axios
      .delete(`${apiUrl}/api/my-bookshelf/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setBookshelf((prevBookshelf) =>
          prevBookshelf.filter((book) => book.id !== bookId)
        );
      })
      .catch((error) => {
        console.error("Error removing book:", error);
        handleError(error, "Failed to remove the book. Please try again.");
      });
  };

  return (
    <div className="bookshelf-container">
      <Navbar /> {/* Reusing Navbar component */}

      {loading ? (
        <p>Loading your bookshelf...</p>
      ) : error ? (
        <div>
          <p className="error-message">{error}</p>
          {error.includes("log in") && (
            <button onClick={() => (window.location.href = "/login")}>
              Login
            </button>
          )}
        </div>
      ) : bookshelf.length === 0 ? (
        <p>Your bookshelf is empty. Start adding some books!</p>
      ) : (
        <ul className="bookshelf-grid">
          {bookshelf.map((book) => (
            <li key={book.id} className="book-card">
              <img
                src={book.coverImage || "https://via.placeholder.com/150"}
                alt={book.title}
                className="book-cover"
              />
              <div className="book-details">
                <h4>{book.title}</h4>
                <p>by {book.author}</p>
                <p className="book-description">
                  {book.description
                    ? book.description.slice(0, 100) + "..."
                    : "No description available."}
                </p>
                <button
                  onClick={() => removeFromBookshelf(book.id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Footer />
    </div>
  );
};

export default Bookshelf;
