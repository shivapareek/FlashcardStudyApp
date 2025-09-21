import React, { useState, useEffect } from 'react';

const FlashcardForm = ({ flashcard, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    question: '',
    answer: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form data when flashcard prop changes
  useEffect(() => {
    if (flashcard) {
      setFormData({
        question: flashcard.question || '',
        answer: flashcard.answer || ''
      });
    }
  }, [flashcard]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.question.trim()) {
      newErrors.question = 'Question is required';
    } else if (formData.question.length > 1000) {
      newErrors.question = 'Question cannot exceed 1000 characters';
    }

    if (!formData.answer.trim()) {
      newErrors.answer = 'Answer is required';
    } else if (formData.answer.length > 1000) {
      newErrors.answer = 'Answer cannot exceed 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      if (flashcard) {
        // Editing existing flashcard
        await onSubmit(flashcard._id, formData);
      } else {
        // Creating new flashcard
        await onSubmit(formData);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {flashcard ? 'Edit Flashcard' : 'Create New Flashcard'}
            </h2>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Question */}
            <div>
              <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
                Question *
              </label>
              <textarea
                id="question"
                name="question"
                value={formData.question}
                onChange={handleChange}
                rows={4}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none ${
                  errors.question ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your question here..."
                maxLength={1000}
              />
              {errors.question && (
                <p className="mt-1 text-sm text-red-600">{errors.question}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                {formData.question.length}/1000 characters
              </p>
            </div>

            {/* Answer */}
            <div>
              <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
                Answer *
              </label>
              <textarea
                id="answer"
                name="answer"
                value={formData.answer}
                onChange={handleChange}
                rows={4}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none ${
                  errors.answer ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter the answer here..."
                maxLength={1000}
              />
              {errors.answer && (
                <p className="mt-1 text-sm text-red-600">{errors.answer}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                {formData.answer.length}/1000 characters
              </p>
            </div>

            {/* Study Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-blue-900 mb-2">💡 Tips for effective flashcards:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Keep questions and answers concise</li>
                <li>• Use specific, clear language</li>
                <li>• Focus on one concept per card</li>
                <li>• Include examples when helpful</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {flashcard ? 'Updating...' : 'Creating...'}
                  </div>
                ) : (
                  flashcard ? 'Update Card' : 'Create Card'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FlashcardForm;
