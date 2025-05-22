import React, { useState } from 'react';
import { Send } from 'lucide-react';

export default function InputArea({ onSend, placeholder }) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="flex items-center gap-2 px-4 py-4">
      <input
        className="flex-1 bg-gray-50 border border-gray-300 text-sm rounded-full px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder={placeholder}
      />
      <button
        onClick={handleSend}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-sky-500 hover:bg-sky-600 transition-colors group shadow"
        aria-label="전송"
      >
        <Send
          size={18}
          strokeWidth={2}
          className="text-white transform group-hover:translate-x-0.5 transition-transform"
        />
      </button>
    </div>
  );
}