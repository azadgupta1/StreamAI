// import React, { useState } from "react";
// import { FaFire, FaVideo, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// const Sidebar = () => {
//   const [expanded, setExpanded] = useState(false);

//   const menuItems = [
//     { icon: <FaFire />, label: "Explore" },
//     { icon: <FaVideo />, label: "Subscriptions" },
//   ];

//   // Dummy live channels with online red dot
//   const liveChannels = [
//     { name: "Streamer1", avatar: "https://i.pravatar.cc/32?img=1" },
//     { name: "GamerX", avatar: "https://i.pravatar.cc/32?img=2" },
//     { name: "ProPlayer", avatar: "https://i.pravatar.cc/32?img=3" },
//     { name: "CoolStreamer", avatar: "https://i.pravatar.cc/32?img=4" },
//     { name: "SpeedLive", avatar: "https://i.pravatar.cc/32?img=5" },
//     { name: "KSI", avatar: "https://i.pravatar.cc/32?img=6" },
//   ];

//   // Dummy recommended categories
//   const recommendedCategories = [
//     { name: "Gaming", avatar: "https://via.placeholder.com/32", followers: "12.3K" },
//     { name: "Music", avatar: "https://via.placeholder.com/32", followers: "8.7K" },
//     { name: "Art", avatar: "https://via.placeholder.com/32", followers: "5.2K" },
//     { name: "Esports", avatar: "https://via.placeholder.com/32", followers: "20.1K" },
//   ];

//   return (
//     <div
//       className={`bg-gray-900 text-white h-screen flex flex-col transition-all duration-300 ${
//         expanded ? "w-64" : "w-14"
//       }`}
//     >
//       {/* Top toggle button */}
//       <div className="flex items-center justify-between h-16 px-2 flex-shrink-0">
//         {expanded && <span className="font-bold text-sm">For You</span>}
//         <button
//           onClick={() => setExpanded(!expanded)}
//           className="p-2 hover:bg-gray-800 rounded"
//         >
//           {expanded ? <FaChevronLeft /> : <FaChevronRight />}
//         </button>
//       </div>

//       {/* Scrollable content */}
//       <nav className="flex-1 overflow-y-auto mt-2 scrollbar-thin">
//         {/* Live Channels */}
//         <div className="mt-2">
//           {expanded && (
//             <h3 className="px-1 text-gray-400 uppercase text-xs mb-1">
//               Live Channels
//             </h3>
//           )}
//           {liveChannels.map((channel, idx) => (
//             <div
//               key={idx}
//               className="flex items-center px-2 py-2 hover:bg-gray-800 cursor-pointer relative"
//             >
//               <img
//                 src={channel.avatar}
//                 alt={channel.name}
//                 className="w-8 h-8 rounded-full"
//               />
//               {/* Red live dot */}
//               <span className="absolute w-2 h-2 bg-red-500 rounded-full top-2 left-3 border border-black" />
//               {expanded && <span className="ml-3 text-sm">{channel.name}</span>}
//             </div>
//           ))}
//         </div>

//         {/* Divider line after streamer section */}
//         <div className="border-t border-gray-700 my-2 mx-2" />

//         {/* Recommended Categories */}
//         <div className="mt-2">
//           {expanded && (
//             <h3 className="px-2 text-gray-400 uppercase text-xs mb-1">
//               Recommended Categories
//             </h3>
//           )}
//           {recommendedCategories.map((cat, idx) => (
//             <div
//               key={idx}
//               className="flex items-center px-2 py-2 hover:bg-gray-800 cursor-pointer"
//             >
//               <img
//                 src={cat.avatar}
//                 alt={cat.name}
//                 className="w-8 h-8 rounded-sm"
//               />
//               {expanded && (
//                 <div className="ml-3 text-sm flex flex-col">
//                   <span>{cat.name}</span>
//                   <span className="text-gray-400 text-xs">{cat.followers} followers</span>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Divider line before menu */}
//         <div className="border-t border-gray-700 my-2 mx-2" />

//         {/* Menu Items */}
//         {menuItems.map((item, index) => (
//           <div
//             key={index}
//             className="flex items-center px-2 py-3 hover:bg-gray-800 cursor-pointer"
//           >
//             {item.icon}
//             {expanded && <span className="ml-3 text-sm">{item.label}</span>}
//           </div>
//         ))}
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;































import React, { useState } from "react";
import { FaFire, FaVideo, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);

  const menuItems = [
    { icon: <FaFire />, label: "Explore" },
    { icon: <FaVideo />, label: "Subscriptions" },
  ];

  // Dummy live channels with online red dot
  const liveChannels = [
    { name: "Streamer1", avatar: "https://i.pravatar.cc/32?img=1" },
    { name: "GamerX", avatar: "https://i.pravatar.cc/32?img=2" },
    { name: "ProPlayer", avatar: "https://i.pravatar.cc/32?img=3" },
    { name: "CoolStreamer", avatar: "https://i.pravatar.cc/32?img=4" },
    { name: "SpeedLive", avatar: "https://i.pravatar.cc/32?img=5" },
    { name: "KSI", avatar: "https://i.pravatar.cc/32?img=6" },
  ];

  // Dummy recommended categories with square images
  const recommendedCategories = [
    { name: "Gaming", avatar: "https://picsum.photos/32?random=1", followers: "12.3K" },
    { name: "Music", avatar: "https://picsum.photos/32?random=2", followers: "8.7K" },
    { name: "Art", avatar: "https://picsum.photos/32?random=3", followers: "5.2K" },
    { name: "Esports", avatar: "https://picsum.photos/32?random=4", followers: "20.1K" },
  ];


  return (
    <div
      className={`bg-gray-900 text-white h-screen flex flex-col transition-all duration-300 ${
        expanded ? "w-64" : "w-14"
      }`}
    >
      {/* Top toggle button */}
      <div className="flex items-center justify-between h-16 px-2 flex-shrink-0">
        {expanded && <span className="font-bold text-sm">For You</span>}
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-2 hover:bg-gray-800 rounded"
        >
          {expanded ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>

      {/* Scrollable content starts below toggle */}
      <nav className="flex-1 overflow-y-auto mt-0 scrollbar-thin">
        {/* Live Channels */}
        <div className="mt-2">
          {expanded && (
            <h3 className="px-2 text-gray-400 uppercase text-xs mb-1">
              Live Channels
            </h3>
          )}
          {liveChannels.map((channel, idx) => (
            <div
              key={idx}
              className="flex items-center px-2 py-2 hover:bg-gray-800 cursor-pointer relative"
            >
              <img
                src={channel.avatar}
                alt={channel.name}
                className="w-8 h-8 rounded-full"
              />
              {/* Red live dot */}
              <span className="absolute w-2 h-2 bg-red-500 rounded-full top-2 left-3 border border-black" />
              {expanded && <span className="ml-3 text-sm">{channel.name}</span>}
            </div>
          ))}
        </div>

        {/* Divider line after streamer section */}
        <div className="border-t border-gray-700 my-2 mx-2" />

        {/* Recommended Categories */}
        <div className="mt-2">
          {expanded && (
            <h3 className="px-2 text-gray-400 uppercase text-xs mb-1">
              Recommended Categories
            </h3>
          )}
          {recommendedCategories.map((cat, idx) => (
            <div
              key={idx}
              className="flex items-center px-2 py-2 hover:bg-gray-800 cursor-pointer"
            >
              <img
                src={cat.avatar}
                alt={cat.name}
                className="w-8 h-8 object-cover"
              />
              {expanded && (
                <div className="ml-3 text-sm flex flex-col">
                  <span>{cat.name}</span>
                  <span className="text-gray-400 text-xs">{cat.followers} followers</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Divider line before menu */}
        <div className="border-t border-gray-700 my-2 mx-2" />

        {/* Menu Items */}
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center px-2 py-3 hover:bg-gray-800 cursor-pointer"
          >
            {item.icon}
            {expanded && <span className="ml-3 text-sm">{item.label}</span>}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
