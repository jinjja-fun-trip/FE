// src/SignUp.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function SignUp() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = () => {
    if (id === "" || pw === "") {
      setError("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    if (pw !== confirmPw) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 회원 정보 저장 (임시로 localStorage 사용)
    localStorage.setItem(`user-${id}`, pw);
    alert("회원가입이 완료되었습니다!");
    navigate("/"); // 로그인 페이지로 이동
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[400px] shadow-xl">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-bold text-center">회원가입</h2>
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
          <Input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button className="w-full" onClick={handleSignUp}>
            회원가입
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}