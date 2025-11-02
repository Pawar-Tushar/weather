// src/components/HourlyChart.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// A simple function to format the time on the X-axis for better readability
const formatXAxis = (timeStr) => {
  const date = new Date(timeStr);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
};

const HourlyChart = ({ data }) => {
  // The data prop will be an array of hourly forecast objects
  if (!data || data.length === 0) {
    return <p>No hourly data available.</p>;
  }

  return (
    <div style={{ width: '100%', height: 300 }} className="mt-8">
      <h3 className="text-xl font-bold mb-4 text-center">Hourly Temperature (°C)</h3>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: -10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="time" tickFormatter={formatXAxis} stroke="#666" />
          <YAxis stroke="#666" domain={['dataMin - 2', 'dataMax + 2']} />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
            labelStyle={{ color: '#333', fontWeight: 'bold' }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="temp_c"
            stroke="#3b82f6"
            strokeWidth={2}
            activeDot={{ r: 8 }}
            name="Temp (°C)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HourlyChart;