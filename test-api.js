// Simple test script to verify the API is working
const axios = require('axios');

const testAPI = async () => {
  try {
    console.log('Testing API connection...');
    
    // Test health endpoint
    const healthResponse = await axios.get('http://localhost:5000/api/health');
    console.log('✅ Health check passed:', healthResponse.data);
    
    // Test creating a deck
    const deckData = {
      name: 'Test Deck',
      description: 'This is a test deck'
    };
    
    console.log('Creating test deck with data:', deckData);
    const createResponse = await axios.post('http://localhost:5000/api/decks', deckData);
    console.log('✅ Deck created successfully:', createResponse.data);
    
    // Test getting all decks
    const decksResponse = await axios.get('http://localhost:5000/api/decks');
    console.log('✅ Decks retrieved successfully:', decksResponse.data);
    
    // Test creating a flashcard
    const flashcardData = {
      question: 'What is the capital of France?',
      answer: 'Paris',
      deckId: createResponse.data.data._id
    };
    
    console.log('Creating test flashcard with data:', flashcardData);
    const flashcardResponse = await axios.post('http://localhost:5000/api/flashcards', flashcardData);
    console.log('✅ Flashcard created successfully:', flashcardResponse.data);
    
    // Test getting flashcards for the deck
    const flashcardsResponse = await axios.get(`http://localhost:5000/api/flashcards/deck/${createResponse.data.data._id}`);
    console.log('✅ Flashcards retrieved successfully:', flashcardsResponse.data);
    
  } catch (error) {
    console.error('❌ API test failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else if (error.request) {
      console.error('No response received. Is the server running?');
    } else {
      console.error('Error:', error.message);
    }
  }
};

testAPI();
