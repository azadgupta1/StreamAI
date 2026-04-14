// import React from "react";
// import { motion } from "framer-motion";
// import StreamStats from "./StreamStats";

// const VideoSection = ({ videoRef, viewerCount, streamerId  }) => {
//   return (
//     <div className="min-h-screen flex-1 flex flex-col items-center w-full">
//       <div className="w-full border-b border-gray-700">
//         <video
//           ref={videoRef}
//           controls
//           autoPlay
//           playsInline
//           className="w-full shadow-lg"
//         ></video>
//       </div>

//       <StreamStats viewerCount={viewerCount} streamerId={streamerId} />
//     </div>

//   );
// };

// export default VideoSection;

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBroadcastTower } from "react-icons/fa";
import { MdScreenRotation } from "react-icons/md";
import StreamStats from "./StreamStats";
import DonatePanel from "./DonatePanel";

const VideoSection = ({
  videoRef,
  viewerCount,
  streamerId,
  streamerName,
  hlsUrl,
}) => {
  const [isOffline, setIsOffline] = useState(false);
  const [isRotated, setIsRotated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /* ─── Detect mobile ─── */
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* ─── Offline check — functionality untouched ─── */
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch(hlsUrl || "", { method: "HEAD" });
        setIsOffline(res.status === 404);
      } catch (err) {
        console.error("Request failed:", err.message);
      }
    };
    checkStatus();
    const interval = setInterval(checkStatus, 2000);
    return () => clearInterval(interval);
  }, [videoRef]);

  /* ─── Toggle rotate on mobile ─── */
  const handleRotate = () => setIsRotated((prev) => !prev);

  return (
    <>
      {/* ═══════════════════════ NORMAL VIEW ═══════════════════════ */}
      <div
        className={`
          flex flex-col w-full bg-gray-950
          ${isRotated && isMobile ? "hidden" : "flex"}
        `}
      >
        {/* ── Video wrapper ── */}
        <div className="w-full relative group">
          {/* Live pill */}
          {!isOffline && (
            <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm border border-white/10 rounded-md px-2.5 py-1 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-[#5af04f] animate-pulse shadow-[0_0_6px_#5af04f]" />
              <span className="text-[11px] font-bold tracking-widest text-white uppercase">
                Live
              </span>
            </div>
          )}

          {!isOffline ? (
            <video
              ref={videoRef}
              controls
              autoPlay
              playsInline
              className="w-full aspect-video object-cover bg-black block"
            />
          ) : (
            /* ── Offline state ── */
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full aspect-video flex flex-col items-center justify-center bg-gray-950 relative overflow-hidden"
              >
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-radial from-[#7b35d9]/10 via-transparent to-transparent" />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(91,240,79,0.04) 0%, transparent 65%)`,
                  }}
                />

                {/* Grid overlay */}
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: `linear-gradient(#5af04f 1px, transparent 1px), linear-gradient(90deg, #5af04f 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                  }}
                />

                <motion.div
                  animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.9, 0.5] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="mb-5 text-[#5af04f]/60"
                >
                  <FaBroadcastTower size={52} />
                </motion.div>

                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {streamerName || "Streamer"}{" "}
                  <span className="text-gray-500 font-normal">is offline</span>
                </h2>
                <p className="text-gray-600 mt-2 text-sm tracking-wide">
                  Stream will start soon — stay tuned
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#5af04f]/40 to-transparent" />
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* ── Stats bar ── */}
        <div className="w-full">
          <StreamStats viewerCount={viewerCount} streamerId={streamerId} />
        </div>

        {/* ── Donate panel ── */}
        <div className="w-full px-3 pb-3">
          <DonatePanel />
        </div>
      </div>

      {/* ═══════════════════════ ROTATED / LANDSCAPE VIEW (mobile only) ═══════════════════════ */}
      {isRotated && isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          style={{
            transform: "rotate(90deg)",
            transformOrigin: "center center",
            width: "100vh",
            height: "100vw",
            left: "50%",
            top: "50%",
            marginLeft: "-50vh",
            marginTop: "-50vw",
          }}
        >
          {!isOffline ? (
            <video
              ref={videoRef}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-950">
              <FaBroadcastTower size={40} className="text-[#5af04f]/60 mb-3" />
              <p className="text-white font-semibold">
                {streamerName} is offline
              </p>
            </div>
          )}

          {/* Rotate back button */}
          <button
            onClick={handleRotate}
            className="absolute top-4 right-4 cursor-pointer flex items-center gap-1.5 bg-black/70 border border-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-all"
          >
            <MdScreenRotation size={14} />
            Exit
          </button>
        </motion.div>
      )}

      {/* ═══════════════════════ MOBILE ROTATE FAB ═══════════════════════ */}
      {isMobile && !isRotated && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleRotate}
          title="Rotate to landscape"
          className="
            fixed bottom-20 right-4 z-40 cursor-pointer
            w-11 h-11 rounded-full
            bg-gray-900 border border-[#5af04f]/30
            flex items-center justify-center
            shadow-lg shadow-black/50
            hover:border-[#5af04f]/70 hover:bg-[#5af04f]/10
            transition-all duration-200
          "
        >
          <MdScreenRotation size={20} className="text-[#5af04f]" />
        </motion.button>
      )}
    </>
  );
};

export default VideoSection;

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FaBroadcastTower } from "react-icons/fa";
// import { MdScreenRotation } from "react-icons/md";
// import StreamStats from "./StreamStats";

// const VideoSection = ({
//   videoRef,
//   viewerCount,
//   streamerId,
//   streamerName,
//   hlsUrl,
// }) => {
//   const [isOffline, setIsOffline] = useState(false);

//   useEffect(() => {
//     const checkStatus = async () => {
//       try {
//         const res = await fetch(hlsUrl || "", {
//           method: "HEAD",
//         });

//         if (res.status === 404) {
//           setIsOffline(true);
//         } else {
//           setIsOffline(false);
//         }
//       } catch (err) {
//         console.error("Request failed:", err.message);
//       }
//     };

//     checkStatus();
//     const interval = setInterval(checkStatus, 2000);

//     return () => clearInterval(interval);
//   }, [videoRef]);

//   const handleRotate = async () => {
//     try {
//       if (document.documentElement.requestFullscreen) {
//         await document.documentElement.requestFullscreen();
//       }

//       if (screen.orientation?.lock) {
//         await screen.orientation.lock("landscape");
//       }
//     } catch (err) {
//       console.log("Rotate not supported:", err);
//     }
//   };

//   return (
//     <section className="relative w-full h-full bg-[#0E0E10] text-white">
//       <div className="relative w-full overflow-hidden border-b border-white/5 bg-black">
//         {/* Top overlay */}
//         <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-3 sm:px-4 py-3">
//           <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 backdrop-blur-md">
//             <span className="h-2.5 w-2.5 rounded-full bg-[#5af04f] animate-pulse shadow-[0_0_12px_#5af04f]" />
//             <span className="text-[10px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-white/90">
//               Live
//             </span>
//           </div>

//           <button
//             type="button"
//             onClick={handleRotate}
//             className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/90 shadow-lg backdrop-blur-md transition hover:bg-white/10 active:scale-95 cursor-pointer lg:hidden"
//             aria-label="Rotate screen to landscape"
//           >
//             <MdScreenRotation className="text-base" />
//             Rotate
//           </button>
//         </div>

//         {/* Video / offline container */}
//         <div className="relative w-full aspect-video max-h-[calc(100vh-4rem)]">
//           {!isOffline ? (
//             <video
//               ref={videoRef}
//               controls
//               autoPlay
//               playsInline
//               className="h-full w-full bg-black object-cover outline-none"
//             />
//           ) : (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="flex h-[42vh] sm:h-[50vh] md:h-[60vh] items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black px-6 text-center"
//             >
//               <div className="max-w-md">
//                 <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_40px_rgba(90,240,79,0.08)]">
//                   <FaBroadcastTower size={52} className="opacity-80" />
//                 </div>

//                 <h2 className="text-2xl sm:text-3xl font-bold">
//                   {streamerName} is Offline
//                 </h2>

//                 <p className="mt-2 text-sm sm:text-base text-gray-400">
//                   Stream will start soon
//                 </p>
//               </div>
//             </motion.div>
//           )}

//           {/* subtle bottom fade */}
//           <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent" />
//         </div>
//       </div>

//       <StreamStats viewerCount={viewerCount} streamerId={streamerId} />
//     </section>
//   );
// };

// export default VideoSection;

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FaBroadcastTower } from "react-icons/fa";
// import StreamStats from "./StreamStats";
// import DonatePanel from "./DonatePanel";

// const VideoSection = ({ videoRef, viewerCount, streamerId, streamerName, hlsUrl }) => {
//   const [isOffline, setIsOffline] = useState(false);

//   useEffect(() => {
//     const checkStatus = async () => {
//       try {
//         const res = await fetch(hlsUrl || "", {
//           method: "HEAD", // Only get headers (no body)
//         });
//         if (res.status === 404) {
//           setIsOffline(true);
//         }
//         else {
//           setIsOffline(false);
//         }
//       } catch (err) {
//         console.error("Request failed:", err.message);
//       }
//     };
//     checkStatus();

//     const interval = setInterval(checkStatus, 2000);
//     return () => clearInterval(interval);
//   }, [videoRef]);

//   return (
//     <div className="min-h-screen flex-1 flex flex-col items-center w-full bg-gray-900">
//       {/* ================= VIDEO AREA ================= */}
//       <div className="w-full relative border-b border-gray-700">
//         {!isOffline ? (
//           <video
//             ref={videoRef}
//             controls
//             autoPlay
//             playsInline
//             className="w-full shadow-lg"
//           />
//         ) : (
//           /* ================= OFFLINE UI ================= */
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="h-[60vh] flex flex-col items-center justify-center
//                        bg-gradient-to-br from-gray-800 to-gray-900 text-gray-300"
//           >
//             <FaBroadcastTower size={60} className="mb-4 opacity-70" />

//             <h2 className="text-2xl font-semibold">
//               {streamerName} is Offline
//             </h2>

//             <p className="text-gray-400 mt-2">Stream will start soon</p>
//           </motion.div>
//         )}
//       </div>

//       {/* Show stats only when online */}

//       <StreamStats viewerCount={viewerCount} streamerId={streamerId} />
//     </div>
//   );
// };

// export default VideoSection;
