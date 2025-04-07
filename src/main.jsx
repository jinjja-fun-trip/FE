// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";

// 어드민 페이지들
import AdminLogin from "./admin/login";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/dashboard";
import Flights from "./admin/flights";
import Hotels from "./admin/hotels";
import Reservations from "./admin/reservations";
import ChatbotLogs from "./admin/chatbot-logs";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* 사용자용 */}
        <Route path="/" element={<App />} />

        {/* 어드민 로그인 */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* 어드민 페이지들 - 공통 레이아웃 포함 */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="flights" element={<Flights />} />
          <Route path="hotels" element={<Hotels />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="chatbot-logs" element={<ChatbotLogs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);