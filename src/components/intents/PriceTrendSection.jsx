import React from "react";
import PriceTrendChart from "../ui/PriceTrendChart";

const quartileLabels = {
  MINIMUM: "최저",
  FIRST: "1분위",
  MEDIUM: "중간값",
  THIRD: "3분위",
  MAXIMUM: "최고"
};

export default function PriceTrendSection({ result }) {
  // 분석 결과로부터 priceMetrics → 그래프용 데이터 변환
  const chartData = result.priceMetrics.map((entry) => ({
    date: quartileLabels[entry.quartileRanking] || entry.quartileRanking,
    price: entry.amount,
  }));

  return (
    <div className="space-y-4">
      {/* 텍스트 요약 메시지 */}
      <div className="bg-sky-100 text-sky-900 px-4 py-2 rounded shadow text-sm max-w-xl">
        {result.message}
      </div>

      {/* 가격 추이 그래프 */}
      <PriceTrendChart data={chartData} />
    </div>
  );
}