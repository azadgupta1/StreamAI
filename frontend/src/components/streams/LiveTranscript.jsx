// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";

// const sampleText =
//   "Welcome to the StreamAI! This is a live transcript example. Enjoy watching!";

// const LiveTranscript = () => {
//   const [displayedText, setDisplayedText] = useState("");
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setDisplayedText(sampleText.slice(0, index + 1));
//       setIndex((prev) => (prev + 1 > sampleText.length ? 0 : prev + 1));
//     }, 100); // typing speed in ms

//     return () => clearInterval(interval);
//   }, [index]);

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="bg-gray-950 text-white p-4 rounded-lg shadow-md w-[500px] font-mono"
//     >
//       {displayedText}
//       <span className="animate-pulse">|</span>
//     </motion.div>
//   );
// };

// export default LiveTranscript;

/* ──────────────────────────────────────────────
   LiveTranscript.jsx
────────────────────────────────────────────── */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaMicrophone } from "react-icons/fa";

const sampleText =
  "Welcome to StreamAI! This is a live transcript example. The AI is listening and transcribing everything in real time. Enjoy watching!";

export const LiveTranscript = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedText(sampleText.slice(0, index + 1));
      setIndex((prev) => (prev + 1 > sampleText.length ? 0 : prev + 1));
    }, 80);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-3 h-full"
    >
      <div className="flex items-center gap-2 text-[#5af04f]">
        <span className="w-2 h-2 rounded-full bg-[#5af04f] animate-pulse shadow-[0_0_6px_#5af04f]" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
          Live Transcript
        </span>
        <FaMicrophone size={10} className="text-[#5af04f] ml-auto" />
      </div>

      <div className="flex-1 bg-gray-900 border border-gray-800 rounded-xl p-4 font-mono text-sm text-gray-300 leading-relaxed min-h-[120px]">
        {displayedText}
        <span className="inline-block w-0.5 h-4 bg-[#5af04f] ml-0.5 animate-pulse align-middle" />
      </div>
    </motion.div>
  );
};

export default LiveTranscript;
