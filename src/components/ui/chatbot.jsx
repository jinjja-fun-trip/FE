import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "안녕하세요! 무엇을 도와드릴까요?" }
  ])
  const [input, setInput] = useState("")

  const sendMessage = () => {
    if (input.trim() === "") return

    const userMessage = { from: "user", text: input }
    const botReply = { from: "bot", text: `제가 방금 받은 메시지는: ${input}` }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    setTimeout(() => {
      setMessages((prev) => [...prev, botReply])
    }, 600)
  }

  return (
    <div className="flex flex-col h-screen bg-background p-4">
      {/* 채팅 영역 */}
      <Card className="flex-1 overflow-y-auto mb-4 p-4 space-y-2 shadow-sm">
        <CardContent className="p-0">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`rounded-2xl px-4 py-2 max-w-xs break-words shadow-sm ${
                  msg.from === "user"
                    ? "bg-lime-200 text-black"
                    : "bg-green-100 text-black"
                }`}
              >
                {msg.from === "bot" ? "🤖 " : "🙋‍♂️ "}
                {msg.text}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 입력창 */}
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요..."
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage()
          }}
        />
        <Button onClick={sendMessage}>전송</Button>
      </div>
    </div>
  )
}