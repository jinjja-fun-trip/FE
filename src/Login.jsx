import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://3.145.175.131/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pw }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "로그인 실패");
      }

      const data = await res.json();
      console.log("로그인 성공:", data);

      // 로그인 상태를 로컬에 저장 (예: JWT 토큰)
      localStorage.setItem("user-auth", JSON.stringify(data));
      alert(`${data.name}님 환영합니다!`);
      navigate("/chat");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[400px] shadow-xl">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-bold text-center">로그인</h2>
          <Input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button className="w-full bg-sky-500 hover:bg-sky-600" onClick={handleLogin}>
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