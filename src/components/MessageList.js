import React from 'react';

// Intent별 컴포넌트 import
import PriceSearch      from './intents/PriceSearch';
import PricePrediction  from './intents/PricePrediction';
import PriceAnalysis    from './intents/PriceAnalysis';
import PolicyQA         from './intents/PolicyQA';
import DestRecommend    from './intents/DestRecommend';
import HotelSummary     from './intents/HotelSummary';
import WeatherSummary   from './intents/WeatherSummary';
import AlertDispatch    from './intents/AlertDispatch';
import GeneralChat      from './intents/GeneralChat';
import IntentFallback   from './intents/IntentFallback';
import SlotClarification from './intents/SlotClarification';

const IntentComponents = {
  PRICE_SEARCH:       PriceSearch,
  PRICE_PREDICTION:   PricePrediction,
  PRICE_ANALYSIS:     PriceAnalysis,
  POLICY_QA:          PolicyQA,
  DEST_RECOMMEND:     DestRecommend,
  HOTEL_SUMMARY:      HotelSummary,
  WEATHER_SUMMARY:    WeatherSummary,
  ALERT_DISPATCH:     AlertDispatch,
  GENERAL_CHAT:       GeneralChat,
  INTENT_FALLBACK:    IntentFallback,
  SLOT_CLARIFICATION: SlotClarification
};

export default function MessageList({ messageList }) {
  return (
    <div className="space-y-4 p-4">
      {messageList.map(({ session_id,message, answer, timestamp }) => {
        const AnswerComponent = IntentComponents[answer.intent] || IntentFallback;
        return (
          <div key={session_id} className="border rounded-lg p-4 bg-gray-50">
            {/* 1) 사용자 질문 */}
            <div className="mb-2 text-right text-blue-600">
              {message}
            </div>

            {/* 2) 봇 답변: intent별 컴포넌트 */}
            <AnswerComponent {...answer.contents} />

            {/* (Optional) 타임스탬프 */}
            <div className="mt-2 text-xs text-gray-400">
              {new Date(timestamp).toLocaleString('ko-KR')}
            </div>
          </div>
        );
      })}
    </div>
  );
}
