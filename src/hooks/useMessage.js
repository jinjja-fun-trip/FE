import { useState, useEffect } from 'react';

export default function useMessage(sessionId, userId) {
	const [messageList, setMessageList] = useState([]);

	// 1) 초기 로드: chat list 불러오기
	useEffect(() => {
		fetch(`https://bookie-travel.xyz/chat/messages/?user_id=${userId}`,
            {method: 'GET', headers: { 'Content-Type': 'application/json' }}
        )
			.then((res) => res.json())
			.then((data) => {
				console.log("📥 전체 메시지 응답 확인:", data.messages.map(m => m.session_id));
				const sorted = (data.messages ?? []).sort((a, b) => a.session_id - b.session_id);
				setMessageList(sorted);
			})
			.catch(console.error);
	}, [sessionId, userId]);

	// 2) 새 메시지 추가할 때: POST + 다시 정렬
	function addMessage(text) {
			// 1. 사용자 메시지와 로딩 메시지 추가
		const userMessage = {
			session_id: Date.now(),  // 임시 키 (서버 응답 오면 대체됨)
			message: text,
			answer: null,
			timestamp: new Date().toISOString(),
			loading: true,  // ✅ 로딩 표시용
		};
		setMessageList(prev => [...prev, userMessage]);
		fetch('https://bookie-travel.xyz/chat/message', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ user_id: userId, message: text }),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("🔍 백엔드 응답 확인:", data);
				const sorted = (data.messages ?? []).sort((a, b) => a.session_id - b.session_id);
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