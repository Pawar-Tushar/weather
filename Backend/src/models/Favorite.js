// models/Favorite.js
import mongoose from 'mongoose';

const FavoriteSchema = new mongoose.Schema({
  userId: {
    type: String, // Or mongoose.Schema.Types.ObjectId if you have a User model
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

const Favorite = mongoose.model('Favorite', FavoriteSchema);

export default Favorite;