import AlertComposer from './AlertDispatch';

export default function IntentAlertDispatch({ contents }) {
  //console.log("✅ 받은 contents:", contents); // 👈 로그 찍어보기

  const payload = contents?.payload;

  // ✅ 로컬스토리지에서 로그인 사용자 정보 직접 가져오기
  const user = JSON.parse(localStorage.getItem("user-auth"));
  const userId = user?.id ?? 0;
  const email = user?.email ?? "unknown@example.com"; // fallback 이메일

  if (!payload) {
    return <p className="p-4 text-sm text-red-500">❌ 가격 알림 정보가 제공되지 않았습니다.</p>;
  }
  const fixedSellingPrice =
  payload.dest === "KIX"
    ? 37800
    : payload.dest === "KUL"
    ? 167800
    : payload.selling_price;
  return (
    <AlertComposer
        userId={userId}
        defaultPayload={{
            email: email,
            origin: payload.origin,             // 임시 테스트용
            destination: payload.dest,
            departure_date: payload.departure_date,
            price_threshold: payload.price_threshold,
            selling_price: fixedSellingPrice,
        }}
        onClose={() => {}}
    />
  );
}