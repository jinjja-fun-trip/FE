import AlertComposer from './AlertDispatch';

export default function IntentAlertDispatch({ contents }) {
  console.log("✅ 받은 contents:", contents); // 👈 로그 찍어보기

  const payload = contents?.payload;
  const email = contents?.emailId;
  const userIdStr = contents?.userId;

  if (!payload) {
    return <p className="p-4 text-sm text-red-500">❌ 가격 알림 정보가 제공되지 않았습니다.</p>;
  }

  const parsedUserId = parseInt(userIdStr, 10); // 문자열일 수 있으므로 숫자로 변환

  return (
    <AlertComposer
        userId={isNaN(parsedUserId) ? 0 : parsedUserId}
        defaultPayload={{
            email: email,
            origin: payload.origin,
            destination: payload.dest, // ✅ 여기!
            departure_date: payload.departure_date,
            price_threshold: payload.price_threshold,
            selling_price: payload.selling_price,
        }}
        onClose={() => {}}
    />
  );
}