import React from 'react';

// Intent별 컴포넌트 import
import PriceSearch from './intents/PriceSearch';
import DestRecommend from './intents/DestRecommend';
import IntentFallback from './intents/IntentFallback';
import PolicyQA from './intents/PolicyQA';
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
		<div className='flex flex-col p-5 gap-20'>
			{messageList.map(({ session_id, message, answer, timestamp }) => {
				const AnswerComponent =
					IntentComponents[answer.intent] || IntentFallback;
				return (
					<div key={session_id} className='flex flex-col gap-[20px]'>
						{/* 타임스탬프 - 중앙 정렬 */}
						<div className='flex rounded-sm justify-center mt-1'>
							<span className='text-xs text-gray-400'>
								{new Date(timestamp).toLocaleString('ko-KR')}
							</span>
						</div>
						{/* 사용자 메시지 - 왼쪽 정렬 */}
						<div className='flex justify-end'>
							<div className='max-w-3/4 p-3 bg-gray-100 rounded-lg shadow-sm'>
								<p className='font-medium text-gray-800'>{message}</p>
							</div>
						</div>

						{/* 봇 답변 - 오른쪽 정렬 */}
						<div className='flex justify-start'>
							<div className='max-w-[840px]  p-3  bg-blue-50  rounded-lg shadow-sm'>
								<AnswerComponent {...answer.contents} />
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}