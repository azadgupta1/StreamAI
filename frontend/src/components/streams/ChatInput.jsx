import React, { useState } from "react";

const ChatInput = ({ addChat }) => {
  const [chat, setChat] = useState("");

  const handleAdd = () => {
    if (!chat.trim()) return;
    addChat(chat);
    setChat("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <input
        type="text"
        value={chat}
        onChange={(e) => setChat(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Send a message..."
        className="flex-1 bg-[#1a1a1a] text-white placeholder-gray-500 
                   px-4 py-2 rounded-full 
                   border border-gray-700 
                   outline-none 
                   focus:border-green-500 
                   focus:ring-1 focus:ring-green-500
                   transition-all duration-200 text-sm"
      />

      <button
        onClick={handleAdd}
        disabled={!chat.trim()}
        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200
          ${
            chat.trim()
              ? "bg-green-500 hover:bg-green-600 text-black"
              : "bg-gray-800 text-gray-500 cursor-not-allowed"
          }`}
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
