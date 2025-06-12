// src/hooks/useFlights.js
import { useState } from 'react';

export default function useFlights() {
  const [flightResults, setFlightResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchFlights = async ({ origin, destination, date, adults }) => {
    if (!origin || !destination || !date || !adults) return;
    setIsLoading(true);
    try {
      const res = await fetch(
        `http://3.138.36.245:8000/flights/search?origin=${origin}&destination=${destination}&departure_date=${date}&adults=${adults}&currencyCode=KRW`
      );
      const data = await res.json();
      const flights = Array.isArray(data) ? data : data.data;
      setFlightResults(flights);
      return flights;
    } catch (err) {
      console.error('❌ 항공권 조회 에러', err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const createFlight = async (payload) => {
    return fetch('http://3.138.36.245:8000/flights/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then((r) => r.json());
  };

  const updateFlight = async (flightId, payload) => {
    return fetch(`http://3.138.36.245:8000/flights/${flightId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then((r) => r.json());
  };

  return {
    flightResults,
    isLoading,
    searchFlights,
    createFlight,
    updateFlight,
    clearFlights: () => setFlightResults([]),
  };
}
