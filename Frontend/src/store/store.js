// src/store/store.js

import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice';
import favoritesReducer from './favoritesSlice'; // Import the favorites reducer
import settingsReducer from './settingsSlice';

/**
 * Configure and create the Redux store.
 * The `reducer` object is a map where each key corresponds to a slice of the state,
 * and the value is the reducer function that manages that slice.
 */
export const store = configureStore({
  reducer: {
    // The `weather` state will be managed by the weatherReducer
    weather: weatherReducer,
    // The `favorites` state will be managed by the favoritesReducer
    favorites: favoritesReducer,
    settings: settingsReducer,
  },
});