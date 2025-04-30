//어드민용 로그인 화면
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminLogin() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (id === "admin" && pw === "1234") {
      localStorage.setItem("admin-auth", "true");
      navigate("/admin/dashboard");
    } else {
      setError("아이디 또는 비밀번호가 틀렸습니다.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[400px] shadow-xl">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-bold text-center">관리자 로그인</h2>
          <Input
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button className="w-full" onClick={handleLogin}>
            로그인
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}