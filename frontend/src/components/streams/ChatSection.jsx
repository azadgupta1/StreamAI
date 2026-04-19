import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import ChatInput from "./ChatInput";
import LiveTranscript from "./LiveTranscript";
import LiveTimestamp from "./LiveTimestamp";
import Summary from "./Summary";
import Analysis from "./Analysis";
import { axiosInstance } from "../../lib/axios";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const socket = io(import.meta.env.VITE_SOCKET_URL, {
  withCredentials: true,
});

const tabs = [
  "Comments",
  "Live Transcript",
  "Live Timestamps",
  "Summary",
  "Analysis",
];

const ChatSection = ({ streamId, userId, username, viewerCount, setViewerCount, videoRef }) => {
  const [activeTab, setActiveTab] = useState("Comments");
  const [chats, setChats] = useState([]);
  const chatContainerRef = useRef(null);

  /* ─── Load previous chats — functionality untouched ─── */
  useEffect(() => {
    if (!streamId) return;
    const loadChats = async () => {
      try {
        const res = await axiosInstance.get(`/chat/stream/${streamId}`);
        setChats(res.data);
      } catch (err) {
        console.error("Failed to load chats", err);
      }
    };
    loadChats();
  }, [streamId]);

  useEffect(() => {
    if (!streamId) return;
    socket.emit("join_stream", streamId);

    socket.on("new_message", (data) => setChats((prev) => [...prev, data]));
    socket.on("message_error", (msg) => {
      toast.error(msg);
      setTimeout(() => {}, 3000);
    });
    socket.on("viewer_count", (count) => setViewerCount(count));

    return () => {
      socket.off("new_message");
      socket.off("viewer_count");
      socket.off("message_error");
    };
  }, [streamId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  const addChat = (message) => {
    if (!message.trim()) return;
    socket.emit("send_message", {
      stream_id: streamId,
      user_id: userId,
      username,
      message,
    });
  };

  const getUserColor = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 65%, 62%)`;
  };

  return (
    <div className="flex flex-col h-full bg-gray-950 overflow-hidden">
      {/* ── Tab bar ── */}
      <div className="flex items-center gap-0 border-b border-gray-800 bg-gray-950 overflow-x-auto scrollbar-none shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              relative cursor-pointer px-3 py-3 text-xs font-semibold whitespace-nowrap
              tracking-wide transition-all duration-200 select-none shrink-0
              ${
                activeTab === tab
                  ? "text-[#5af04f]"
                  : "text-gray-500 hover:text-gray-300"
              }
            `}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#5af04f] rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* ── Content ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
          className="flex-1 flex flex-col overflow-hidden"
        >
          {activeTab === "Comments" && (
            <div className="flex flex-col h-full">
              {/* Messages */}
              <div
                ref={chatContainerRef}
                className="
                  flex-1 overflow-y-auto px-3 py-3 space-y-1.5
                  scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent
                "
              >
                {chats.length === 0 && (
                  <p className="text-center text-gray-700 text-xs mt-8 select-none">
                    No messages yet. Say something!
                  </p>
                )}
                {chats.map((c, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.18 }}
                    className="flex gap-1.5 text-md leading-snug group"
                  >
                    <span
                      style={{ color: getUserColor(c.username) }}
                      className="font-bold shrink-0 pt-[1px] hover:underline cursor-pointer"
                    >
                      {c.username}:
                    </span>
                    <span className="text-gray-300 break-all">
                      {c.message}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Input */}
              <div className="shrink-0 border-t border-gray-800/80 p-2.5 bg-gray-950">
                <ChatInput addChat={addChat} />
              </div>
            </div>
          )}

        {activeTab === "Live Transcript" && (
          <div className="flex-1 overflow-y-auto p-4 text-gray-400">
            <LiveTranscript socket={socket} streamId={streamId} videoRef={videoRef} />
          </div>
        )}

          {activeTab === "Live Timestamps" && (
            <div className="flex-1 overflow-y-auto p-3 text-gray-400">
              <LiveTimestamp />
            </div>
          )}

          {activeTab === "Summary" && (
            <div className="flex-1 overflow-y-auto p-3 text-gray-400">
              <Summary socket={socket} streamId={streamId} />
            </div>
          )}

          {activeTab === "Analysis" && (
            <div className="flex-1 overflow-y-auto p-3 text-gray-400">
              <Analysis />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ChatSection;

// import React, { useState, useEffect, useRef } from "react";
// import { io } from "socket.io-client";
// import ChatInput from "./ChatInput";
// import LiveTranscript from "./LiveTranscript";
// import LiveTimestamp from "./LiveTimestamp";
// import Summary from "./Summary";
// import Analysis from "./Analysis";
// import { axiosInstance } from "../../lib/axios";
// import { motion } from "framer-motion";
// import toast from "react-hot-toast";

// const socket = io(import.meta.env.VITE_SOCKET_URL, {
//   withCredentials: true,
// });

// const tabs = [
//   "Comments",
//   "Live Transcript",
//   "Live Timestamps",
//   "Summary",
//   "Analysis",
// ];

// const ChatSection = ({ streamId, userId, username, viewerCount, setViewerCount }) => {
//   const [activeTab, setActiveTab] = useState("Comments");
//   const [chats, setChats] = useState([]);
//   // const [viewerCount, setViewerCount] = useState(0);

//   const chatContainerRef = useRef(null);

//   /* ---------------- Load Previous Chats ---------------- */
//   useEffect(() => {
//     if (!streamId) return;

//     const loadChats = async () => {
//       try {
//         const res = await axiosInstance.get(`/chat/stream/${streamId}`);
//         setChats(res.data);
//       } catch (err) {
//         console.error("Failed to load chats", err);
//       }
//     };

//     loadChats();
//   }, [streamId]);

//   useEffect(() => {
//     if (!streamId) return;

//     socket.emit("join_stream", streamId);

//     socket.on("new_message", (data) => {
//       setChats((prev) => [...prev, data]);
//     });

//     socket.on("message_error", (msg) => {
//       toast.error(msg);

//       setTimeout(() => {
//         setErrorMessage("");
//       }, 3000);
//     });

//     socket.on("viewer_count", (count) => {
//       setViewerCount(count);
//     });

//     return () => {
//       socket.off("new_message");
//       socket.off("viewer_count");
//       socket.off("message_error");
//     };
//   }, [streamId]);

//   /* ---------------- Auto Scroll (INNER ONLY) ---------------- */
//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop =
//         chatContainerRef.current.scrollHeight;
//     }
//   }, [chats]);

//   const addChat = (message) => {
//     if (!message.trim()) return;

//     socket.emit("send_message", {
//       stream_id: streamId,
//       user_id: userId,
//       username: username,
//       message,
//     });
//   };

//   /* ---------------- Username Color Generator ---------------- */
//   const getUserColor = (name) => {
//     let hash = 0;
//     for (let i = 0; i < name.length; i++) {
//       hash = name.charCodeAt(i) + ((hash << 5) - hash);
//     }
//     const hue = Math.abs(hash) % 360;
//     return `hsl(${hue}, 70%, 60%)`;
//   };

//   return (
//     <div className="flex flex-col h-full lg:h-full bg-[#0f0f0f] border border-gray-800 shadow-xl overflow-hidden">
//       <div className="flex gap-6 px-4 pt-3 border-b border-gray-800 bg-[#141414] overflow-x-auto">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             className={`pb-2 text-sm whitespace-nowrap transition-all ${
//               activeTab === tab
//                 ? "text-green-400 border-b-2 border-green-400"
//                 : "text-gray-500 hover:text-gray-300"
//             }`}
//             onClick={() => setActiveTab(tab)}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* ---------------- Content ---------------- */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {activeTab === "Comments" && (
//           <div className="flex flex-col h-full">

//             {/* Messages */}
//             <div
//               ref={chatContainerRef}
//               className="flex-1 overflow-y-auto px-4 py-3 space-y-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
//             >
//               {chats.map((c, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 5 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.2 }}
//                   className="text-sm break-words"
//                 >
//                   <span
//                     style={{ color: getUserColor(c.username) }}
//                     className="font-semibold mr-1"
//                   >
//                     {c.username}
//                   </span>
//                   <span className="text-gray-300">{c.message}</span>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Input */}
//             <div className="border-t border-gray-800 p-3 bg-[#141414]">
//               <ChatInput addChat={addChat} />
//             </div>
//           </div>
//         )}

//         {activeTab === "Live Transcript" && (
//           <div className="flex-1 overflow-y-auto p-4 text-gray-400">
//             <LiveTranscript />
//           </div>
//         )}

//         {activeTab === "Live Timestamps" && (
//           <div className="flex-1 overflow-y-auto p-4 text-gray-400">
//             <LiveTimestamp />
//           </div>
//         )}

//         {activeTab === "Summary" && (
//           <div className="flex-1 overflow-y-auto p-4 text-gray-400">
//             <Summary />
//           </div>
//         )}

//         {activeTab === "Analysis" && (
//           <div className="flex-1 overflow-y-auto p-4 text-gray-400">
//             <Analysis />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatSection;

// import React, { useState, useEffect, useRef, use } from "react";
// import { io } from "socket.io-client";
// import ChatInput from "./ChatInput";
// import LiveTranscript from "./LiveTranscript";
// import LiveTimestamp from "./LiveTimestamp";
// import Summary from "./Summary";
// import Analysis from "./Analysis";
// import { axiosInstance } from "../../lib/axios";
// import { motion } from "framer-motion";

// const socket = io(import.meta.env.VITE_SOCKET_URL, {
//   withCredentials: true,
// });

// const tabs = [
//   "Comments",
//   "Live Transcript",
//   "Live Timestamps",
//   "Summary",
//   "Analysis",
// ];

// const ChatSection = ({ streamId, userId, username }) => {
//   const [activeTab, setActiveTab] = useState("Comments");
//   const [chats, setChats] = useState([]);

//   const [viewerCount, setViewerCount] = useState(0);
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     if (!streamId) return;

//     console.log("Loading chats for stream:", streamId);
//     const loadChats = async () => {
//       const res = await axiosInstance.get(`/chat/stream/${streamId}`);
//       setChats(res.data);
//     };

//     loadChats();
//   }, [streamId]);
//   // Join stream + listeners
//   useEffect(() => {
//     if (!streamId) return;

//     // Join correct room (backend expects only stream_id)
//     socket.emit("join_stream", streamId);

//     // Receive new message
//     socket.on("new_message", (data) => {
//       setChats((prev) => [...prev, data]);
//     });

//     // Receive viewer count
//     socket.on("viewer_count", (count) => {
//       setViewerCount(count);
//     });

//     return () => {
//       socket.off("new_message");
//       socket.off("viewer_count");
//     };
//   }, [streamId]);

//   // Auto scroll
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chats]);

//   const addChat = (message) => {
//     if (!message.trim()) return;

//     socket.emit("send_message", {
//       stream_id: streamId,
//       user_id: userId,
//       username: username,
//       message,
//     });
//   };

//   const getUserColor = (username) => {
//     let hash = 0;
//     for (let i = 0; i < username.length; i++) {
//       hash = username.charCodeAt(i) + ((hash << 5) - hash);
//     }

//     const hue = Math.abs(hash) % 360;
//     return `hsl(${hue}, 70%, 60%)`;
//   };

//   return (
//     <div className="mt-3 p-3 rounded-lg shadow">

//       {/* Tabs */}
//       <div className="flex gap-4 border-b-2 border-red-900 mb-4">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             className={`pb-2 font-medium cursor-pointer ${activeTab === tab
//               ? "text-red-500 border-b-2 border-red-500"
//               : "text-gray-500"
//               }`}
//             onClick={() => setActiveTab(tab)}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Tab Content */}
//       <div>
//         {activeTab === "Comments" && (
//           <div>

//             {/* Viewer Count */}
//             <div className="mb-2 text-sm text-gray-600">
//               👀 {viewerCount} watching
//             </div>

//             {/* Messages */}
//             <div className="mt-2 flex flex-col gap-2 max-h-96 overflow-y-auto">
//               {chats.map((c) => (
//                 <div key={c.id} className="rounded shadow-sm">
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3 }}
//                     className="bg-black/20 text-white rounded-lg shadow-md max-w-xl">
//                     <p className="text-gray-200">
//                       <span
//                         style={{ color: getUserColor(c.username) }}
//                         className="font-semibold"
//                       >
//                         {c.username}:
//                       </span>{" "}
//                       {c.message}
//                     </p>

//                   </motion.div>
//                 </div>
//               ))}
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Input */}
//             <ChatInput addChat={addChat} />
//           </div>
//         )}

//         {activeTab === "Live Transcript" && (
//           <div className="p-4 text-gray-700">
//             <LiveTranscript />
//           </div>
//         )}

//         {activeTab === "Live Timestamps" && (
//           <div className="p-4 text-gray-700">
//             <LiveTimestamp />
//           </div>
//         )}

//         {activeTab === "Summary" && (
//           <div className="p-4 text-gray-700">
//             <Summary />
//           </div>
//         )}

//         {activeTab === "Analysis" && (
//           <div className="p-4 text-gray-700">
//             <Analysis />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatSection;
