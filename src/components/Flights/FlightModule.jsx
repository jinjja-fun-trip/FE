// src/components/Flights/FlightsModule.jsx
import React, { useState } from 'react';
import useFlights from '@/hooks/useFlights';

export default function FlightsModule() {
  const { flightResults, isLoading, searchFlights, clearFlights } = useFlights();
  const [form, setForm] = useState({
    origin: '', destination: '', date: '', adults: 1,
  });

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSearch = async () => {
    await searchFlights(form);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-xl flex flex-col gap-3 text-sm mb-4">
      {/* --- 입력 폼 --- */}
      <div className="flex flex-wrap gap-2">
        <input name="origin"    placeholder="출발지"   value={form.origin}    onChange={handleChange} className="p-2 rounded border" />
        <input name="destination"placeholder="도착지"   value={form.destination} onChange={handleChange} className="p-2 rounded border" />
        <input name="date" type="date"               value={form.date}       onChange={handleChange} className="p-2 rounded border" />
        <input name="adults" type="number" min="1"    value={form.adults}     onChange={handleChange} className="p-2 rounded border w-20" />
        <button onClick={handleSearch} disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50">
          조회하기
        </button>
      </div>

      {/* --- 로딩 상태 --- */}
      {isLoading && <p className="text-gray-500">✈️ 항공권을 조회 중입니다...</p>}

      {/* --- 결과 리스트 --- */}
      {flightResults.length > 0 && (
        <div className="mt-4 space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">항공권 목록</h3>
            <button onClick={clearFlights} className="text-red-500">× 닫기</button>
          </div>
          <ul className="divide-y">
            {flightResults.map((f, i) => {
              const seg = f.itineraries[0].segments;
              const first = seg[0], last = seg[seg.length - 1];
              return (
                <li key={i}
                    onClick={() => console.log('선택된 항공편', f)}
                    className="p-2 hover:bg-gray-200 cursor-pointer">
                  <p>🛫 {first.departure.iataCode} → 🛬 {last.arrival.iataCode}</p>
                  <p>💸 ₩{parseFloat(f.price.total).toLocaleString()}</p>
                  <p>⏱ {f.itineraries[0].duration}</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
