// import React, { useState } from "react";

// const ChatInput = ({ addChat }) => {
//   const [chat, setChat] = useState("");

//   const handleAdd = () => {
//     if (!chat.trim()) return;
//     addChat(chat);
//     setChat("");
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       handleAdd();
//     }
//   };

//   return (
//     <div className="flex items-center gap-2 w-full">
//       <input
//         type="text"
//         value={chat}
//         onChange={(e) => setChat(e.target.value)}
//         onKeyDown={handleKeyDown}
//         placeholder="Send a message..."
//         className="flex-1 bg-[#1a1a1a] text-white placeholder-gray-500 
//                    px-4 py-2 rounded-full 
//                    border border-gray-700 
//                    outline-none 
//                    focus:border-green-500 
//                    focus:ring-1 focus:ring-green-500
//                    transition-all duration-200 text-sm"
//       />

//       <button
//         onClick={handleAdd}
//         disabled={!chat.trim()}
//         className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200
//           ${
//             chat.trim()
//               ? "bg-green-500 hover:bg-green-600 text-black"
//               : "bg-gray-800 text-gray-500 cursor-not-allowed"
//           }`}
//       >
//         Send
//       </button>
//     </div>
//   );
// };

// export default ChatInput;









import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaPaperPlane,
  FaSmile,
  FaGift,
  FaAt,
  FaBolt,
} from "react-icons/fa";

const ChatInput = ({ addChat }) => {
  const [chat, setChat] = useState("");

  const handleAdd = () => {
    if (!chat.trim()) return;
    addChat(chat);
    setChat("");
  };

  const handleKeyDown = (e) => {
    // Shift+Enter → new line
    if (e.key === "Enter" && e.shiftKey) return;

    // Enter → send
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  /* ---------------- Dummy Buttons ---------------- */
  const addEmoji = () => setChat((p) => p + " 😀");
  const addMention = () => setChat((p) => p + " @streamer ");
  const giftSub = () => alert("🎁 Gift feature coming soon!");
  const superChat = () => alert("⚡ SuperChat coming soon!");

  return (
    <div className="relative">

      {/* Glass container */}
      <div
        className="
        flex items-center gap-2
        bg-[#141414]/90 backdrop-blur-md
        border border-gray-800
        rounded-2xl
        px-3 py-2
        shadow-xl
      "
      >
        {/* Left quick actions */}
        <div className="flex items-center gap-2 text-gray-400">

          <button
            onClick={addEmoji}
            className="hover:text-yellow-400 transition text-lg"
            title="Emoji"
          >
            <FaSmile />
          </button>

          <button
            onClick={addMention}
            className="hover:text-blue-400 transition"
            title="Mention"
          >
            <FaAt />
          </button>

          <button
            onClick={giftSub}
            className="hover:text-pink-400 transition"
            title="Gift Sub"
          >
            <FaGift />
          </button>

          <button
            onClick={superChat}
            className="hover:text-green-400 transition"
            title="Super Chat"
          >
            <FaBolt />
          </button>
        </div>

        {/* Input */}
        <textarea
          rows={1}
          value={chat}
          onChange={(e) => setChat(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Say something awesome..."
          className="
            flex-1 resize-none bg-transparent text-white
            outline-none text-sm px-2
            placeholder-gray-500
            max-h-24
          "
        />

        {/* Character counter */}
        <span className="text-xs text-gray-500 pr-2">
          {chat.length}/200
        </span>

        {/* Send button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          onClick={handleAdd}
          disabled={!chat.trim()}
          className={`
            flex items-center justify-center
            w-9 h-9 rounded-full
            transition-all duration-200
            ${
              chat.trim()
                ? "bg-green-500 text-black shadow-lg shadow-green-500/40"
                : "bg-gray-800 text-gray-600"
            }
          `}
        >
          <FaPaperPlane />
        </motion.button>
      </div>
    </div>
  );
};

export default ChatInput;
