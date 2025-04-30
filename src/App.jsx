// 프로젝트 메인 엔트리(라우팅 처리)
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
      <div className="bg-white shadow-md px-6 h-[64px] flex items-center justify-between border-b">
        <h1 className="text-2xl font-semibold text-sky-600 tracking-tight"> 챗봇 예약 플래너</h1>
        <button
          onClick={handleLogout}
          className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium px-4 py-2 rounded-lg shadow transition"
        >
          로그아웃
        </button>
      </div>

      {/* 챗봇 영역 */}
      <div className="flex-1 overflow-hidden">
        <ChatBot />
      </div>
    </main>
  );
}

export default App;