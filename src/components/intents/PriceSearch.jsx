import React from 'react';

function formatDateForKayak(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${year.slice(2)}${month}${day}`;
}

function makeBookingUrl(origin, destination, departureDate, returnDate) {
  const dep = formatDateForKayak(departureDate);
  const rtn = formatDateForKayak(returnDate || departureDate);
  const url = `https://www.kayak.co.kr/flights/${origin}-${destination}/${dep}/${rtn}?sort=bestflight_a`;
  return url;
}

export default function PriceSearch({ message, flights }) {
  return (
    <div className="space-y-6">
      {/* 📩 메시지 말풍선 */}
      <div className="bg-blue-100 text-blue-900 p-4 rounded-xl shadow-sm text-sm leading-relaxed max-w-2xl">
        {message}
      </div>

      {/* ✈️ 항공편 카드 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {flights.map((flight, idx) => (
          <div
            key={idx}
            className="border rounded-xl p-5 bg-white shadow hover:shadow-md transition"
          >
            <h3 className="text-base font-semibold text-gray-800 mb-1">
              {flight.origin} → {flight.destination}
            </h3>
            <p className="text-sm text-gray-600">출발일: <span className="font-medium">{flight.departureDate}</span></p>
            {flight.returnDate && (
              <p className="text-sm text-gray-600">귀국일: <span className="font-medium">{flight.returnDate}</span></p>
            )}
            <p className="text-lg font-bold text-gray-900 mt-2 mb-4">
              {flight.price.toLocaleString()} {flight.currency}
            </p>
            {flight.origin && flight.destination && flight.departureDate && (
              <a
                href={makeBookingUrl(flight.origin, flight.destination, flight.departureDate, flight.returnDate)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full text-center bg-sky-500 text-white text-sm font-semibold py-2 rounded-lg hover:bg-sky-600 transition"
              >
                예약하러 가기 →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}