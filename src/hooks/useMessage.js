import { useState, useEffect } from 'react';

export default function useMessage(sessionId) {
	const [messageList, setMessageList] = useState([]);
	const userId = 10;

	// 1) 초기 로드: chat list 불러오기
	useEffect(() => {
		fetch(`http://localhost:8000/chat/messages/?user_id=${userId}`,
            {method: 'GET', headers: { 'Content-Type': 'application/json' }}
        )
			.then((res) => res.json())
			.then(({ messages }) => {
				// session_id 오름차순 정렬
				console.log(messages);
				const sorted = messages.sort((a, b) => a.session_id - b.session_id);
				setMessageList(sorted);
			})
			.catch(console.error);
	}, [sessionId, userId]);

	// 2) 새 메시지 추가할 때: POST + 다시 정렬
	function addMessage(text) {
		fetch('http://localhost:8000/chat/message', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ user_id: userId, message: text }),
		})
			.then((res) => res.json())
			.then(({ messages }) => {
				const sorted = messages.sort((a, b) => a.session_id - b.session_id);
				setMessageList(sorted);
			})
			.catch(console.error);
	}

	return {
		messageList,
		addMessage,
		setMessageList,  // ✅ 추가!
	  };
}