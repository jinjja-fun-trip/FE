// src/ChatBot.jsx
import React, { useState } from "react";

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { type: "user", text: input }];
    setMessages(newMessages);

    // 백엔드 API 호출 - 나중에 FastAPI와 연결 예정
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
      <div className="h-96 overflow-y-auto border rounded p-4 bg-white shadow">
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
      </div>
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