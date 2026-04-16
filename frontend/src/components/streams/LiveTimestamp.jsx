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

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaClock } from "react-icons/fa";

const sampleTimestamps = [
  { label: "Welcome to the live stream!", time: "00:01" },
  { label: "Intro and today's agenda", time: "00:05" },
  { label: "Main content begins", time: "00:10" },
  { label: "Special announcement", time: "00:15" },
  { label: "Q&A segment starts", time: "00:20" },
  { label: "Subscriber shoutouts", time: "00:25" },
  { label: "Wrapping up — thanks for watching!", time: "00:30" },
];

const LiveTimestamp = () => {
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setVisible((prev) => [
        ...prev,
        sampleTimestamps[i % sampleTimestamps.length],
      ]);
      i++;
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#5af04f] animate-pulse shadow-[0_0_6px_#5af04f]" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
          Live Timestamps
        </span>
        <FaClock size={10} className="text-[#5af04f] ml-auto" />
      </div>

      <div className="flex flex-col gap-1.5 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800">
        <AnimatePresence>
          {visible.map((ts, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-lg px-3 py-2"
            >
              <span className="text-[#5af04f] font-mono text-[10px] font-bold shrink-0">
                {ts.time}
              </span>
              <span className="text-gray-300 text-xs">{ts.label}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LiveTimestamp;
