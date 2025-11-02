
// Backend/src/routes/favoriteRoutes.js
import express from 'express';
import { getFavorites, addFavorite, removeFavorite } from '../controllers/favoriteController.js';

const router = express.Router();

router.route('/').post(addFavorite);
router.route('/:userId').get(getFavorites);
router.route('/:id').delete(removeFavorite);

export default router;