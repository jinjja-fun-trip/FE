function makeBookingUrl(provider, { origin, destination, departureDate, returnDate }) {
        const depK = departureDate;
        const rtnK = returnDate || departureDate;
        return `https://www.kayak.co.kr/flights/${origin}-${destination}/${depK}/${rtnK}?sort=bestflight_a`;


  }

  // 사용 예
  const flight = {
    origin: "ICN",
    destination: "LAX",
    departureDate: "2025-06-15",
    returnDate: "2025-06-22"
  };
  console.log(makeBookingUrl('google', flight));
  console.log(makeBookingUrl('skyscanner', flight));
  console.log(makeBookingUrl('kayak', flight));
