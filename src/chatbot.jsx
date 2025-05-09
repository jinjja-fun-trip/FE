import React, { useState, useRef, useEffect } from "react";

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showOptions, setShowOptions] = useState(true);
  const [showFlightForm, setShowFlightForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [flightForm, setFlightForm] = useState({
    origin: "",
    destination: "",
    date: "",
    adults: 1,
  });
  const [flightResults, setFlightResults] = useState([]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };
    const frame = requestAnimationFrame(scrollToBottom);
    return () => cancelAnimationFrame(frame);
  }, [messages, flightResults]);

  const handleOptionClick = (option) => {
    if (option === "항공권 조회") {
      setShowFlightForm(true);
      setShowOptions(false);
      setMessages((prev) => [
        ...prev,
        { type: "user", text: option },
        { type: "bot", text: "출발지, 도착지, 출발 날짜, 인원을 입력해주세요." },
      ]);
      return;
    }

    let response = "";
    switch (option) {
      case "예약 조회":
        response = "현재 예약 내역을 조회합니다. 이름이나 예약번호를 입력해주세요.";
        break;
      case "예약하기":
        response = "항공권 또는 호텔 예약을 도와드릴게요. 어떤 걸 예약하시겠어요?";
        break;
      case "예약 취소":
        response = "예약을 취소하시겠어요? 예약 번호를 입력해주세요.";
        break;
      case "기타":
        response = "문의하실 내용을 입력해주세요. 가능한 한 빨리 도와드릴게요!";
        break;
      default:
        response = "알 수 없는 선택입니다.";
    }

    setMessages((prev) => [
      ...prev,
      { type: "user", text: option },
      { type: "bot", text: response },
    ]);
    setShowOptions(false);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { type: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { type: "bot", text: data.reply }]);
    } catch {
      setMessages((prev) => [...prev, { type: "bot", text: "❌ 에러가 발생했어요." }]);
    }

    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const searchFlights = async () => {
    const { origin, destination, date, adults } = flightForm;
    if (!origin || !destination || !date || !adults) return;
    setIsLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8000/flights/search?origin=${origin}&destination=${destination}&departure_date=${date}&adults=${adults}`
      );
      const data = await res.json();
      console.log("📦 받은 항공권 결과:", data);
  
      // 💡 응답이 배열이 아니라면 여기서 구조 확인
      const flightList = Array.isArray(data) ? data : data.data;
  
      setFlightResults(flightList);  // 🛠 구조에 맞춰 변경
      setMessages((prev) => [...prev, { type: "bot", text: "🛫 항공권 조회 결과입니다." }]);
      setShowFlightForm(false);
    } catch (e) {
      console.error("❌ 에러:", e);
      setMessages((prev) => [...prev, { type: "bot", text: "❌ 항공권 조회 중 오류가 발생했어요." }]);
    } finally {
      setIsLoading(false); // 🔵 로딩 종료
    }
  };
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#f8f9fb] font-sans">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-[95vw] max-w-4xl h-[calc(100vh-110px)] bg-white shadow rounded-xl p-6 flex flex-col justify-between overflow-hidden">
          {/* 메시지 출력 */}
          <div className="overflow-y-auto hide-scrollbar flex-1 mb-4 flex flex-col gap-3 pr-1">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`relative px-4 py-2 max-w-xl text-sm break-words shadow-md animate-fadeIn ${
                    msg.type === "user"
                      ? "bg-lime-200/90 text-black rounded-br-none rounded-3xl"
                      : "bg-emerald-100/90 text-black rounded-bl-none rounded-3xl"
                  }`}
                >
                  {msg.type === "bot" ? "🤖 " : "🙋‍♂️ "}
                  {msg.text}
                  <div
                    className={`absolute bottom-0 w-3 h-3 ${
                      msg.type === "user"
                        ? "right-0 bg-lime-200 rotate-45 translate-y-1/2"
                        : "left-0 bg-emerald-100 rotate-45 translate-y-1/2"
                    }`}
                    style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                  />
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* 버튼 옵션 */}
          {showOptions && (
            <div className="flex flex-wrap gap-2 mb-4 animate-fadeIn">
              {["항공권 조회", "예약 조회", "예약하기", "예약 취소", "기타"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleOptionClick(opt)}
                  className="bg-sky-100 text-sky-800 text-sm px-4 py-2 rounded-xl shadow hover:bg-sky-200 transition duration-300"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* 항공권 입력 폼 */}
          {showFlightForm && (
            <div className="bg-gray-100 p-4 rounded-xl flex flex-col gap-3 text-sm mb-4">
              <input
                placeholder="출발지 (예: ICN)"
                value={flightForm.origin}
                onChange={(e) => setFlightForm({ ...flightForm, origin: e.target.value })}
                className="p-2 rounded border"
              />
              <input
                placeholder="도착지 (예: LAX)"
                value={flightForm.destination}
                onChange={(e) => setFlightForm({ ...flightForm, destination: e.target.value })}
                className="p-2 rounded border"
              />
              <input
                type="date"
                value={flightForm.date}
                onChange={(e) => setFlightForm({ ...flightForm, date: e.target.value })}
                className="p-2 rounded border"
              />
              <input
                type="number"
                min="1"
                value={flightForm.adults}
                onChange={(e) => setFlightForm({ ...flightForm, adults: e.target.value })}
                className="p-2 rounded border"
              />
              <button
                onClick={searchFlights}
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
          )}

          {/* 항공권 결과 출력 */}
          {flightResults.length > 0 && (
            <div className="text-sm mt-2 max-h-[300px] overflow-y-auto">
              {flightResults.map((item, idx) => {
                const segments = item.itineraries[0].segments;
                const firstSegment = segments[0];
                const lastSegment = segments[segments.length - 1];
                const departure = segments[0].departure.iataCode;
                const arrival = segments.slice(-1)[0].arrival.iataCode;
                const departureTime = firstSegment.departure.at;
                const arrivalTime = lastSegment.arrival.at;
                const airlineCode = segments[0].carrierCode; // 항공사 코드
                const price = item.price.total;
                const currency = item.price.currency;
                // 항공사 코드 → 이름 매핑
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
                  // 필요시 더 추가 가능
                };
                const airlineName = airlineNames[airlineCode] || airlineCode;

                //비행 시간 계산
                const rawDuration = item.itineraries[0].duration;
                let durationHours = "-";
                let durationMinutes = "-";
                
                const durationMatch = rawDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
                if (durationMatch) {
                  durationHours = durationMatch[1] || "0";
                  durationMinutes = durationMatch[2] || "0";
                }
                // 💰 가격 처리
                const eurToKrw = 1300;  // 환율은 실제 배포 시 환율 API로 교체 추천
                const rawPrice = Number(item.price.total);
                const convertedPrice = Math.round(rawPrice * eurToKrw);  // 반올림
                const formattedPrice = convertedPrice.toLocaleString("ko-KR");  // 3자리마다 콤마

                return (
                  <div key={idx} className="p-3 bg-white border rounded mb-2 shadow-sm">
                    <div>🛫 출발: {departure} / {new Date(departureTime).toLocaleString()}</div>
                    <div>🛬 도착: {arrival} / {new Date(arrivalTime).toLocaleString()}</div>
                    <div>🕒 비행 시간: {durationHours}시간 {durationMinutes}분</div>
                    <div>✈️ 항공사: {airlineName}</div>
                    <div>💸 가격: {formattedPrice}원</div>
                  </div>
                );
              })}
            </div>
          )}

          {/* 사용자 메시지 입력창 */}
          <div className="flex gap-2 mt-4">
            <input
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="메시지를 입력하세요"
            />
            <button
              onClick={sendMessage}
              className="bg-sky-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-sky-700 transition duration-300"
            >
              전송
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}