// src/components/intents/PriceSearch.jsx
import React from 'react';


function makeBookingUrl(origin, destination, departureDate, returnDate) {
    const depK = departureDate;
    const rtnK = returnDate || departureDate;
    return `https://www.kayak.co.kr/flights/${origin}-${destination}/${depK}/${rtnK}?sort=bestflight_a`;

}

export default function PriceSearch({ message, flights }) {
  return (
    <div className="space-y-4">
      {/* 1) 메시지 버블 */}
      <div className="self-start max-w-lg bg-blue-100 text-blue-900 p-3 rounded-xl">
        {message}
      </div>

      {/* 2) 항공편 카드 리스트 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {flights.map((flight, idx) => (
          <div
            key={idx}
            className="border rounded-lg p-4 shadow hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold mb-2">
              {flight.origin} → {flight.destination}
            </h3>
            <p className="text-sm text-gray-600 mb-1">
              출발일: {flight.departureDate}
            </p>
            {flight.returnDate && (
              <p className="text-sm text-gray-600 mb-1">
                귀국일: {flight.returnDate}
              </p>
            )}
            <p className="text-base font-bold mb-3">
              {flight.price.toLocaleString()} {flight.currency}
            </p>
            {flight.origin && flight.destination  && flight.departureDate && flight.returnDate? (
              <a
                href={makeBookingUrl(flight.origin, flight.destination, flight.departureDate, flight.returnDate)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-brand-600 text-white px-4 py-2 rounded hover:bg-brand-700"
              >
                예약하기
              </a>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}