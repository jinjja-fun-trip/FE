import React from "react";

export default function DestinationCard({ city, score, imageUrl, description, hashtags }) {
  return (
    <div className="bg-white border rounded-xl shadow p-4 w-[260px]">
      <img src={imageUrl} alt={city} className="h-36 w-full object-cover rounded-md mb-2" />
      <h3 className="font-bold text-lg">{city}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <div className="mt-2 text-xs text-sky-700 flex flex-wrap gap-1">
        {hashtags.map((tag, i) => (
          <span key={i}>#{tag.replace("#", "")}</span>
        ))}
      </div>
      <div className="text-right text-sm text-green-700 font-semibold mt-2">
        점수: {(score * 100).toFixed(0)}점
      </div>
    </div>
  );
}