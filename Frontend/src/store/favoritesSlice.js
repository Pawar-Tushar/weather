// src/store/favoritesSlice.js

import { createSlice } from '@reduxjs/toolkit';

// Function to load favorites from localStorage.
// If nothing is stored, it initializes with a default array of cities.
const loadFavoritesFromStorage = () => {
  const storedFavorites = localStorage.getItem('favoriteCities');
  return storedFavorites ? JSON.parse(storedFavorites) : ['London', 'New York', 'Tokyo'];
};

// The initial state for the favorites slice, loaded from localStorage
const initialState = {
  cities: loadFavoritesFromStorage(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  /**
   * Reducers for adding and removing favorite cities.
   */
  reducers: {
    // Action to add a new city to the favorites list
    addFavorite: (state, action) => {
      const newCity = action.payload;
      // Ensure the city isn't already in the list (case-insensitive check)
      if (!state.cities.find(city => city.toLowerCase() === newCity.toLowerCase())) {
        state.cities.push(newCity);
        // Save the updated list back to localStorage
        localStorage.setItem('favoriteCities', JSON.stringify(state.cities));
      }
    },
    // Action to remove a city from the favorites list
    removeFavorite: (state, action) => {
      // Filter out the city to be removed (case-insensitive check)
      state.cities = state.cities.filter(
        (city) => city.toLowerCase() !== action.payload.toLowerCase()
      );
      // Save the updated list back to localStorage
      localStorage.setItem('favoriteCities', JSON.stringify(state.cities));
    },
  },
});

// Export the action creators to be used in your components
export const { addFavorite, removeFavorite } = favoritesSlice.actions;

// Export the reducer to be added to the main store
export default favoritesSlice.reducer;