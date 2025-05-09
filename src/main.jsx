// ReactDOM 렌더링 스타트 파일
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';

// 어드민 페이지들
import AdminLogin from "./admin/login";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/dashboard";
import Flights from "./admin/flights";
import Hotels from "./admin/hotels";
import Reservations from "./admin/reservations";
import ChatbotLogs from "./admin/chatbot-logs";
import Policies from "./admin/policies";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* 사용자용 로그인*/}
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<App />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* 어드민 로그인 */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* 어드민 페이지들 - 공통 레이아웃 포함 */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="flights" element={<Flights />} />
          <Route path="hotels" element={<Hotels />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="chatbot-logs" element={<ChatbotLogs />} />
          <Route path="policies" element={<Policies />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);