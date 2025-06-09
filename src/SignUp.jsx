import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function UserRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await fetch("http://3.145.175.131/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password: pw }),
      });

      const data = await res.json(); // ✅ 먼저 JSON 파싱

      if (!res.ok) {
        console.error("⚠️ 백엔드 에러 응답:", data);
        throw new Error(data.detail || "회원가입 실패");
      }

      console.log("✅ 회원가입 완료:", data);
      alert(`${data.name}님 회원가입 완료!`);
      navigate("/login");
    } catch (err) {
      console.error("❌ 프론트 처리 에러:", err.message);
      setError("❌ " + err.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[400px] shadow-xl">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-bold text-center">회원가입</h2>
          <Input
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
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
          <Button className="w-full bg-sky-500 hover:bg-sky-600" onClick={handleRegister}>
            회원가입
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}