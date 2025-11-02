// src/components/SettingsToggle.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleUnit } from '../store/settingsSlice';

const SettingsToggle = () => {
  const dispatch = useDispatch();
  const currentUnit = useSelector((state) => state.settings.unit);

  const handleToggle = () => {
    dispatch(toggleUnit());
  };

  return (
    <div className="flex items-center justify-center mb-8">
      <span className={`px-4 py-2 font-semibold ${currentUnit === 'celsius' ? 'text-blue-600' : 'text-gray-500'}`}>
        &deg;C
      </span>
      <button
        onClick={handleToggle}
        className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors bg-gray-300"
      >
        <span
          className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
            currentUnit === 'fahrenheit' ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      <span className={`px-4 py-2 font-semibold ${currentUnit === 'fahrenheit' ? 'text-blue-600' : 'text-gray-500'}`}>
        &deg;F
      </span>
    </div>
  );
};

export default SettingsToggle;