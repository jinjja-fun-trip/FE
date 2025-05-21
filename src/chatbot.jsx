import { useParams } from 'react-router-dom';

import NavBar from './components/NavBar';
import InputArea from './components/InputArea';
import MessageList from './components/MessageList';

import useMessage from './hooks/useMessage';

export default function ChatPage() {
	const { id: sessionId } = useParams();
	const { messageList, addMessage } = useMessage(sessionId);

	return (
		<div className='flex flex-col w-full h-screen min-w-[1000px]'>
			<NavBar />
			<div className='flex-1 overflow-y-auto'>
				<MessageList messageList={messageList} userId={10} />
			</div>
			<InputArea onSend={addMessage} placeholder='메시지를 입력하세요...' />
		</div>
	);
}
