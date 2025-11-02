// src/components/DetailedViewModal.jsx

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import HourlyChart from './HourlyChart'; // <-- 1. IMPORT THE CHART

// Set the app element for accessibility
Modal.setAppElement('#root');

const DetailedViewModal = ({ cityData, isOpen, onRequestClose }) => {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cityData && cityData.location) {
      setLoading(true);
      setForecast(null);
      axios.get(`http://localhost:5000/api/weather/forecast/${cityData.location.name}`)
        .then(response => {
          setForecast(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Failed to fetch forecast:", error);
          setLoading(false);
        });
    }
  }, [cityData]);

  if (!cityData) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)', zIndex: 50 },
        content: {
          top: '50%', left: '50%', right: 'auto', bottom: 'auto',
          marginRight: '-50%', transform: 'translate(-50%, -50%)',
          border: 'none', background: 'white', borderRadius: '8px',
          padding: '2rem', maxWidth: '700px', width: '90%', maxHeight: '90vh',
          overflowY: 'auto'
        }
      }}
      contentLabel="Weather Details"
    >
      <div className="flex justify-between items-start">
        <h2 className="text-3xl font-bold mb-4">{cityData.location.name} - Forecast</h2>
        <button onClick={onRequestClose} className="text-2xl font-bold text-gray-500 hover:text-gray-800">&times;</button>
      </div>

      {loading && <p>Loading forecast...</p>}

      {forecast && (
        <>
          {/* Daily Forecast Section */}
          <div className="space-y-3 my-6">
            <h3 className="text-xl font-bold mb-2">Daily</h3>
            {forecast.forecast.forecastday.map(day => (
              <div key={day.date_epoch} className="flex justify-between items-center p-2 bg-gray-100 rounded">
                <p className="font-semibold w-1/4">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}</p>
                <img src={`https:${day.day.condition.icon}`} alt={day.day.condition.text} className="w-10 h-10" />
                <p className="w-1/4 text-center">{day.day.condition.text}</p>
                <p className="font-semibold w-1/4 text-right">{Math.round(day.day.maxtemp_c)}&deg; / {Math.round(day.day.mintemp_c)}&deg;</p>
              </div>
            ))}
          </div>

          {/* --- 2. ADD THE CHART COMPONENT HERE --- */}
          {/* We pass the hourly data for the first day of the forecast */}
          <HourlyChart data={forecast.forecast.forecastday[0].hour} />
        </>
      )}
    </Modal>
  );
};

export default DetailedViewModal;