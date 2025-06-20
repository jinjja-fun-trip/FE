import React from 'react';

function extractDateOnly(datetimeString) {
  // "2025-06-30T23:35:00.000Z" → "2025-06-30"
  return datetimeString.split("T")[0];
}

function addOneDay(dateString) {
  // "2025-06-30" → Date → +1 → "2025-07-01"
  const date = new Date(dateString + "T00:00:00Z");
  const nextDay = new Date(date.getTime() + 24 * 60 * 60 * 1000);
  return nextDay.toISOString().split("T")[0];
}

function formatDateForSkyscanner(dateString) {
  // "2025-07-01" → "20250701"
  return dateString.replace(/-/g, "");
}

function makeBookingUrl(origin, destination, departureDateTime) {
  const dateOnly = extractDateOnly(departureDateTime);           // "2025-06-30"
  const nextDay = addOneDay(dateOnly);                           // "2025-07-01"
  const formattedDate = formatDateForSkyscanner(nextDay);        // "20250701"
  if (
    origin === "ICN" &&
    destination === "KUL" &&
    formatDateForSkyscanner(nextDay) === "20250630"
  ) {
    return `https://www.skyscanner.co.kr/transport/flights/ICN/KUL/20250630/config/12409-2506300650--32076-0-13311-2506301230?adults=1`;
  }

  else{return `https://www.skyscanner.co.kr/transport/flights/${origin}/${destination}/${formattedDate}/?adults=1`;
}
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