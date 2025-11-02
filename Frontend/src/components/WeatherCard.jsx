// src/components/Dashboard.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherByCity } from '../store/weatherSlice';
import WeatherCard from './WeatherCard';
import Search from './Search';
import DetailedViewModal from './DetailedViewModal';
import SettingsToggle from './SettingsToggle';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data: weatherData } = useSelector((state) => state.weather);
  const { cities } = useSelector((state) => state.favorites);
  const [selectedCity, setSelectedCity] = useState(null);
  const weatherDataKeys = useMemo(() => Object.keys(weatherData).sort().join(','), [weatherData]);

  // Effect to fetch weather for NEW favorite cities
  useEffect(() => {
    cities.forEach((city) => {
      const alreadyExists = Object.keys(weatherData).some(
        (key) => key.toLowerCase() === city.toLowerCase()
      );
      if (!alreadyExists) {
        dispatch(fetchWeatherByCity(city));
      }
    });
  }, [cities, dispatch, weatherDataKeys]);


  // --- PART 4: REAL-TIME DATA REFRESH ---
  // This new effect sets up the 60-second refresh interval.
  useEffect(() => {
    // Define the interval duration in milliseconds (60 seconds)
    const REFRESH_INTERVAL = 60000;

    const intervalId = setInterval(() => {
      console.log('Refreshing weather data...'); // For debugging
      // Re-fetch data for all currently favorited cities
      cities.forEach((city) => {
        dispatch(fetchWeatherByCity(city));
      });
    }, REFRESH_INTERVAL);

    // This is the cleanup function.
    // React runs this when the component unmounts to prevent memory leaks.
    return () => clearInterval(intervalId);

  // The effect depends on the list of cities and the dispatch function.
  // If the user adds/removes a city, the interval will reset with the new list.
  }, [cities, dispatch]);
  // --- END OF NEW CODE ---


  return (
    <div className="container mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2">Weather Analytics</h1>
        <p className="text-lg text-gray-500">Your personal weather dashboard</p>
      </div>

      <SettingsToggle />
      <Search />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cities.map((city) => {
          const weatherDataKey = Object.keys(weatherData).find(
            (key) => key.toLowerCase() === city.toLowerCase()
          );
          const data = weatherData[weatherDataKey];

          return (
            <div
              key={city}
              onClick={() => setSelectedCity(data)}
              className="cursor-pointer"
            >
              <WeatherCard data={data} />
            </div>
          );
        })}
      </div>

      <DetailedViewModal
        isOpen={!!selectedCity}
        cityData={selectedCity}
        onRequestClose={() => setSelectedCity(null)}
      />
    </div>
  );
};

export default Dashboard;