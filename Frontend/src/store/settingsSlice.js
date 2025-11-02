// src/store/settingsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  unit: 'celsius', // 'celsius' or 'fahrenheit'
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    // This reducer will simply flip the unit value
    toggleUnit: (state) => {
      state.unit = state.unit === 'celsius' ? 'fahrenheit' : 'celsius';
    },
  },
});

// Export the action so we can dispatch it from our component
export const { toggleUnit } = settingsSlice.actions;

// Export the reducer to add it to the store
export default settingsSlice.reducer;