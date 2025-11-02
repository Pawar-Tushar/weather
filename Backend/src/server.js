// Backend/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import weatherRoutes from './routes/weatherRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js'; // Import favorite routes
import connectDB from './db/connection.js';

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Weather Analytics Dashboard API is running!');
});

// API Routes
app.use('/api/weather', weatherRoutes);
app.use('/api/favorites', favoriteRoutes); // Use favorite routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});