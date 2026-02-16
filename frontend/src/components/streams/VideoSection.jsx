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
import { motion } from "framer-motion";
import { FaBroadcastTower } from "react-icons/fa";
import StreamStats from "./StreamStats";
import DonatePanel from "./DonatePanel";

const VideoSection = ({ videoRef, viewerCount, streamerId }) => {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const checkStream = () => {
      if (!videoRef?.current?.srcObject) {
        setIsOffline(true);
      } else {
        setIsOffline(false);
      }
    };

    checkStream();

    const interval = setInterval(checkStream, 2000);
    return () => clearInterval(interval);
  }, [videoRef]);

  return (
    <div className="min-h-screen flex-1 flex flex-col items-center w-full bg-gray-900">

      {/* ================= VIDEO AREA ================= */}
      <div className="w-full relative border-b border-gray-700">

        {!isOffline ? (
          <video
            ref={videoRef}
            controls
            autoPlay
            playsInline
            className="w-full shadow-lg"
          />
        ) : (
          /* ================= OFFLINE UI ================= */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-[60vh] flex flex-col items-center justify-center
                       bg-gradient-to-br from-gray-800 to-gray-900 text-gray-300"
          >
            <FaBroadcastTower size={60} className="mb-4 opacity-70" />

            <h2 className="text-2xl font-semibold">
              {streamerId} is Offline
            </h2>

            <p className="text-gray-400 mt-2">
              Stream will start soon 
            </p>
          </motion.div>
        )}
      </div>

      {/* Show stats only when online */}

        <StreamStats
          viewerCount={viewerCount}
          streamerId={streamerId}
        />
    </div>
  );
};

export default VideoSection;

