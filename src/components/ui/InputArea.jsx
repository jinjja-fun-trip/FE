import React, { useState } from 'react';

export default function InputArea({ onSend, placeholder }) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t flex">
      <input
        className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none"
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
      />
      <button
        onClick={handleSend}
        className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700"
      >
        전송
      </button>
    </div>
  );
}