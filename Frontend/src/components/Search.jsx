// src/components/Search.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWeatherByCity } from '../store/weatherSlice';
import { addFavorite } from '../store/favoritesSlice';

const Search = () => {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      dispatch(fetchWeatherByCity(city));
      dispatch(addFavorite(city));
      setCity('');
    }
  };

  return (
    <div className="mb-8 max-w-xl mx-auto">
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search for a city..."
          className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-2 rounded-lg font-semibold text-white"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default Search;