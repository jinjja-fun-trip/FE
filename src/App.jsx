// App.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatBot from "./chatbot";
import RecommendedCards from "./components/ui/RecommendedCards";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("user-auth");
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);



  return (
    <main className="h-screen w-screen bg-[#f8f9fb] text-foreground flex">
      <ChatBot />
    </main>
  );

}

export default App;


 