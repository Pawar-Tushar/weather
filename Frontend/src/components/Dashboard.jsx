// src/components/Dashboard.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherByCity } from '../store/weatherSlice';
import WeatherCard from './WeatherCard';
import Search from './Search';
import DetailedViewModal from './DetailedViewModal'; // Import the new modal component
import SettingsToggle from './SettingsToggle';

const Dashboard = () => {
  const dispatch = useDispatch();

  // State from Redux
  const { data: weatherData } = useSelector((state) => state.weather);
  const { cities } = useSelector((state) => state.favorites);

  // State for managing the modal
  // `selectedCity` will hold the full data object for the clicked city.
  // It's `null` when the modal is closed.
  const [selectedCity, setSelectedCity] = useState(null);

  // Memoized value to prevent infinite loops in the useEffect hook
  const weatherDataKeys = useMemo(() => Object.keys(weatherData).sort().join(','), [weatherData]);

  // Effect to fetch weather for favorite cities
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

  return (
    <div className="container mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2">Weather Analytics</h1>
        <p className="text-lg text-gray-500">Your personal weather dashboard</p>
      </div>
<SettingsToggle />
      <Search />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cities.map((city) => {
          // Find the weather data that corresponds to the favorite city
          const weatherDataKey = Object.keys(weatherData).find(
            (key) => key.toLowerCase() === city.toLowerCase()
          );
          const data = weatherData[weatherDataKey];

          // Wrap the WeatherCard in a clickable div to trigger the modal
          return (
            <div
              key={city}
              onClick={() => setSelectedCity(data)}
              className="cursor-pointer" // Changes the mouse to a pointer on hover
            >
              <WeatherCard data={data} />
            </div>
          );
        })}
      </div>

      {/* 
        The Modal component is rendered here.
        - `isOpen` controls its visibility. `!!selectedCity` converts the object to a boolean (true if an object exists, false if null).
        - `cityData` passes the selected city's information to the modal.
        - `onRequestClose` provides a function to close the modal, which simply sets the selected city back to null.
      */}
      <DetailedViewModal
        isOpen={!!selectedCity}
        cityData={selectedCity}
        onRequestClose={() => setSelectedCity(null)}
      />
    </div>
  );
};

export default Dashboard;