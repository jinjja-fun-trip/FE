import React, { useState, useEffect } from "react";
import axios from "axios";
import DestinationCard from "./DestinationCard";

export default function RecommendedCards() {
  const [cards, setCards] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://3.138.36.245:8000/recommendations") // or post if needed
      .then((res) => {
        setCards(res.data.cards);
        setMessage(res.data.message);
      });
  }, []);

  return (
    <div className="p-4">
      <p className="text-md font-semibold mb-4">✨ {message}</p>
      <div className="flex flex-wrap gap-6 justify-center">
        {cards.map((card, idx) => (
          <DestinationCard
            key={idx}
            city={card.city}
            score={card.score}
            imageUrl={card.photos[0]}
            description={card.description}
            hashtags={card.hashtags}
          />
        ))}
      </div>
    </div>
  );
}