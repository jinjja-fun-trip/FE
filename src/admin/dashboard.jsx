import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem("admin-auth");
    if (!isAuth) {
      alert("로그인이 필요합니다!");
      navigate("/admin/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin-auth"); // 인증 정보 제거
    navigate("/admin/login"); // 로그인 페이지로 이동
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">관리자 대시보드</h1>
        <Button onClick={handleLogout}>로그아웃</Button>
      </div>
      <p>환영합니다! 여기는 관리자 메인 화면입니다.</p>
    </div>
  );
}