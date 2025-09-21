import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { deckAPI, flashcardAPI } from '../services/api';
import FlashcardForm from './FlashcardForm';
import FlashcardList from './FlashcardList';
import LoadingSpinner from './LoadingSpinner';

const DeckPage = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFlashcardForm, setShowFlashcardForm] = useState(false);
  const [editingFlashcard, setEditingFlashcard] = useState(null);

  // Fetch deck and flashcards on component mount
  useEffect(() => {
    fetchDeckData();
  }, [deckId]);

  const fetchDeckData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch deck and flashcards in parallel
      const [deckResponse, flashcardsResponse] = await Promise.all([
        deckAPI.getDeck(deckId),
        flashcardAPI.getFlashcardsByDeck(deckId)
      ]);
      
      setDeck(deckResponse.data.data);
      setFlashcards(flashcardsResponse.data.data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching deck data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFlashcard = async (flashcardData) => {
    try {
      console.log('Creating flashcard with data:', flashcardData);
      console.log('Deck ID:', deckId);
      
      if (!deckId) {
        throw new Error('Deck ID is missing');
      }
      
      const response = await flashcardAPI.createFlashcard({
        ...flashcardData,
        deckId
      });
      console.log('Flashcard created successfully:', response.data);
      setFlashcards([response.data.data, ...flashcards]);
      setShowFlashcardForm(false);
    } catch (err) {
      console.error('Error creating flashcard:', err);
      setError(err.message);
    }
  };

  const handleUpdateFlashcard = async (flashcardId, flashcardData) => {
    try {
      const response = await flashcardAPI.updateFlashcard(flashcardId, flashcardData);
      setFlashcards(flashcards.map(flashcard => 
        flashcard._id === flashcardId ? response.data.data : flashcard
      ));
      setEditingFlashcard(null);
    } catch (err) {
      setError(err.message);
      console.error('Error updating flashcard:', err);
    }
  };

  const handleDeleteFlashcard = async (flashcardId) => {
    if (window.confirm('Are you sure you want to delete this flashcard?')) {
      try {
        await flashcardAPI.deleteFlashcard(flashcardId);
        setFlashcards(flashcards.filter(flashcard => flashcard._id !== flashcardId));
      } catch (err) {
        setError(err.message);
        console.error('Error deleting flashcard:', err);
      }
    }
  };

  const openEditForm = (flashcard) => {
    setEditingFlashcard(flashcard);
    setShowFlashcardForm(true);
  };

  const closeForm = () => {
    setShowFlashcardForm(false);
    setEditingFlashcard(null);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
          <span className="text-4xl">⚠️</span>
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">Error loading deck</h3>
        <p className="text-gray-600 mb-6">{error}</p>
        <Link
          to="/"
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  if (!deck) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-900 mb-2">Deck not found</h3>
        <Link
          to="/"
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <Link
            to="/"
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            ← Back to Dashboard
          </Link>
          <Link
            to={`/study/${deckId}`}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
          >
            🎯 Study Mode
          </Link>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {deck.name}
        </h1>
        
        {deck.description && (
          <p className="text-lg text-gray-600 mb-6">
            {deck.description}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {flashcards.length} {flashcards.length === 1 ? 'card' : 'cards'} in this deck
          </div>
          <button
            onClick={() => setShowFlashcardForm(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
          >
            + Add New Card
          </button>
        </div>
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

      {/* Flashcard Form Modal */}
      {showFlashcardForm && (
        <FlashcardForm
          flashcard={editingFlashcard}
          onSubmit={editingFlashcard ? handleUpdateFlashcard : handleCreateFlashcard}
          onCancel={closeForm}
        />
      )}

      {/* Flashcards List */}
      {flashcards.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-4xl">📝</span>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No flashcards yet</h3>
          <p className="text-gray-600 mb-6">Add your first flashcard to start studying!</p>
          <button
            onClick={() => setShowFlashcardForm(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Add Your First Card
          </button>
        </div>
      ) : (
        <FlashcardList
          flashcards={flashcards}
          onEdit={openEditForm}
          onDelete={handleDeleteFlashcard}
        />
      )}
    </div>
  );
};

export default DeckPage;
