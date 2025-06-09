// src/components/intents/WeatherSummary.jsx

import React from 'react';

export default function WeatherSummary({ message }) {
  return (
    <div className="bg-blue-50 p-4 rounded-lg shadow-md max-w-md">
      <p className="text-sm text-gray-700 whitespace-pre-line">{message}</p>
    </div>
  );
}