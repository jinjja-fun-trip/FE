// src/App.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatBot from "./chatbot";
import { Button } from "@/components/ui/button";

function App() {
  const navigate = useNavigate();

  // 로그인 안 한 경우 차단
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("user-auth");
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user-auth");
    navigate("/");
  };

  return (
    <main className="h-screen w-screen bg-background text-foreground flex flex-col">
      {/* 상단바 */}
      <div className="flex justify-between items-center px-6 py-4 bg-blue-100 border-b">
        <h1 className="text-xl font-bold">챗봇 예약 서비스</h1>
        <Button variant="outline" onClick={handleLogout}>
          로그아웃
        </Button>
      </div>

      {/* 챗봇 영역 */}
      <div className="flex-1 overflow-y-auto">
        <ChatBot />
      </div>
    </main>
  );
}

export default App;