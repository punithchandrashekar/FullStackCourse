import axios from "axios";

const API_BASE_URL = "https://bookshelf-backend-production-8199.up.railway.app";

// Helper function to include authorization token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

// API functions

/**
 * Fetch currently reading books for the user.
 */
export const getCurrentlyReadingBooks = async () => {
  const response = await axios.get(`${API_BASE_URL}/dashboard/currently-reading`, getAuthHeaders());
  return response.data;
};

/**
 * Mark a book as finished.
 * @param {string} bookId
 */
export const markBookAsFinished = async (bookId) => {
  const response = await axios.post(
    `${API_BASE_URL}/dashboard/mark-finished/${bookId}`,
    {},
    getAuthHeaders()
  );
  return response.data;
};

/**
 * Fetch updates from user's friends.
 */
export const getFriendUpdates = async () => {
  const response = await axios.get(`${API_BASE_URL}/dashboard/friend-updates`, getAuthHeaders());
  return response.data;
};

/**
 * Fetch book details by ID.
 * @param {string} bookId
 */
export const getBookDetails = async (bookId) => {
  const response = await axios.get(`${API_BASE_URL}/books/${bookId}`, getAuthHeaders());
  return response.data;
};

/**
 * Submit a review and rating for a book.
 * @param {string} bookId
 * @param {object} reviewData
 */
export const submitBookReview = async (bookId, reviewData) => {
  const response = await axios.post(
    `${API_BASE_URL}/books/review/${bookId}`,
    reviewData,
    getAuthHeaders()
  );
  return response.data;
};

/**
 * User login function.
 * @param {object} credentials - { email, password }
 */
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
  return response.data;
};

/**
 * User registration function.
 * @param {object} userDetails - { name, email, password }
 */
export const registerUser = async (userDetails) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, userDetails);
  return response.data;
};
