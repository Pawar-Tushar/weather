// src/store/weatherSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWeatherByCity = createAsyncThunk(
  'weather/fetchByCity',
  async (city, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/weather/current/${city}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const initialState = {
  data: {},
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    removeWeatherData: (state, action) => {
      const cityToRemove = action.payload;
      // Also need to find the correct key case-insensitively to delete
      const keyToDelete = Object.keys(state.data).find(
        key => key.toLowerCase() === cityToRemove.toLowerCase()
      );
      if (keyToDelete) {
        delete state.data[keyToDelete];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.loading = false;
        // --- THIS IS THE FIX ---
        // We now use the correct path to the city name for the key.
        // This ensures each city's data is stored under its own name.
        state.data[action.payload.location.name] = action.payload;
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { removeWeatherData } = weatherSlice.actions;
export default weatherSlice.reducer;