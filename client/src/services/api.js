import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Response Error:', error);
    
    if (error.response) {
      // Server responded with error status
      console.error('API Error Response:', error.response.data);
      const message = error.response.data?.message || 'An error occurred';
      const errors = error.response.data?.errors;
      if (errors && errors.length > 0) {
        return Promise.reject(new Error(`${message}: ${errors.map(e => e.msg).join(', ')}`));
      }
      return Promise.reject(new Error(message));
    } else if (error.request) {
      // Request was made but no response received
      console.error('API Request Error:', error.request);
      return Promise.reject(new Error('Network error - please check your connection and ensure the server is running'));
    } else {
      // Something else happened
      console.error('API Error:', error.message);
      return Promise.reject(new Error('An unexpected error occurred'));
    }
  }
);

// Deck API functions
export const deckAPI = {
  // Get all decks
  getAllDecks: () => api.get('/decks'),
  
  // Get a specific deck
  getDeck: (id) => api.get(`/decks/${id}`),
  
  // Create a new deck
  createDeck: (deckData) => api.post('/decks', deckData),
  
  // Update a deck
  updateDeck: (id, deckData) => api.put(`/decks/${id}`, deckData),
  
  // Delete a deck
  deleteDeck: (id) => api.delete(`/decks/${id}`),
};

// Flashcard API functions
export const flashcardAPI = {
  // Get all flashcards for a deck
  getFlashcardsByDeck: (deckId) => api.get(`/flashcards/deck/${deckId}`),
  
  // Get a specific flashcard
  getFlashcard: (id) => api.get(`/flashcards/${id}`),
  
  // Create a new flashcard
  createFlashcard: (flashcardData) => api.post('/flashcards', flashcardData),
  
  // Update a flashcard
  updateFlashcard: (id, flashcardData) => api.put(`/flashcards/${id}`, flashcardData),
  
  // Delete a flashcard
  deleteFlashcard: (id) => api.delete(`/flashcards/${id}`),
};

// Health check
export const healthCheck = () => api.get('/health');

export default api;
