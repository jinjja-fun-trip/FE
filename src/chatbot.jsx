import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import NavBar from 'components/NavBar';
import InputArea from 'components/InputArea';
import MessageList from 'components/MessageList';

import useMessage from '@hooks/useMessage';
import UserContext from 'src/contexts/userContext';

export default function ChatPage() {
  const { id: sessionId } = useParams();
  const currentUser = useContext(UserContext);
  const { messageList, addMessage } = useMessage(sessionId);

  if (!currentUser) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex-1 overflow-y-auto">
        <MessageList
          messageList={messageList}
          userId={currentUser.id}
        />
      </div>
      <InputArea
        onSend={addMessage}
        placeholder="메시지를 입력하세요..."
      />
    </div>
  );
}
