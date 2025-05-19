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
    <div className="flex h-screen bg-[#f9fafb] font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white text-sky-800 p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-6">어드민 메뉴</h2>
        <nav className="flex flex-col gap-3">
          {[
            { label: "대시보드", path: "/admin/dashboard" },
            { label: "항공편 관리", path: "/admin/flights" },
            { label: "호텔 관리", path: "/admin/hotels" },
            { label: "예약 내역", path: "/admin/reservations" },
            { label: "챗봇 로그", path: "/admin/chatbot-logs" },
            { label: "정책 관리", path: "/admin/policies" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="bg-sky-100 hover:bg-sky-200 text-sm px-4 py-2 rounded-xl shadow transition duration-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button
          onClick={handleLogout}
          className="mt-6 bg-sky-500 text-white text-sm px-4 py-2 rounded-xl hover:bg-sky-600 transition duration-300 w-full"
        >
          로그아웃
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}