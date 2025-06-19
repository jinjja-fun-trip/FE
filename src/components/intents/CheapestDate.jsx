import React from 'react';

function extractDateOnly(datetimeString) {
  // "2025-06-30T23:35:00.000Z" → "2025-06-30"
  return datetimeString.split("T")[0];
}

function formatDateForSkyscanner(dateString) {
  // "2025-06-30" → "20250630"
  return dateString.replace(/-/g, "");
}

function makeBookingUrl(origin, destination, departureDateTime) {
  const dateOnly = extractDateOnly(departureDateTime);         // "2025-06-30"
  const formattedDate = formatDateForSkyscanner(dateOnly);     // "20250630"

  return `https://www.skyscanner.co.kr/transport/flights/${origin}/${destination}/${formattedDate}/?adults=1`;
}

export default function CheapestDate({ message, cards }) {
  return (
    <div className="space-y-6">
      {/* 💬 메시지 말풍선 */}
      {message && (
        <div className="bg-blue-100 text-blue-900 p-4 rounded-xl shadow-sm text-sm leading-relaxed max-w-2xl">
          {message}
        </div>
      )}

      {/* ✈️ 항공편 카드 리스트 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="border rounded-xl p-5 bg-white shadow hover:shadow-md transition"
          >
            <h3 className="text-base font-semibold text-gray-800 mb-1">
              {card.route} | {card.carrier}
            </h3>
            <p className="text-sm text-gray-600">
              출발일: <span className="font-medium">
                {new Date(card.departure).toLocaleString('ko-KR')}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              도착일: <span className="font-medium">
                {new Date(card.arrival).toLocaleString('ko-KR')}
              </span>
            </p>
            <p className="text-lg font-bold text-gray-900 mt-2 mb-4">
              {card.price.toLocaleString()} KRW
            </p>

            <a
              href={makeBookingUrl(card.route.split("-")[0], card.route.split("-")[1], card.departure)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full text-center bg-sky-500 text-white text-sm font-semibold py-2 rounded-lg hover:bg-sky-600 transition"
            >
              예약하러 가기 →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}