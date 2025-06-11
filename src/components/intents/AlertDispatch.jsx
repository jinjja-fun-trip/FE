import React, { useState } from 'react';

export default function AlertComposer({ userId, defaultPayload, onClose }) {
  console.log("✅ 받은 defaultPayload:", defaultPayload);

  const [threshold, setThreshold] = useState(defaultPayload?.price_threshold || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!threshold) return alert("가격을 입력해주세요.");
    setLoading(true);

    const body = {
      user_id: userId,
      search_params: {
        origin: "ICN",
        destination: "LAX",
        departure_date: defaultPayload.departure_date,
        //currency: "KRW",
      },
      price_threshold: parseInt(threshold, 10),
    };

    try {
      const res = await fetch('https://www.bookie-travel.xyz/price/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("등록 실패");

      alert("📩 알림이 등록되었습니다!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("❌ 등록 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg space-y-4 max-w-md w-full">
      <p className="text-base font-semibold">
        ✨ 다음 조건으로 가격 알림을 등록하시겠습니까?
      </p>

      <div className="text-sm bg-gray-50 p-4 rounded border space-y-2">
        <p><strong>이메일:</strong> {defaultPayload.email}</p>
        <p><strong>출발지:</strong> {defaultPayload.origin}</p>
        <p><strong>도착지:</strong> {defaultPayload.destination}</p>
        <p><strong>출발일:</strong> {defaultPayload.departure_date}</p>
      </div>

      <input
        type="number"
        value={threshold}
        onChange={e => setThreshold(e.target.value)}
        placeholder="💰 알림 받을 가격 (₩)"
        className="w-full p-2 border rounded"
      />

      <div className="flex justify-end gap-2 pt-2">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm"
        >
          취소
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 text-sm"
        >
          {loading ? "등록 중..." : "등록하기"}
        </button>
      </div>
    </div>
  );
}