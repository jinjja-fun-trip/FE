export async function searchFlights(params) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`https://www.bookie-travel.xyz/flights/search?${query}`);
  
    if (!res.ok) {
      const error = await res.text();
      throw new Error(`항공권 조회 실패: ${error}`);
    }
  
    return res.json();
  }