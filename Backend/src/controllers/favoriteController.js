// Backend/src/controllers/favoriteController.js
import Favorite from '../models/Favorite.js';

// @desc    Get all favorites for a user
// @route   GET /api/favorites/:userId
export const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.params.userId });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add a city to favorites
// @route   POST /api/favorites
export const addFavorite = async (req, res) => {
  const { userId, city } = req.body;
  try {
    const existingFavorite = await Favorite.findOne({ userId, city });
    if (existingFavorite) {
      return res.status(400).json({ message: 'City is already in favorites' });
    }
    const newFavorite = new Favorite({ userId, city });
    await newFavorite.save();
    res.status(201).json(newFavorite);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Remove a city from favorites
// @route   DELETE /api/favorites/:id
export const removeFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.findById(req.params.id);
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    // In a real app, you would also check if req.user.id === favorite.userId
    await favorite.remove();
    res.json({ message: 'Favorite removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

