import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { deckAPI, flashcardAPI } from '../services/api';
import FlashcardViewer from './FlashcardViewer';
import LoadingSpinner from './LoadingSpinner';

const StudyMode = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studyStats, setStudyStats] = useState({
    total: 0,
    studied: 0,
    remaining: 0
  });

  // Fetch deck and flashcards on component mount
  useEffect(() => {
    fetchDeckData();
  }, [deckId]);

  // Update study stats when flashcards change
  useEffect(() => {
    if (flashcards.length > 0) {
      setStudyStats({
        total: flashcards.length,
        studied: currentCardIndex,
        remaining: flashcards.length - currentCardIndex
      });
    }
  }, [flashcards, currentCardIndex]);

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

  const handleNextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handlePreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const handleRestart = () => {
    setCurrentCardIndex(0);
  };

  const handleShuffle = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffled);
    setCurrentCardIndex(0);
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
        <h3 className="text-xl font-medium text-gray-900 mb-2">Error loading study session</h3>
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

  if (flashcards.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <span className="text-4xl">📝</span>
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">No flashcards to study</h3>
        <p className="text-gray-600 mb-6">Add some flashcards to this deck first!</p>
        <Link
          to={`/deck/${deckId}`}
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Add Cards
        </Link>
      </div>
    );
  }

  const currentCard = flashcards[currentCardIndex];
  const isFirstCard = currentCardIndex === 0;
  const isLastCard = currentCardIndex === flashcards.length - 1;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <Link
            to={`/deck/${deckId}`}
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            ← Back to Deck
          </Link>
          <div className="flex space-x-4">
            <button
              onClick={handleShuffle}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              🔀 Shuffle
            </button>
            <button
              onClick={handleRestart}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              🔄 Restart
            </button>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Study Mode: {deck.name}
        </h1>
        
        {deck.description && (
          <p className="text-lg text-gray-600 mb-6">
            {deck.description}
          </p>
        )}
      </div>

      {/* Progress Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Study Progress</h3>
          <span className="text-sm text-gray-500">
            Card {currentCardIndex + 1} of {flashcards.length}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div
            className="bg-primary-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${((currentCardIndex + 1) / flashcards.length) * 100}%` }}
          ></div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary-600">{studyStats.total}</div>
            <div className="text-sm text-gray-500">Total Cards</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{studyStats.studied}</div>
            <div className="text-sm text-gray-500">Studied</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">{studyStats.remaining}</div>
            <div className="text-sm text-gray-500">Remaining</div>
          </div>
        </div>
      </div>

      {/* Flashcard Viewer */}
      <div className="mb-8">
        <FlashcardViewer
          flashcard={currentCard}
          cardNumber={currentCardIndex + 1}
          totalCards={flashcards.length}
        />
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePreviousCard}
          disabled={isFirstCard}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            isFirstCard
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gray-600 hover:bg-gray-700 text-white'
          }`}
        >
          ← Previous
        </button>
        
        <div className="text-center">
          <div className="text-sm text-gray-500 mb-1">Navigation</div>
          <div className="flex space-x-2">
            {flashcards.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCardIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentCardIndex
                    ? 'bg-primary-600'
                    : index < currentCardIndex
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                }`}
                title={`Card ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <button
          onClick={handleNextCard}
          disabled={isLastCard}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            isLastCard
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-primary-600 hover:bg-primary-700 text-white'
          }`}
        >
          Next →
        </button>
      </div>

      {/* Completion Message */}
      {isLastCard && (
        <div className="mt-8 text-center">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-3xl">🎉</span>
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              Great job! You've studied all the cards!
            </h3>
            <p className="text-green-600 mb-4">
              You've completed all {flashcards.length} cards in this deck.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleRestart}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Study Again
              </button>
              <Link
                to={`/deck/${deckId}`}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Back to Deck
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyMode;
