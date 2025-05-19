// components/BotMessage.jsx

export default function BotMessage({ children }) {
    return (
      <div className="flex justify-start">
        <div className="relative px-4 py-2 max-w-xl text-sm break-words shadow-md bg-[#E9E9EB] text-black rounded-bl-none rounded-3xl animate-fadeIn">
          {children}
          {/* 말풍선 꼬리 */}
          <div
            className="absolute bottom-0 left-0 w-3 h-3 bg-[#E9E9EB] rotate-45 translate-y-1/2"
            style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
          />
        </div>
      </div>
    );
  }