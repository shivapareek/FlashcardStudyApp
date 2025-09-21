const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Flashcard = require('../models/Flashcard');
const Deck = require('../models/Deck');

// GET /api/flashcards/deck/:deckId - Get all flashcards for a specific deck
router.get('/deck/:deckId', async (req, res) => {
  try {
    // Verify that the deck exists
    const deck = await Deck.findById(req.params.deckId);
    if (!deck) {
      return res.status(404).json({
        success: false,
        message: 'Deck not found'
      });
    }

    const flashcards = await Flashcard.find({ deckId: req.params.deckId })
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: flashcards
    });
  } catch (error) {
    console.error('Error fetching flashcards:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching flashcards'
    });
  }
});

// GET /api/flashcards/:id - Get a specific flashcard
router.get('/:id', async (req, res) => {
  try {
    const flashcard = await Flashcard.findById(req.params.id);
    
    if (!flashcard) {
      return res.status(404).json({
        success: false,
        message: 'Flashcard not found'
      });
    }
    
    res.json({
      success: true,
      data: flashcard
    });
  } catch (error) {
    console.error('Error fetching flashcard:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching flashcard'
    });
  }
});

// POST /api/flashcards - Create a new flashcard
router.post('/', [
  body('question')
    .trim()
    .notEmpty()
    .withMessage('Question is required')
    .isLength({ max: 1000 })
    .withMessage('Question cannot exceed 1000 characters'),
  body('answer')
    .trim()
    .notEmpty()
    .withMessage('Answer is required')
    .isLength({ max: 1000 })
    .withMessage('Answer cannot exceed 1000 characters'),
  body('deckId')
    .notEmpty()
    .withMessage('Deck ID is required')
    .isMongoId()
    .withMessage('Invalid deck ID')
], async (req, res) => {
  try {
    console.log('Creating flashcard with body:', req.body);
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Flashcard validation errors:', errors.array());
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { question, answer, deckId } = req.body;
    
    // Verify that the deck exists
    const deck = await Deck.findById(deckId);
    if (!deck) {
      return res.status(404).json({
        success: false,
        message: 'Deck not found'
      });
    }
    
    const flashcard = new Flashcard({
      question,
      answer,
      deckId
    });
    
    await flashcard.save();
    
    res.status(201).json({
      success: true,
      data: flashcard,
      message: 'Flashcard created successfully'
    });
  } catch (error) {
    console.error('Error creating flashcard:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating flashcard'
    });
  }
});

// PUT /api/flashcards/:id - Update a flashcard
router.put('/:id', [
  body('question')
    .trim()
    .notEmpty()
    .withMessage('Question is required')
    .isLength({ max: 1000 })
    .withMessage('Question cannot exceed 1000 characters'),
  body('answer')
    .trim()
    .notEmpty()
    .withMessage('Answer is required')
    .isLength({ max: 1000 })
    .withMessage('Answer cannot exceed 1000 characters')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { question, answer } = req.body;
    
    const flashcard = await Flashcard.findByIdAndUpdate(
      req.params.id,
      { question, answer },
      { new: true, runValidators: true }
    );
    
    if (!flashcard) {
      return res.status(404).json({
        success: false,
        message: 'Flashcard not found'
      });
    }
    
    res.json({
      success: true,
      data: flashcard,
      message: 'Flashcard updated successfully'
    });
  } catch (error) {
    console.error('Error updating flashcard:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating flashcard'
    });
  }
});

// DELETE /api/flashcards/:id - Delete a flashcard
router.delete('/:id', async (req, res) => {
  try {
    const flashcard = await Flashcard.findByIdAndDelete(req.params.id);
    
    if (!flashcard) {
      return res.status(404).json({
        success: false,
        message: 'Flashcard not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Flashcard deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting flashcard:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting flashcard'
    });
  }
});

module.exports = router;
