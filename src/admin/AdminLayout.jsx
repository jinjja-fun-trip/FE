// src/admin/AdminLayout.jsx
import { useEffect } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function AdminLayout() {
  const navigate = useNavigate();

  // 인증 가드
  useEffect(() => {
    const isAuth = localStorage.getItem("admin-auth");
    if (!isAuth) {
      alert("로그인이 필요합니다.");
      navigate("/admin/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin-auth");
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 space-y-4">
        <h2 className="text-xl font-bold mb-6">어드민 메뉴</h2>
        <nav className="flex flex-col space-y-2">
          <Link to="/admin/dashboard" className="hover:underline">대시보드</Link>
          <Link to="/admin/flights" className="hover:underline">항공편 관리</Link>
          <Link to="/admin/hotels" className="hover:underline">호텔 관리</Link>
          <Link to="/admin/reservations" className="hover:underline">예약 내역</Link>
          <Link to="/admin/chatbot-logs" className="hover:underline">챗봇 로그</Link>
        </nav>
        <Button variant="outline" className="mt-6" onClick={handleLogout}>
          로그아웃
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}