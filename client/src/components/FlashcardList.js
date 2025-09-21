import React from 'react';

const FlashcardList = ({ flashcards, onEdit, onDelete }) => {
  return (
    <div className="space-y-4">
      {flashcards.map((flashcard, index) => (
        <div
          key={flashcard._id}
          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200 overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded-full mr-3">
                    Card {index + 1}
                  </span>
                  <span className="text-sm text-gray-500">
                    Created {new Date(flashcard.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Question */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                      Question
                    </h4>
                    <p className="text-gray-900 leading-relaxed">
                      {flashcard.question}
                    </p>
                  </div>
                  
                  {/* Answer */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                      Answer
                    </h4>
                    <p className="text-gray-900 leading-relaxed">
                      {flashcard.answer}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => onEdit(flashcard)}
                  className="text-gray-400 hover:text-primary-600 transition-colors p-2 rounded-lg hover:bg-primary-50"
                  title="Edit flashcard"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => onDelete(flashcard._id)}
                  className="text-gray-400 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50"
                  title="Delete flashcard"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlashcardList;
