import React, { useState, useRef, useEffect } from "react";

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showOptions, setShowOptions] = useState(true);
  const messagesEndRef = useRef(null);

  // 자동 스크롤 아래로
  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };
  
    const frame = requestAnimationFrame(scrollToBottom);
    return () => cancelAnimationFrame(frame);
  }, [messages]);

  const handleOptionClick = (option) => {
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
    } catch (error) {
      setMessages((prev) => [...prev, { type: "bot", text: "🤖 에러가 발생했어요." }]);
    }

    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#f8f9fb] font-sans">
      {/* 챗봇 전체 박스 */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-[95vw] max-w-4xl h-[calc(100vh-110px)] bg-white shadow rounded-xl p-6 flex flex-col justify-between overflow-hidden">
          {/* 메시지 출력 영역 */}
          <div className="overflow-y-auto hide-scrollbar flex-1 mb-4 flex flex-col gap-3 pr-1">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                } transition-all duration-500 ease-in-out`}
              >
                <div
                  className={`relative px-4 py-2 max-w-xl text-sm break-words shadow-md animate-fadeIn
                    ${msg.type === "user"
                      ? "bg-lime-200/90 text-black rounded-br-none rounded-3xl"
                      : "bg-emerald-100/90 text-black rounded-bl-none rounded-3xl"
                    }`}
                >
                  {msg.type === "bot" ? "🤖 " : "🙋‍♂️ "}
                  {msg.text}
                  <div
                    className={`
                      absolute bottom-0 w-3 h-3 
                      ${msg.type === "user"
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

          {/* 버튼 */}
          {showOptions && (
            <div className="flex flex-wrap gap-2 mb-4 animate-fadeIn">
              {["예약 조회", "예약하기", "예약 취소", "기타"].map((opt) => (
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

          {/* 입력창 */}
          <div className="flex gap-2">
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
