import FlightSearchForm from "./components/ui/FlightSearchForm";
import FlightResults from "./components/ui/FlightResults";
import { useParams } from 'react-router-dom';
import InputArea from './components/ui/InputArea';
import MessageList from './components/MessageList';
import useMessage from './hooks/useMessage';
import { useState } from 'react';

export default function ChatPage() {
  const { id: sessionId } = useParams();
  const { messageList, addMessage } = useMessage(sessionId);

  const user = JSON.parse(localStorage.getItem("user-auth"));

  const [showFlightForm, setShowFlightForm] = useState(false);
  const [flightForm, setFlightForm] = useState({ origin: '', destination: '', date: '', adults: 1 });
  const [flightResults, setFlightResults] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user-auth");
    window.location.href = "/";
  };

  const handleOptionClick = async (option) => {
    setShowFlightForm(false);
  
    // 항공권 조회는 폼 보여주고 메시지도 함께 전송
    if (option === "항공권 조회") {
      setShowFlightForm(true);
      await addMessage(option); // 서버에도 기록 남기기
      return;
    }
  
    // 모든 옵션은 사용자 입력 그대로 서버로 보내서 응답 받음
    await addMessage(option);
  };

  const handleFlightSubmit = async () => {
    const { origin, destination, date, adults } = flightForm;
    if (!origin || !destination || !date || !adults) return;

    setIsLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8000/flights/search?origin=${origin}&destination=${destination}&departure_date=${date}&adults=${adults}&currencyCode=KRW`
      );
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.data;
      setFlightResults(list);
      setShowFlightForm(false);
    } catch (err) {
      console.error("조회 실패", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFlightClick = (flight) => {
    const summaryArray = getFlightSummaryText(flight);
    const summaryText = summaryArray.join('\n');
    addMessageAndUpdate(summaryText);
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
      `가격: ${price}`,
    ];
  };

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
        <div className="mt-6 pt-4 border-t text-sm text-gray-600">
          <p className="font-semibold">{user?.name}</p>
          <p className="text-xs">{user?.email}</p>
          <button
            onClick={handleLogout}
            className="mt-3 bg-sky-500 hover:bg-sky-600 text-white text-xs font-medium px-3 py-1 rounded shadow w-full"
          >
            로그아웃
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-[#f8f9fb] px-4 py-6">
        <div className="w-full max-w-4xl h-full bg-white rounded-xl shadow flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6">
            <MessageList messageList={messageList} userId={10} />
            {showFlightForm && (
              <FlightSearchForm
                form={flightForm}
                setForm={setFlightForm}
                onSubmit={handleFlightSubmit}
                isLoading={isLoading}
              />
            )}
          </div>
          <div className="p-4 border-t">
            <InputArea onSend={handleOptionClick} placeholder="메시지를 입력하세요..." />
          </div>
        </div>
      </div>

      {flightResults.length > 0 && (
        <FlightResults
          flightResults={flightResults}
          sortOption={sortOption}
          setSortOption={setSortOption}
          setFlightResults={setFlightResults}
          setMessages={addMessageAndUpdate}
          handleFlightClick={handleFlightClick}
          sortFlights={sortFlights}
        />
      )}
    </div>
  );
}