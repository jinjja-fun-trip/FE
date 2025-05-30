import React from "react";

export default function FlightResults({ 
  flightResults, 
  sortOption, 
  setSortOption, 
  setFlightResults, 
  setMessages, 
  handleFlightClick,
  sortFlights 
}) {
  const airlineNames = {
    KE: "대한항공 (Korean Air)",
    OZ: "아시아나항공 (Asiana Airlines)",
    AA: "아메리칸항공 (American Airlines)",
    DL: "델타항공 (Delta Airlines)",
    UA: "유나이티드항공 (United Airlines)",
    JL: "일본항공 (Japan Airlines)",
    NH: "전일본공수 (ANA)",
    SQ: "싱가포르항공 (Singapore Airlines)",
    CX: "캐세이퍼시픽 (Cathay Pacific)",
    BA: "브리티시항공 (British Airways)",
    AF: "에어프랑스 (Air France)",
    MF: "샤먼항공 (Xiamen Airlines)",
    YP: "에어 프렘야 (Air Premia)",
    CA: "에어차이나 (Air China)",
    BR: "에바항공 (EVA Air)",
    CI: "중화항공 (China Airlines)",
    WS: "웨스트젯 (WestJet)",
    AC: "에어캐나다 (Air Canada)",
    PR: "필리핀항공 (Philippine Airlines)",
    TK: "터키항공 (Turkish Airlines)",
    EK: "에미레이트항공 (Emirates)",
    LO: "LOT 폴란드항공 (LOT Polish Airlines)",
    QR: "카타르항공 (Qatar Airways)",
    MU: "중국동방항공 (China Eastern Airlines)",
    HA: "하와이안항공 (Hawaiian Airlines)"
  };

  return (
    <div className="w-[400px] p-4 overflow-y-auto bg-white border-l">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-base font-semibold">항공권 목록</h2>
        <button
          onClick={() => {
            setFlightResults([]);
          }}
          className="text-gray-400 hover:text-red-500 text-lg font-bold"
        >
          ×
        </button>
      </div>
      <div className="mb-2">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="text-sm border rounded px-2 py-1 w-full"
        >
          <option value="">정렬 기준 선택</option>
          <option value="price">가격 낮은 순</option>
          <option value="time">출발 시간 순</option>
          <option value="korean">한국 항공 우선</option>
        </select>
      </div>

      {sortFlights(flightResults).map((item, idx) => {
        const segments = item.itineraries[0].segments;
        const first = segments[0];
        const last = segments[segments.length - 1];
        const duration = item.itineraries[0].duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
        const durHour = duration?.[1] || "0";
        const durMin = duration?.[2] || "0";
        const stopInfo = segments.length === 1 ? "직항" : `${segments.length - 1}회 경유`;
        const price = `₩${parseFloat(item.price.total).toLocaleString()}`;

        return (
          <div
            key={idx}
            onClick={() => handleFlightClick(item)}
            className="p-3 border rounded mb-3 bg-gray-50 hover:bg-gray-100 cursor-pointer text-sm"
          >
            <p>🛫 {first.departure.iataCode} → 🛬 {last.arrival.iataCode}</p>
            <p>출발: {new Date(first.departure.at).toLocaleString()}</p>
            <p>도착: {new Date(last.arrival.at).toLocaleString()}</p>
            <p>항공사: {airlineNames[first.carrierCode] || first.carrierCode}</p>
            <p>⏱ 비행 시간: {durHour}시간 {durMin}분</p>
            <div>🛣 경로: {stopInfo}</div>
            <p>💸 가격: {price}</p>
            {item.numberOfBookableSeats !== undefined && (
              <p>🎟️ 잔여 좌석: {item.numberOfBookableSeats}석</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
