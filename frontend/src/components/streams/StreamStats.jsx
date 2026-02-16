import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { motion } from "framer-motion";
import DonatePanel from "./DonatePanel";

import {
  FaEye,
  FaUserPlus,
  FaGift,
  FaShareAlt,
  FaEllipsisH,
  FaInstagram,
  FaDiscord,
  FaCheckCircle
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const StreamStatsWithSubscribe = ({ viewerCount, streamerId }) => {
  const [streamer, setStreamer] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchStreamer = async () => {
      try {
        const { data } = await axiosInstance.get(`users/${streamerId}`);
        setStreamer(data);
      } finally {
        setLoading(false);
      }
    };

    fetchStreamer();
  }, [streamerId]);

  /* ================= HELPERS ================= */
  const formatNumber = (num = 0) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num;
  };

  if (loading || !streamer) {
    return (
      <div className="p-6 bg-neutral-900 rounded-xl animate-pulse h-40 w-full" />
    );
  }

  const isLive = streamer.streams?.[0]?.is_live;

  const tags = ["Gaming", "AI", "Coding", "Live", "Tech", "Fun"];

  /* ================= UI ================= */
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-black text-white px-6 py-5"
    >
      {/* ===================================================== */}
      {/* ===================== TOP SECTION =================== */}
      {/* ===================================================== */}

      <div className="space-y-4">

        {/* ===== Row 1 : Avatar + Username + Buttons ===== */}
        <div className="flex flex-wrap items-center justify-between gap-4">

          {/* Left */}
          <div className="flex items-center gap-4 min-w-[250px]">
            <div className="relative">
              <img
                src={streamer.profile_picture}
                alt="profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-neutral-700"
              />

              {isLive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-600 text-xs px-3 py-[2px] rounded-full font-semibold">
                  LIVE
                </span>
              )}
            </div>

            <h2 className="text-xl font-bold">{streamer.username}</h2>
          </div>

          {/* Right Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <FaUserPlus />
              Follow
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <FaGift />
              Gift Sub
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-lg font-semibold"
            >
              Subscribe
            </motion.button>
          </div>
        </div>

        {/* ===== Row 2 : Description + Viewers/Actions ===== */}
        <div className="flex flex-wrap items-center justify-between gap-3">

          {/* Description grows */}
          <p className="text-white text-lg flex-1 min-w-[250px]">
            {streamer.streams?.[0]?.description || "No description provided"}
          </p>

          {/* Right side */}
          <div className="flex items-center gap-4 shrink-0">

            {isLive && (
              <div className="flex items-center gap-2 text-pink-500 font-semibold">
                <FaEye />
                <span>{viewerCount} watching</span>
              </div>
            )}

            <button className="hover:bg-neutral-800 p-2 rounded-lg">
              <FaEllipsisH />
            </button>

            <button className="hover:bg-neutral-800 p-2 rounded-lg">
              <FaShareAlt />
            </button>
          </div>
        </div>

        {/* ===== Row 3 : Tags ===== */}
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 5).map((tag, i) => (
            <span
              key={i}
              className="bg-neutral-800 hover:bg-neutral-700 text-xs px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ===================================================== */}
      {/* ===================== ABOUT CARD ==================== */}
      {/* ===================================================== */}

      <div className="mt-6 bg-neutral-900 border border-neutral-800 rounded-xl p-5">

        {/* Header */}
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            About {streamer.username}
            <FaCheckCircle className="text-purple-500 text-sm" />
          </h3>

          <span className="text-sm text-neutral-400">
            {formatNumber(streamer.subscribers)} Followers
          </span>
        </div>

        {/* Socials */}
        <div className="mt-4 space-y-3 text-sm text-neutral-300">

          <div className="flex items-center gap-3 hover:text-white">
            <FaInstagram className="text-pink-500" />
            @{streamer.username}_
          </div>

          <div className="flex items-center gap-3 hover:text-white">
            <FaXTwitter />
            @{streamer.username}_
          </div>

          <div className="flex items-center gap-3 hover:text-white">
            <FaDiscord className="text-indigo-400" />
            {streamer.username}
            {streamer.user_id.slice(0, 4)}
          </div>
        </div>

        {/* Email */}
        <div className="mt-4 text-sm text-neutral-400 border-t border-neutral-800 pt-3">
          Business: {streamer.username}@gmail.com
        </div>
      </div>
      
      <div className="space-y-10 mt-20">
        <DonatePanel />
      </div>
      
    </motion.div>
  );
};

export default StreamStatsWithSubscribe;
















// import React, { useEffect, useState } from "react";
// import { axiosInstance } from "../../lib/axios";
// import { FaEye, FaUserPlus, FaThumbsUp } from "react-icons/fa";
// import { motion } from "framer-motion";
// import {
//   FaInstagram,
//   FaDiscord,
//   FaCheckCircle,
// } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";
// import {
//   FaGift,
//   FaShareAlt,
//   FaEllipsisH
// } from "react-icons/fa";




// const StreamStatsWithSubscribe = ({ viewerCount, streamerId }) => {
//   const [streamer, setStreamer] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStreamer = async () => {
//       try {
//         const { data } = await axiosInstance.get(`users/${streamerId}`);

//         console.log("DATA is : ", data);
//         setStreamer(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStreamer();
//   }, [streamerId]);

//   if (loading) {
//     return (
//       <div className="p-5 bg-neutral-900 rounded-2xl animate-pulse h-32 w-full" />
//     );
//   }

//   const isLive = streamer.streams?.[0]?.is_live;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="w-full bg-black text-white p-5"
//     >
//       {/* ===== TOP SECTION (Pro Twitch Style) ===== */}
// <div className="mt-4 space-y-4">

//   {/* ================= ROW 1 ================= */}
//   <div className="flex items-center justify-between gap-4">

//     {/* LEFT : Avatar + Name */}
//     <div className="flex items-center gap-4">
//       <div className="relative">
//         <img
//           src={streamer.profile_picture}
//           alt="profile"
//           className="w-20 h-20 rounded-full object-cover border-2 border-neutral-700"
//         />

//         {isLive && (
//           <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-600 text-xs px-3 py-[2px] rounded-full font-semibold">
//             LIVE
//           </span>
//         )}
//       </div>

//       <div>
//         <h2 className="text-xl font-bold">{streamer.username}</h2>
//       </div>
//     </div>

//     {/* RIGHT : Action Buttons */}
//     <div className="flex items-center gap-3">

//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         className="bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded-xl flex items-center gap-2"
//       >
//         <FaUserPlus />
//         Follow
//       </motion.button>

//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         className="bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded-xl flex items-center gap-2"
//       >
//         <FaGift />
//         Gift Sub
//       </motion.button>

//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-xl font-semibold"
//       >
//         Subscribe
//       </motion.button>

//     </div>
//   </div>


//   {/* ================= ROW 2 ================= */}
//   <div className="flex items-center justify-between gap-4">

//     {/* Description */}
//     <p className="text-neutral-300 text-sm max-w-3xl">
//       {streamer.streams?.[0]?.description || "No description provided"}
//     </p>

//     {/* Right side actions */}
//     <div className="flex items-center gap-4">

//       {isLive && (
//         <div className="flex items-center gap-2 text-pink-500 font-semibold">
//           <FaEye />
//           <span>{viewerCount} watching</span>
//         </div>
//       )}

//       {/* Menu */}
//       <button className="hover:bg-neutral-800 p-2 rounded-lg">
//         <FaEllipsisH />
//       </button>

//       {/* Share */}
//       <button className="hover:bg-neutral-800 p-2 rounded-lg">
//         <FaShareAlt />
//       </button>
//     </div>
//   </div>


//   {/* ================= ROW 3 (TAGS) ================= */}
//   <div className="flex flex-wrap gap-2">
//     {["Gaming", "AI", "Coding", "Live", "Chill", "Tech", "Fun"]
//       .slice(0, 5)
//       .map((tag, i) => (
//         <span
//           key={i}
//           className="bg-neutral-800 hover:bg-neutral-700 text-xs px-3 py-1 rounded-full cursor-pointer transition"
//         >
//           {tag}
//         </span>
//       ))}
//   </div>

// </div>








//       {/* ===== ABOUT CARD (Twitch Style) ===== */}
//       <div className="mt-6">
//         <div className="bg-gradient-to-br from-neutral-100/5 to-neutral-200/5 backdrop-blur-md rounded-sm p-5 shadow-lg">

//           {/* Header */}
//           <div className="flex items-center gap-3">
//             <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
//               About {streamer.username}
//               <FaCheckCircle className="text-purple-500 text-sm" />
//             </h3>

//             <span className="text-sm text-neutral-400">
//               {streamer.subscribers} Followers
//             </span>
//           </div>

//           {/* Social Links */}
//           <div className="mt-4 flex flex-col gap-3 text-sm text-neutral-300">

//             {/* Instagram */}
//             <div className="flex items-center gap-3 hover:text-white transition">
//               <FaInstagram className="text-pink-500" />
//               <span>@{streamer.username}_</span>
//             </div>

//             {/* X / Twitter */}
//             <div className="flex items-center gap-3 hover:text-white transition">
//               <FaXTwitter />
//               <span>@{streamer.username}_</span>
//             </div>

//             {/* Discord */}
//             <div className="flex items-center gap-3 hover:text-white transition">
//               <FaDiscord className="text-indigo-400" />
//               <span>
//                 {streamer.username}
//                 {streamer.user_id.slice(0, 4)}
//               </span>
//             </div>
//           </div>

//           {/* Business Email */}
//           <div className="mt-4 text-sm text-neutral-400 border-t border-neutral-800 pt-3">
//             Business: {streamer.username}@gmail.com
//           </div>
//         </div>
//       </div>



//     </motion.div>
//   );
// };

// export default StreamStatsWithSubscribe;












// import React, { useState, useEffect } from "react";
// import { FaEye, FaThumbsUp, FaComment, FaUserPlus } from "react-icons/fa";
// import { motion } from "framer-motion";

// const StreamStatsWithSubscribe = ({ viewerCount, streamerId }) => {

//   return(
//     <div>
//       <p>Viewers: {viewerCount}</p>
//       <p>Streamer ID: {streamerId}</p> {/* You can use it here */}
//     </div>
//   );
  
// };

// export default StreamStatsWithSubscribe;
















// return (
//     <div className="w-full mt-4 bg-[#0f0f0f] border border-gray-800 rounded-xl p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//       {/* Stats */}

//       <div className="mt-2 text-white">
//         👀 {viewerCount} watching the stream
//       </div>

//       <div className="flex flex-wrap gap-4 lg:gap-6">
//         {stats.map((stat, index) => (
//           <motion.div
//             key={stat.label}
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4, delay: index * 0.1 }}
//             whileHover={{ scale: 1.05 }}
//             className="flex items-center gap-3 bg-[#141414] px-4 py-2 rounded-lg border border-gray-800 hover:border-green-500 transition-all duration-200 cursor-pointer min-w-[130px]"
//           >
//             <div className="text-green-400 text-lg">{stat.icon}</div>

//             <div className="flex flex-col">
//               <span className="text-white font-semibold text-sm">
//                 {stat.value.toLocaleString()}
//               </span>
//               <span className="text-gray-500 text-xs">{stat.label}</span>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* Subscribe Button */}
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={handleSubscribe}
//         className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 text-sm
//           ${
//             subscribed
//               ? "bg-gray-700 text-gray-300 border border-gray-600"
//               : "bg-green-500 text-black hover:bg-green-600 shadow-md shadow-green-500/20"
//           }`}
//       >
//         {subscribed ? "Subscribed" : "Subscribe"}
//       </motion.button>
//     </div>
//   );