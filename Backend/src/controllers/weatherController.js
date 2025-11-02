// Backend/src/controllers/weatherController.js
import axios from 'axios';
import config from '../config.js'; 

const API_KEY = config.weatherApiKey;
const BASE_URL = 'https://api.weatherapi.com/v1';

// ✅ Get current weather by city
export const getCurrentWeather = async (req, res) => {
  const city = encodeURIComponent(req.params.city);
  try {
    const response = await axios.get(`${BASE_URL}/current.json?key=${API_KEY}&q=${city}&aqi=yes`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching current weather:', error.response?.data || error.message);
    const status = error.response ? error.response.status : 500;
    const message = error.response ? error.response.data.error?.message : 'Error fetching current weather data';
    res.status(status).json({ message });
  }
};

// ✅ Get 3-day forecast by city
export const getForecast = async (req, res) => {
  const city = encodeURIComponent(req.params.city);
  try {
    const response = await axios.get(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=yes&alerts=yes`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching forecast:', error.response?.data || error.message);
    const status = error.response ? error.response.status : 500;
    const message = error.response ? error.response.data.error?.message : 'Error fetching forecast data';
    res.status(status).json({ message });
  }
};
