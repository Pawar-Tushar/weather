// src/config.js
import dotenv from 'dotenv';

dotenv.config();

const config = {
  weatherApiKey: process.env.WEATHER_API_KEY,
  mongoUri: process.env.MONGO_URI,
  port: process.env.PORT || 5000,
};

export default config;