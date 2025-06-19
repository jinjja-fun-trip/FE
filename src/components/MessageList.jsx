import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Ellipsis } from "lucide-react";

// Intent별 컴포넌트 import
import PriceSearch from './intents/PriceSearch';
import DestRecommend from './intents/DestRecommend';
import IntentFallback from './intents/IntentFallback';
import PolicyQA from './intents/PolicyQA';
import AlertComposer from './intents/AlertDispatch';
import IntentAlertDispatch from './intents/IntentAlertDispatch';
import GeneralChat from './intents/GeneralChat';
import PriceTrendSection from './intents/PriceTrendSection';
import WeatherSummary from './intents/WeatherSummary';
import CheapestDate from './intents/CheapestDate';
import BotMessage from '@/components//BotMessage';
/*
import PricePrediction  from './intents/PricePrediction';
import PriceAnalysis    from './intents/PriceAnalysis';
import PolicyQA         from './intents/PolicyQA';

import HotelSummary     from './intents/HotelSummary';
import WeatherSummary   from './intents/WeatherSummary';
import AlertDispatch    from './intents/AlertDispatch';
import GeneralChat      from './intents/GeneralChat';
import IntentFallback   from './intents/IntentFallback';
import SlotClarification from './intents/SlotClarification';*/



const IntentComponents = {
	PRICE_SEARCH: PriceSearch,
	DEST_RECOMMEND: DestRecommend,
	POLICY_QA: PolicyQA,
	ALERT_DISPATCH: IntentAlertDispatch,
	GENERAL_CHAT: GeneralChat,
	INTENT_FALLBACK: IntentFallback,
	PRICE_ANALYSIS: PriceTrendSection,
	WEATHER_SUMMARY: WeatherSummary,
	CHEAPEST_DATE: CheapestDate,
	
	
	/* PRICE_PREDICTION:   PricePrediction,
  PRICE_ANALYSIS:     PriceAnalysis,
  POLICY_QA:          PolicyQA,
  DEST_RECOMMEND:     DestRecommend,
  HOTEL_SUMMARY:      HotelSummary,
  WEATHER_SUMMARY:    WeatherSummary,
  ALERT_DISPATCH:     AlertDispatch,
  GENERAL_CHAT:       GeneralChat,
  INTENT_FALLBACK:    IntentFallback,
  SLOT_CLARIFICATION: SlotClarification*/
};

function LoadingBubble() {
	return (
	  <div className="flex items-center space-x-1">
		<Ellipsis className="w-6 h-6 text-gray-500 animate-pulse" />
		<span className="text-sm text-gray-500"></span>
	  </div>
	);
  }

  export default function MessageList({ messageList }) {
	const messageEndRef = useRef(null);
	const [todayDate, setTodayDate] = useState("");

	// ✅ 컴포넌트 첫 렌더링 시 오늘 날짜 한 번만 계산
	useEffect(() => {
	  const today = new Date().toLocaleDateString('ko-KR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		weekday: 'short',
	  });
	  setTodayDate(today);
	}, []);

	// ✅ 메시지 업데이트 시 자동 스크롤
	useEffect(() => {
	  if (messageEndRef.current) {
		messageEndRef.current.scrollIntoView({ behavior: 'auto' }); // 또는 'smooth'
	  }
	}, [messageList]);
  
	return (
	  <div className="flex flex-col p-5 gap-6 overflow-y-auto h-[calc(100vh-160px)]"> {/* height 조절 필요 시 이 값을 수정 */}
		{messageList.map(({ session_id, message, answer, timestamp, loading }) => {
		    {/* ✅ 오늘 날짜 한 번만 출력 */}
			<div className="flex justify-center">
				<span className="text-sm text-gray-400">{todayDate}</span>
			</div>
  
		  // ✅ 응답 컴포넌트 결정
		  let AnswerComponent = null;
		  if (!answer || loading) {
			AnswerComponent = () => <LoadingBubble />;
		  } else {
			const IntentComponent = IntentComponents[answer.intent] || IntentFallback;
			AnswerComponent = () => {
				if (answer.intent === 'ALERT_DISPATCH') {
				  return <IntentComponent contents={answer.contents} />; // ✅ 특별 처리
				} else {
				  return <IntentComponent {...answer.contents} />; // ✅ 기존 방식 유지
				}
			  };
		  }
  
		  return (
			<div key={session_id} className="flex flex-col gap-2">
			  {/* 🕒 타임스탬프 */}
			  <div className="flex justify-center">
				<span className="text-xs text-gray-400">{time}</span>
			  </div>
  
			  {/* 🙋 사용자 메시지 */}
			  <div className="flex justify-end">
				<div className="relative px-4 py-2 max-w-xl text-sm break-words shadow-md animate-fadeIn bg-[#057DFF] text-white rounded-br-none rounded-3xl">
				  {message}
				  <div
					className="absolute bottom-0 right-0 w-3 h-3 bg-[#057DFF] rotate-45 translate-y-1/2"
					style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
				  />
				</div>
			  </div>
  
			  {/* 🤖 챗봇 응답 */}
			  <div className="flex justify-start">
				<div className="relative px-4 py-2 max-w-xl text-sm break-words shadow-md animate-fadeIn bg-[#E9E9EB] text-black rounded-bl-none rounded-3xl">
				  <AnswerComponent />
				  <div
					className="absolute bottom-0 left-0 w-3 h-3 bg-[#E9E9EB] rotate-45 translate-y-1/2"
					style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
				  />
				</div>
			  </div>
			</div>
		  );
		})}
  
		{/* ✅ 이 부분이 제일 중요: 스크롤 대상 위치 */}
		<div ref={messageEndRef} />
	  </div>
	);
  }