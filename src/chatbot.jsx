// src/pages/ChatPage.jsx
import { useParams } from 'react-router-dom';
import InputArea   from '@/components/ui/InputArea';
import MessageList from '@/components/MessageList';
import FlightsModule from '@/components/Flights/FlightModule';
import useMessage  from '@/hooks/useMessage';

export default function ChatPage() {
  const { id: sessionId } = useParams();
  const { messageList, addMessage } = useMessage(sessionId);

  return (
    <div className="flex flex-col w-full h-screen min-w-[1000px]">

      <div className="flex-1 overflow-y-auto">
        <MessageList messageList={messageList} userId={10} />
      </div>

      {/* ── 항공권 관련 모듈 ── */}
      <FlightsModule />

      <InputArea
        onSend={addMessage}
        placeholder="메시지를 입력하세요..."
      />
    </div>
  );
}
