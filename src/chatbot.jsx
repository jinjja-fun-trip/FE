import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react"
import PriceTrendChart from "./components/ui/PriceTrendChart";
export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showOptions, setShowOptions] = useState(true);
  const [showFlightForm, setShowFlightForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOption, setSortOption]=useState("");
  const [flightForm, setFlightForm] = useState({
    origin: "",
    destination: "",
    date: "",
    adults: 1,
  });
  const [flightResults, setFlightResults] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const messagesEndRef = useRef(null);
  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
  const handleLogout = () => {
    localStorage.removeItem("user-auth");
    window.location.href = "/";
  };
  const [priceTrendData, setPriceTrendData] = useState([]);
  const [showPriceChart, setShowPriceChart] = useState(false);

  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };
    const frame = requestAnimationFrame(scrollToBottom);
    return () => cancelAnimationFrame(frame);
  }, [messages, flightResults]);
  useEffect(() => {
    const welcomeMessage = {
      type: "bot",
      text: "안녕하세요! 챗봇 예약 플래너입니다.\n항공권이나 호텔 예약, 조회, 취소 등 원하시는 기능을 선택해주세요 😊"
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleOptionClick = (option) => {
    setShowFlightForm(false);
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
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
  
    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages })  // ✅ 전체 대화 전송
      });
      const data = await res.json();
      setMessages([...newMessages, { type: "bot", text: data.reply }]);
    } catch {
      setMessages([...newMessages, { type: "bot", text: " 에러가 발생했어요." }]);
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
        `http://localhost:8000/flights/search?origin=${origin}&destination=${destination}&departure_date=${date}&adults=${adults}&currencyCode=KRW`
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
  const sortFlights = (flights) => {
    return [...flights].sort((a, b) => {
      if (sortOption === "price") {
        return parseFloat(a.price.total) - parseFloat(b.price.total);
      } else if (sortOption === "time") {
        return new Date(a.itineraries[0].segments[0].departure.at) - new Date(b.itineraries[0].segments[0].departure.at);
      } else if (sortOption === "korean") {
        const koreanCodes = ["KE", "OZ"];
        return koreanCodes.includes(b.itineraries[0].segments[0].carrierCode) - koreanCodes.includes(a.itineraries[0].segments[0].carrierCode);
      } else return 0;
    });
  };
  const getFlightSummaryText = (flight) => {
    const segments = flight.itineraries[0].segments;
    const first = segments[0];
    const last = segments[segments.length - 1];
    const duration = flight.itineraries[0].duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    const hour = duration?.[1] || "0";
    const min = duration?.[2] || "0";
    const price = `₩${parseFloat(flight.price.total).toLocaleString()}`;
    const airline = first.carrierCode;
    const seatCount = flight.numberOfBookableSeats;
    const stopInfo = segments.length === 1 ? "직항" : `${segments.length - 1}회 경유`;
  
    return [
      "✅ 선택한 항공편 정보입니다:",
      `🛫 ${first.departure.iataCode} → 🛬 ${last.arrival.iataCode}`,
      `출발: ${new Date(first.departure.at).toLocaleString()}`,
      `도착: ${new Date(last.arrival.at).toLocaleString()}`,
      `항공사: ${airline}`,
      `비행 시간: ${hour}시간 ${min}분`,
      `잔여 좌석: ${seatCount !== undefined ? seatCount + "석" : "정보 없음"}`,
      `경유 정보: ${stopInfo}`,
      `가격: ${price}`
    ];
  };
  // 예: 항공편 클릭 시 그래프도 보여주기
  const handleFlightClick = async (flight) => {
    // 1. 📊 가격 추이 데이터 요청 먼저!
    const res = await fetch(
      `http://localhost:8000/flights/price-trend?origin=${flight.itineraries[0].segments[0].departure.iataCode}&destination=${flight.itineraries[0].segments.slice(-1)[0].arrival.iataCode}`
    );
    const data = await res.json();

    // 2. 메시지 2개 추가: 요약 + 차트
    setMessages((prev) => [
      ...prev,
      {
        type: "bot",
        text: getFlightSummaryText(flight), // 텍스트 요약 메시지
      },
      {
        type: "bot",
        text: <PriceTrendChart data={data} />, // ✅ JSX 메시지로 차트 삽입
        isWide: true,
      },
    ]);

    // 3. 상태 업데이트 (선택사항)
    setPriceTrendData(data);
    setShowPriceChart(true);

    // 4. 디버깅 로그
    console.log("📊 가격 추이 데이터:", data);
  };
  const user = JSON.parse(localStorage.getItem("user-auth"));
  return (
    <div className="h-screen w-screen flex font-sans bg-[#f8f9fb]">
      <div className="w-[180px] flex flex-col justify-between bg-white shadow-sm px-4 py-6">
        <div className="flex flex-col items-center gap-6">
          <img src="/bookie-logo.png" alt="Bookie 로고" className="h-20" />
          {["항공권 조회", "예약 조회", "예약하기", "예약 취소", "기타"].map((opt) => (
            <button
              key={opt}
              onClick={() => handleOptionClick(opt)}
              className="min-w-[120px] text-center bg-[#D4F4FF] text-sky-800 text-sm px-4 py-2 rounded-xl shadow hover:bg-sky-200 transition duration-300"
            >
              {opt}
            </button>
          ))}
        </div>

        {/* 사용자 정보 영역 */}
        <div className="mt-6 pt-4 border-t text-sm text-gray-600">
          <p className="font-semibold">{user.name}</p>
          <p className="text-xs">{user.email}</p>
          <button
            onClick={handleLogout}
            className="mt-3 bg-sky-500 hover:bg-sky-600 text-white text-xs font-medium px-3 py-1 rounded shadow w-full"
          >
            로그아웃
          </button>
        </div>
      </div>





      <div className="flex-1 flex items-center justify-center relative">
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-white rounded-xl shadow p-6 flex flex-col justify-between overflow-hidden">
          {/* 메시지 출력 */}
          <div className="overflow-y-auto hide-scrollbar flex-1 mb-4 flex flex-col gap-3 pr-1">
              {/* 날짜 표시 */}
              <div className="text-center text-gray-400 text-sm mt-0">
                {today}
              </div>
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`relative px-4 py-2 ${msg.isWide ? "w-full max-w-[500px]" : "max-w-xl"} text-sm break-words shadow-md animate-fadeIn ${
                    msg.type === "user"
                      ? "bg-[#057DFF] text-white rounded-br-none rounded-3xl"
                      : "bg-[#E9E9EB] text-black rounded-bl-none rounded-3xl"
                  }`}
                >
                  {/* 아이콘은 텍스트일 때만 출력 */}
                  {typeof msg.text === "string" || Array.isArray(msg.text)
                    ? msg.type === "bot" ? "🤖 " : "🙋‍♂️ " : null}

                  {/* 텍스트 or 컴포넌트 분기 */}
                  {Array.isArray(msg.text)
                    ? msg.text.map((line, i) => <p key={i}>{line}</p>)
                    : typeof msg.text === "string"
                    ? msg.text
                    : <div className="w-full">{msg.text}</div>}

                  {/* 꼬리 */}
                  <div
                    className={`absolute bottom-0 w-3 h-3 ${
                    msg.type === "user"
                    ? "right-0 bg-[#057DFF] rotate-45 translate-y-1/2"
                    : "left-0 bg-[#E9E9EB] rotate-45 translate-y-1/2"
                    }`}
                    style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                  />
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

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

          {/* 사용자 메시지 입력창 */}
          <div className="flex items-center gap-2 mt-4">
            <input
              className="flex-1 bg-gray-50 border border-gray-300 text-sm rounded-full px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="메시지를 입력하세요"
            />

            <button
              onClick={sendMessage}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-sky-500 hover:bg-sky-600 transition-colors group shadow"
              aria-label="전송"
            >
              <Send
                size={18}
                strokeWidth={2}
                className="text-white transform group-hover:translate-x-0.5 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
      {/* 오른쪽 항공권 결과 영역 */}
      {flightResults.length > 0 && (
        <div className="w-[400px] p-4 overflow-y-auto bg-white border-l">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-base font-semibold">항공권 목록</h2>
            <button
              onClick={() => {
                setFlightResults([]);
                setMessages((prev) =>
                  prev.filter((msg) => msg.text !== "🛫 항공권 조회 결과입니다.")
                );
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
            const airline = first.carrierCode;
            const price = `₩${parseFloat(item.price.total).toLocaleString()}`;
            const duration = item.itineraries[0].duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
            const durHour = duration?.[1] || "0";
            const durMin = duration?.[2] || "0";
            const isDirect = segments.length ===1;
            const stopInfo = isDirect ? "직항" : `${segments.length - 1}회 경유`;
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
              <div
                key={idx}
                onClick={() => handleFlightClick(item)}
                className="p-3 border rounded mb-3 bg-gray-50 hover:bg-gray-100 cursor-pointer text-sm"
              >
              <p>🛫 {first.departure.iataCode} → 🛬 {last.arrival.iataCode}</p>
              <p>출발: {new Date(first.departure.at).toLocaleString()}</p>
              <p>도착: {new Date(last.arrival.at).toLocaleString()}</p>
              <p>항공사: {airlineNames[airline] || airline}</p>
              <p>⏱ 비행 시간: {durHour}시간 {durMin}분</p>
              <div>🛣 경로: {stopInfo}</div>
              <p>💸 가격: {price}원</p>
              {item.numberOfBookableSeats !== undefined && (
                <p>🎟️ 잔여 좌석: {item.numberOfBookableSeats}석</p>
              )}
            </div>
          );
        })}
      </div>
  )}
    </div>
  );
}