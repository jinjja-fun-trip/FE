<<<<<<< HEAD
import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react" //전송 아이콘
import PriceTrendChart from "./components/ui/PriceTrendChart"; //가격 추이 그래프 컴포넌트
import DestinationCard from "./components/ui/DestinationCard"; //목적지 카드 컴포넌트
import { useParams } from 'react-router-dom';

import NavBar from './components/NavBar';
import InputArea from './components/InputArea';
import MessageList from './lib/MessageList';

import useMessage from './lib/useMessage';

export default function ChatPage() {
	const { id: sessionId } = useParams();
	const { messageList, addMessage } = useMessage(sessionId);

	return (
		<div className='flex flex-col w-full h-screen min-w-[1000px]'>
			<NavBar />
			<div className='flex-1 overflow-y-auto'>
				<MessageList messageList={messageList} userId={10} />
			</div>
			<InputArea onSend={addMessage} placeholder='메시지를 입력하세요...' />
		</div>
	);
}

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
    setMessages([]); // ✅ 메시지 초기화
    window.location.href = "/";
  };
  const [priceTrendData, setPriceTrendData] = useState([]);
  const [showPriceChart, setShowPriceChart] = useState(false);
=======
// src/pages/ChatPage.jsx
import { useParams } from 'react-router-dom';
import InputArea   from '@/components/ui/InputArea';
import MessageList from '@/components/MessageList';
import FlightsModule from '@/components/Flights/FlightModule';
import useMessage  from '@/hooks/useMessage';
>>>>>>> 6288db9aa3b5d06a9d40f4e6bb591c7c18e339fd

export default function ChatPage() {
  const { id: sessionId } = useParams();
  const { messageList, addMessage } = useMessage(sessionId);

  return (
    <div className="flex flex-col w-full h-screen min-w-[1000px]">

      <div className="flex-1 overflow-y-auto">
        <MessageList messageList={messageList} userId={10} />
      </div>

      {/* ── 항공권 관련 모듈 ── */}
      <FlightsModule />

      <InputArea
        onSend={addMessage}
        placeholder="메시지를 입력하세요..."
      />
    </div>
  );
}
