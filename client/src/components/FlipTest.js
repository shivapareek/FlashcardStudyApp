import React, { useState } from 'react';

const FlipTest = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    console.log('Flipping card from', isFlipped, 'to', !isFlipped);
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Flip Test</h2>
      
      <div className="mb-4 text-center">
        <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
          State: {isFlipped ? 'Flipped' : 'Not Flipped'}
        </span>
      </div>

      {/* Flashcard */}
      <div className={`flip-card h-96 ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
        <div className="flip-card-inner">
          {/* Front of card (Question) */}
          <div className="flip-card-front bg-white border-2 border-blue-200 rounded-xl p-8 flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-blue-600 text-sm font-medium mb-4 uppercase tracking-wide">
                Question
              </div>
              <div className="text-2xl text-gray-900 leading-relaxed">
                What is the capital of France?
              </div>
              <div className="mt-6 text-sm text-gray-500">
                Click to reveal answer
              </div>
            </div>
          </div>

          {/* Back of card (Answer) */}
          <div className="flip-card-back bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-8 flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-blue-600 text-sm font-medium mb-4 uppercase tracking-wide">
                Answer
              </div>
              <div className="text-2xl text-gray-900 leading-relaxed">
                Paris
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
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
        >
          {isFlipped ? 'Show Question' : 'Show Answer'}
        </button>
      </div>

      {/* Debug Info */}
      <div className="mt-8 bg-gray-100 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Debug Info:</h3>
        <p>isFlipped: {isFlipped.toString()}</p>
        <p>CSS Classes: flip-card {isFlipped ? 'flipped' : ''}</p>
        <p>Expected: {isFlipped ? 'Card should show answer' : 'Card should show question'}</p>
      </div>
    </div>
  );
};

export default FlipTest;
