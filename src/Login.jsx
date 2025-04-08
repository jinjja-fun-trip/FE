// src/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function UserLogin() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // localStorage에 저장된 사용자 계정 정보 가져오기
    const storedPw = localStorage.getItem(`user-${id}`);
    if (storedPw && storedPw === pw) {
      localStorage.setItem("user-auth", "true");
      navigate("/chat"); // 로그인 성공 시 챗봇 페이지로 이동
    } else {
      setError("아이디 또는 비밀번호가 틀렸습니다.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[400px] shadow-xl">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-bold text-center">사용자 로그인</h2>
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
          <p className="text-center text-sm text-gray-600 mt-2">
            아직 계정이 없으신가요?{" "}
            <span
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              회원가입
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}