// src/lib/chatLogger.js

export async function logMessageToBackend(sessionId, role, message) {
    try {
      const res = await fetch("http://3.138.36.245:8000/chat/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          role,
          message
        })
      });
  
      const data = await res.json();
      console.log("✅ 채팅 로그 저장됨:", data);
    } catch (error) {
      console.error("❌ 채팅 로그 저장 실패:", error);
    }
  }