// src/ChatBot.jsx
import React, { useState } from "react";

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showOptions, setShowOptions] = useState(true); // 버튼 보여줄지 여부

  // 버튼 클릭 시
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
    setShowOptions(false); // 버튼 숨기기
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { type: "user", text: input }];
    setMessages(newMessages);

    // 백엔드 API 호출
    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();

    setMessages([...newMessages, { type: "bot", text: data.reply }]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="h-96 overflow-y-auto border rounded p-4 bg-white shadow space-y-2">
        {/* 메시지 출력 */}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 p-2 rounded-lg w-fit max-w-xs text-sm ${
              msg.type === "user" ? "ml-auto bg-blue-100" : "mr-auto bg-gray-100"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {/* 옵션 버튼 표시 */}
        {showOptions && (
          <div className="flex flex-wrap gap-2 mt-2">
            {["예약 조회", "예약하기", "예약 취소", "기타"].map((opt) => (
              <button
                key={opt}
                onClick={() => handleOptionClick(opt)}
                className="bg-blue-200 text-sm px-3 py-1 rounded hover:bg-blue-300 transition"
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 입력창 */}
      <div className="flex mt-4">
        <input
          className="flex-1 border p-2 rounded-l focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="메시지를 입력하세요"
        />
        <button
          className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600"
          onClick={sendMessage}
        >
          전송
        </button>
      </div>
    </div>
  );
}

export default ChatBot;