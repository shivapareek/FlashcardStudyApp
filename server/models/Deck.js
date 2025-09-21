const mongoose = require('mongoose');

const deckSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Deck name is required'],
    trim: true,
    maxlength: [100, 'Deck name cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Virtual field to get the count of flashcards in this deck
deckSchema.virtual('cardCount', {
  ref: 'Flashcard',
  localField: '_id',
  foreignField: 'deckId',
  count: true
});

// Ensure virtual fields are serialized
deckSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Deck', deckSchema);
