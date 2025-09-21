const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Deck = require('../models/Deck');
const Flashcard = require('../models/Flashcard');

// GET /api/decks - Get all decks with card count
router.get('/', async (req, res) => {
  try {
    const decks = await Deck.find()
      .populate('cardCount')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: decks
    });
  } catch (error) {
    console.error('Error fetching decks:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching decks'
    });
  }
});

// GET /api/decks/:id - Get a specific deck
router.get('/:id', async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id);
    
    if (!deck) {
      return res.status(404).json({
        success: false,
        message: 'Deck not found'
      });
    }
    
    res.json({
      success: true,
      data: deck
    });
  } catch (error) {
    console.error('Error fetching deck:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching deck'
    });
  }
});

// POST /api/decks - Create a new deck
router.post('/', [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Deck name is required')
    .isLength({ max: 100 })
    .withMessage('Deck name cannot exceed 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters')
], async (req, res) => {
  try {
    console.log('Creating deck with body:', req.body);
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, description } = req.body;
    
    const deck = new Deck({
      name,
      description: description || ''
    });
    
    await deck.save();
    
    res.status(201).json({
      success: true,
      data: deck,
      message: 'Deck created successfully'
    });
  } catch (error) {
    console.error('Error creating deck:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating deck'
    });
  }
});

// PUT /api/decks/:id - Update a deck
router.put('/:id', [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Deck name is required')
    .isLength({ max: 100 })
    .withMessage('Deck name cannot exceed 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters')
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

    const { name, description } = req.body;
    
    const deck = await Deck.findByIdAndUpdate(
      req.params.id,
      { name, description: description || '' },
      { new: true, runValidators: true }
    );
    
    if (!deck) {
      return res.status(404).json({
        success: false,
        message: 'Deck not found'
      });
    }
    
    res.json({
      success: true,
      data: deck,
      message: 'Deck updated successfully'
    });
  } catch (error) {
    console.error('Error updating deck:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating deck'
    });
  }
});

// DELETE /api/decks/:id - Delete a deck and all its flashcards
router.delete('/:id', async (req, res) => {
  try {
    // First, delete all flashcards in this deck
    await Flashcard.deleteMany({ deckId: req.params.id });
    
    // Then delete the deck
    const deck = await Deck.findByIdAndDelete(req.params.id);
    
    if (!deck) {
      return res.status(404).json({
        success: false,
        message: 'Deck not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Deck and all its flashcards deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting deck:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting deck'
    });
  }
});

module.exports = router;
