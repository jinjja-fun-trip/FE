import React from "react";

export default function FlightSearchForm({ form, setForm, onSubmit, isLoading }) {
  return (
    <div className="bg-gray-100 p-4 rounded-xl flex flex-col gap-3 text-sm mb-4">
      <input
        placeholder="출발지 (예: ICN)"
        value={form.origin}
        onChange={(e) => setForm({ ...form, origin: e.target.value })}
        className="p-2 rounded border"
      />
      <input
        placeholder="도착지 (예: LAX)"
        value={form.destination}
        onChange={(e) => setForm({ ...form, destination: e.target.value })}
        className="p-2 rounded border"
      />
      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        className="p-2 rounded border"
      />
      <input
        type="number"
        min="1"
        value={form.adults}
        onChange={(e) => setForm({ ...form, adults: e.target.value })}
        className="p-2 rounded border"
      />
      <button
        onClick={onSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        조회하기
      </button>
      {isLoading && (
        <div className="text-center text-gray-500 text-sm mt-2 animate-pulse">
          ✈️ 항공권을 조회 중입니다...
        </div>
      )}
    </div>
  );
}