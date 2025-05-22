import React from 'react';

// Intent별 컴포넌트 import
import PriceSearch from './intents/PriceSearch';
import DestRecommend from './intents/DestRecommend';
import IntentFallback from './intents/IntentFallback';
import PolicyQA from './intents/PolicyQA';
import AlertDispatch from './intents/AlertDispatch';
import GeneralChat from './intents/GeneralChat';
import PriceTrendSection from './intents/PriceTrendSection';
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
	ALERT_DISPATCH: AlertDispatch,
	GENERAL_CHAT: GeneralChat,
	INTENT_FALLBACK: IntentFallback,
	PRICE_ANALYSIS: PriceTrendSection,
	
	
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

export default function MessageList({ messageList }) {
	return (
	  <div className="flex flex-col p-5 gap-6">
		{messageList.map(({ session_id, message, answer, timestamp }) => {
			  console.log("🧪 렌더링 시도:", {
				intent: answer?.intent,
				contents: answer?.contents,
			  });
		  const AnswerComponent = IntentComponents[answer.intent] || IntentFallback;
		  const time = new Date(timestamp).toLocaleString('ko-KR');
  
		  return (
			<div key={session_id} className="flex flex-col gap-2">
			  {/* 🕒 타임스탬프 */}
			  <div className="flex justify-center">
				<span className="text-xs text-gray-400">{time}</span>
			  </div>
  
			  {/* 🙋 사용자 메시지 (오른쪽) */}
			  <div className="flex justify-end">
				<div
				  className={`relative px-4 py-2 max-w-xl text-sm break-words shadow-md animate-fadeIn bg-[#057DFF] text-white rounded-br-none rounded-3xl`}
				>
				  {message}
				  <div
					className={`absolute bottom-0 right-0 w-3 h-3 bg-[#057DFF] rotate-45 translate-y-1/2`}
					style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
				  />
				</div>
			  </div>
  
			  {/* 🤖 봇 응답 (왼쪽) */}
			  <div className="flex justify-start">
				<div
				  className={`relative px-4 py-2 max-w-xl text-sm break-words shadow-md animate-fadeIn bg-[#E9E9EB] text-black rounded-bl-none rounded-3xl`}
				>
				  <AnswerComponent {...answer.contents} />
				  <div
					className={`absolute bottom-0 left-0 w-3 h-3 bg-[#E9E9EB] rotate-45 translate-y-1/2`}
					style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
				  />
				</div>
			  </div>
			</div>
		  );
		})}
	  </div>
	);
  }