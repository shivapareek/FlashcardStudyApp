import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deckAPI } from '../services/api';
import DeckForm from './DeckForm';
import LoadingSpinner from './LoadingSpinner';

const Dashboard = () => {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeckForm, setShowDeckForm] = useState(false);
  const [editingDeck, setEditingDeck] = useState(null);

  // Fetch all decks on component mount
  useEffect(() => {
    fetchDecks();
  }, []);

  const fetchDecks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await deckAPI.getAllDecks();
      setDecks(response.data.data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching decks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDeck = async (deckData) => {
    try {
      console.log('Creating deck with data:', deckData);
      const response = await deckAPI.createDeck(deckData);
      console.log('Deck created successfully:', response.data);
      setDecks([response.data.data, ...decks]);
      setShowDeckForm(false);
    } catch (err) {
      console.error('Error creating deck:', err);
      setError(err.message);
    }
  };

  const handleUpdateDeck = async (deckId, deckData) => {
    try {
      const response = await deckAPI.updateDeck(deckId, deckData);
      setDecks(decks.map(deck => 
        deck._id === deckId ? response.data.data : deck
      ));
      setEditingDeck(null);
    } catch (err) {
      setError(err.message);
      console.error('Error updating deck:', err);
    }
  };

  const handleDeleteDeck = async (deckId) => {
    if (window.confirm('Are you sure you want to delete this deck? This will also delete all flashcards in this deck.')) {
      try {
        await deckAPI.deleteDeck(deckId);
        setDecks(decks.filter(deck => deck._id !== deckId));
      } catch (err) {
        setError(err.message);
        console.error('Error deleting deck:', err);
      }
    }
  };

  const openEditForm = (deck) => {
    setEditingDeck(deck);
    setShowDeckForm(true);
  };

  const closeForm = () => {
    setShowDeckForm(false);
    setEditingDeck(null);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Your Flashcard Decks
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Organize your study materials and master any subject with digital flashcards.
        </p>
        
        <button
          onClick={() => setShowDeckForm(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
        >
          + Create New Deck
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
          <button
            onClick={() => setError(null)}
            className="mt-2 text-red-600 hover:text-red-800 underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Deck Form Modal */}
      {showDeckForm && (
        <DeckForm
          deck={editingDeck}
          onSubmit={editingDeck ? handleUpdateDeck : handleCreateDeck}
          onCancel={closeForm}
        />
      )}

      {/* Decks Grid */}
      {decks.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-4xl">📚</span>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No decks yet</h3>
          <p className="text-gray-600 mb-6">Create your first deck to get started with studying!</p>
          <button
            onClick={() => setShowDeckForm(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Create Your First Deck
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {decks.map((deck) => (
            <div
              key={deck._id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                    {deck.name}
                  </h3>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => openEditForm(deck)}
                      className="text-gray-400 hover:text-primary-600 transition-colors"
                      title="Edit deck"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDeleteDeck(deck._id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete deck"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                
                {deck.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {deck.description}
                  </p>
                )}
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{deck.cardCount || 0} cards</span>
                  <span>
                    Created {new Date(deck.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex space-x-3">
                  <Link
                    to={`/deck/${deck._id}`}
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white text-center py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    View Cards
                  </Link>
                  <Link
                    to={`/study/${deck._id}`}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white text-center py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    Study
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
