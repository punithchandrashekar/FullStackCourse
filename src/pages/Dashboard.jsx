import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch default books on load
    fetchBooks();
  }, []);

  const fetchBooks = (query = "") => {
    setLoading(true); // Show loading while fetching
    const apiUrl = process.env.REACT_APP_API_URL; // Get API URL from environment variable

    axios
      .get(`${apiUrl}/api/books?q=${query}`)
      .then((response) => {
        setBooks(response.data);
        setLoading(false); // Hide loading after fetching
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setBooks([]);
        setLoading(false); // Hide loading on error
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks(searchQuery); // Fetch books based on search query
  };

  const handleAddToBookshelf = (book) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      alert("You must be logged in to add a book to your bookshelf.");
      return;
    }

    const apiUrl = process.env.REACT_APP_API_URL; // Get API URL from environment variable

    // Send POST request to add the book to the bookshelf
    axios
      .post(
        `${apiUrl}/api/my-bookshelf`,
        {
          id: book.id,
          title: book.title,
          author: book.authors.join(", "),
          description: book.description || "No description available",
          coverImage: book.image || "https://via.placeholder.com/150",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        alert("Book added to bookshelf!");
      })
      .catch((error) => {
        console.error("Error adding book to bookshelf:", error);
        alert("Failed to add book to bookshelf.");
      });
  };

  return (
    <div className="dashboard">
      <Navbar /> {/* Reusing Navbar component */}

      <main className="dashboard-main">
        <div className="search-bar">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>

        <h2>Explore Books</h2>
        {loading ? (
          <p>Loading books...</p>
        ) : books.length > 0 ? (
          <div className="book-grid">
            {books.map((book) => (
              <div key={book.id} className="book-card">
                <img
                  src={book.image || "https://via.placeholder.com/150"}
                  alt={book.title}
                  className="book-cover"
                />
                <div className="book-info">
                  <h3>{book.title}</h3>
                  <p className="book-author">by {book.authors.join(", ")}</p>
                  <p className="book-description">
                    {book.description.slice(0, 100)}...
                  </p>
                  <a
                    href={book.infoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="book-link"
                  >
                    View More
                  </a>
                  <button
                    onClick={() => handleAddToBookshelf(book)}
                    className="add-to-bookshelf-btn"
                  >
                    Add to Bookshelf
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No books found. Try a different search query.</p>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
