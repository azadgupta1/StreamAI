// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const sampleTimestamps = [
//   "[00:01] Welcome to the live stream!",
//   "[00:05] This is a sample timestamp.",
//   "[00:10] Enjoy the content!",
//   "[00:15] Don't forget to subscribe!",
//   "[00:20] Stay tuned for more updates.",
// ];

// const LiveTimestampList = () => {
//   const [visibleTimestamps, setVisibleTimestamps] = useState([]);

//   useEffect(() => {
//     let index = 0;
//     const interval = setInterval(() => {
//       setVisibleTimestamps((prev) => [...prev, sampleTimestamps[index]]);
//       index = (index + 1) % sampleTimestamps.length;
//     }, 2000); // new timestamp every 2 seconds

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="bg-gray-950 text-white p-4 rounded-lg shadow-md max-w-xl h-64 overflow-y-auto flex flex-col gap-2">
//       <AnimatePresence>
//         {visibleTimestamps.map((ts, idx) => (
//           <motion.div
//             key={idx}
//             initial={{ opacity: 0, y: -10, scale: 0.9 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 10, scale: 0.9 }}
//             transition={{ duration: 0.3 }}
//             className="font-mono text-sm bg-gray-900 p-2 rounded shadow-sm"
//           >
//             {ts}
//           </motion.div>
//         ))}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default LiveTimestampList;
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { axiosInstance } from "../../lib/axios";

const LiveTimestamp = ({ socket, streamId, videoRef }) => {
  const [timestamps, setTimestamps] = useState([]);
  const [newId, setNewId] = useState(null); // highlight newest

  // Load existing timestamps for late viewers
  useEffect(() => {
    if (!streamId) return;
    axiosInstance.get(`/timestamps/${streamId}`)
      .then(res => setTimestamps(res.data))
      .catch(() => {});
  }, [streamId]);

  // Listen for new live timestamps
  useEffect(() => {
    if (!socket || !streamId) return;

    const handle = (data) => {
      const entry = { ...data, id: crypto.randomUUID() };
      setTimestamps(prev => [...prev, entry]);
      setNewId(entry.id);
      setTimeout(() => setNewId(null), 2000);
    };

    socket.on("live_timestamp", handle);
    return () => socket.off("live_timestamp", handle);
  }, [socket, streamId]);

  const seekTo = (seconds) => {
    if (videoRef?.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play();
    }
  };

  return (
    <div className="p-4 space-y-2">
      <h3 className="text-white font-semibold text-sm mb-3">Key Moments</h3>

      {!timestamps.length && (
        <p className="text-gray-600 text-sm italic">
          Key moments will appear as the stream progresses...
        </p>
      )}

      <AnimatePresence>
        {timestamps.map((ts, i) => (
          <motion.button
            key={ts.id ?? i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            onClick={() => seekTo(ts.time_seconds)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors
              ${newId === ts.id
                ? "bg-green-900/40 border border-green-500/50"
                : "bg-gray-900 hover:bg-gray-800 border border-transparent"
              }`}
          >
            <span className="text-green-400 font-mono text-xs shrink-0">
              {ts.time_label}
            </span>
            <span className="text-gray-300 text-sm truncate">{ts.label}</span>
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default LiveTimestamp;