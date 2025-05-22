// src/components/intents/GeneralChat.jsx
import React from "react";

export default function GeneralChat({ message }) {
  return (
    <div className="self-start max-w-lg bg-gray-100 text-gray-900 p-3 rounded-xl shadow-md text-sm">
      {message}
    </div>
  );
}