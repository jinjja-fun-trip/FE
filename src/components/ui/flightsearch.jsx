import React, { useState } from "react";

export default function FlightSearch() {
  const [flights, setFlights] = useState([]);

  const handleSearch = async () => {
    const res = await fetch(
      "http://localhost:8000/flights/search?origin=${origin}&destination=${destination}&departure_date=${date}&adults=${adults}&currency_code=KRW"
    );
    const data = await res.json();
    setFlights(data);
  };

  return (
    <div className="p-4 space-y-4">
      <button onClick={handleSearch} className="px-4 py-2 bg-blue-600 text-white rounded">
        항공권 조회
      </button>

      <ul className="space-y-2">
        {flights.map((flight, idx) => (
          <li key={idx} className="border rounded p-2 shadow text-sm">
            ✈️ {flight.itineraries[0].segments[0].departure.iataCode} →{" "}
            {flight.itineraries[0].segments.slice(-1)[0].arrival.iataCode} / 💰{" "}
            {flight.price.total} {flight.price.currency}
          </li>
        ))}
      </ul>
    </div>
  );
}