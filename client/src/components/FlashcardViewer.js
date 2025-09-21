import React, { useState, useEffect } from 'react';

const FlashcardViewer = ({ flashcard, cardNumber, totalCards }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Reset flip state when flashcard changes
  useEffect(() => {
    setIsFlipped(false);
  }, [flashcard]);

  const handleFlip = () => {
    console.log('Flipping card from', isFlipped, 'to', !isFlipped);
    setIsFlipped(!isFlipped);
  };

  if (!flashcard) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500">No flashcard data available</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Card Counter */}
      <div className="text-center mb-6">
        <span className="bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium">
          Card {cardNumber} of {totalCards}
        </span>
        <div className="mt-2 text-sm text-gray-600">
          {isFlipped ? 'Showing Answer' : 'Showing Question'}
        </div>
      </div>

      {/* Flashcard */}
      <div className={`flip-card h-96 ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
        <div className="flip-card-inner">
          {/* Front of card (Question) */}
          <div className="flip-card-front bg-white border-2 border-primary-200 rounded-xl p-8 flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-primary-600 text-sm font-medium mb-4 uppercase tracking-wide">
                Question
              </div>
              <div className="text-2xl text-gray-900 leading-relaxed">
                {flashcard.question}
              </div>
              <div className="mt-6 text-sm text-gray-500">
                Click to reveal answer
              </div>
            </div>
          </div>

          {/* Back of card (Answer) */}
          <div className="flip-card-back bg-gradient-to-br from-primary-50 to-primary-100 border-2 border-primary-300 rounded-xl p-8 flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-primary-600 text-sm font-medium mb-4 uppercase tracking-wide">
                Answer
              </div>
              <div className="text-2xl text-gray-900 leading-relaxed">
                {flashcard.answer}
              </div>
              <div className="mt-6 text-sm text-gray-500">
                Click to see question again
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flip Button */}
      <div className="text-center mt-6">
        <button
          onClick={handleFlip}
          className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
        >
          {isFlipped ? 'Show Question' : 'Show Answer'}
        </button>
      </div>

      {/* Study Tips */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-blue-900 mb-3">💡 Study Tips</h4>
        <ul className="text-blue-800 space-y-2 text-sm">
          <li>• Try to recall the answer before flipping the card</li>
          <li>• If you get it wrong, mark it for review later</li>
          <li>• Take breaks between study sessions</li>
          <li>• Review difficult cards more frequently</li>
        </ul>
      </div>
    </div>
  );
};

export default FlashcardViewer;
