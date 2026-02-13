import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";

const ExploreLiveStreamPage = () => {
  const navigate = useNavigate();

  /* ================= STREAM DATA WITH REAL IMAGES ================= */
  const liveStreams = [
    {
      id: 1,
      title: "Code with AI",
      streamer: "CodeDev",
      viewers: "2.3K viewers",
      video: "/preview/1.webm",
      avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    {
      id: 2,
      title: "AI Fitness Trainer",
      streamer: "FitBot",
      viewers: "1.1K viewers",
      video: "/preview/2.webm",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    },
    {
      id: 3,
      title: "Movie Talk Live",
      streamer: "CinemaPro",
      viewers: "3.5K viewers",
      video: "/preview/3.webm",
      avatar: "https://randomuser.me/api/portraits/men/33.jpg",
    },
    {
      id: 4,
      title: "Gaming Legends",
      streamer: "ProGamerX",
      viewers: "5.7K viewers",
      video: "/preview/4.mp4",
      avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    },
    {
      id: 5,
      title: "Art with AI",
      streamer: "CreativeAI",
      viewers: "876 viewers",
      video: "/preview/5.mp4",
      avatar: "https://randomuser.me/api/portraits/women/55.jpg",
    },
    {
      id: 6,
      title: "Tech Reviews Live",
      streamer: "TechGuy",
      viewers: "4.2K viewers",
      video: "/preview/6.mp4",
      avatar: "https://randomuser.me/api/portraits/men/66.jpg",
    },
    {
      id: 7,
      title: "Music Jam Session",
      streamer: "DJStream",
      viewers: "2.9K viewers",
      video: "/preview/7.mp4",
      avatar: "https://randomuser.me/api/portraits/women/77.jpg",
    },
    {
      id: 8,
      title: "Travel Adventures",
      streamer: "NomadLife",
      viewers: "3.1K viewers",
      video: "/preview/8.mp4",
      avatar: "https://randomuser.me/api/portraits/men/88.jpg",
    },
    {
      id: 1,
      title: "Code with AI",
      streamer: "CodeDev",
      viewers: "2.3K viewers",
      video: "/preview/1.webm",
      avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    {
      id: 2,
      title: "AI Fitness Trainer",
      streamer: "FitBot",
      viewers: "1.1K viewers",
      video: "/preview/2.webm",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    },
    {
      id: 3,
      title: "Movie Talk Live",
      streamer: "CinemaPro",
      viewers: "3.5K viewers",
      video: "/preview/3.webm",
      avatar: "https://randomuser.me/api/portraits/men/33.jpg",
    },
    {
      id: 4,
      title: "Gaming Legends",
      streamer: "ProGamerX",
      viewers: "5.7K viewers",
      video: "/preview/4.mp4",
      avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    },
  ];

  return (
    <section className="min-h-screen bg-[#0E0E10] py-6 px-4 md:px-8">
      {/* Header */}
      <h1 className="text-white text-2xl font-bold mb-6">Live Channels</h1>

      {/* ================= TWITCH STYLE GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {liveStreams.map((stream) => (
          <div
            key={stream.id}
            onClick={() => navigate("/player")}
            className="group cursor-pointer"
          >
            {/* ================= VIDEO ================= */}
            <div className="relative overflow-hidden rounded-lg">
              <video
                src={stream.video}
                className="w-full h-44 object-cover transition duration-300 group-hover:scale-105"
                autoPlay
                muted
                loop
              />

              {/* LIVE badge */}
              <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                LIVE
              </span>

              {/* viewers count (top-right like Twitch) */}
              <span className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {stream.viewers}
              </span>

              {/* play hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <FaPlayCircle className="text-white text-4xl" />
              </div>
            </div>

            {/* ================= INFO BELOW ================= */}
            <div className="flex gap-3 mt-3">
              <img
                src={stream.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />

              <div className="flex flex-col">
                <h3 className="text-white text-sm font-semibold line-clamp-1">
                  {stream.title}
                </h3>

                <p className="text-gray-400 text-xs">{stream.streamer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreLiveStreamPage;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { FaPlayCircle, FaCircle } from "react-icons/fa";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// const ExploreLiveStreamPage = () => {
//   const navigate = useNavigate();

//   const liveStreams = [
//     {
//       id: 1,
//       title: "Code with AI",
//       viewers: "2.3K watching",
//       video: "/preview/1.webm",
//     },
//     {
//       id: 2,
//       title: "AI Fitness Trainer",
//       viewers: "1.1K watching",
//       video: "/preview/2.webm",
//     },
//     {
//       id: 3,
//       title: "Movie Talk Live",
//       viewers: "3.5K watching",
//       video: "/preview/3.webm",
//     },
//     {
//       id: 4,
//       title: "Gaming Legends",
//       viewers: "5.7K watching",
//       video: "/preview/4.mp4",
//     },
//     {
//       id: 5,
//       title: "Art with AI",
//       viewers: "876 watching",
//       video: "/preview/5.mp4",
//     },
//     {
//       id: 6,
//       title: "Tech Reviews Live",
//       viewers: "4.2K watching",
//       video: "/preview/6.mp4",
//     },
//     {
//       id: 7,
//       title: "Music Jam Session",
//       viewers: "2.9K watching",
//       video: "/preview/7.mp4",
//     },
//     {
//       id: 8,
//       title: "Travel Adventures",
//       viewers: "3.1K watching",
//       video: "/preview/8.mp4",
//     },
//   ];

//   return (
//     <>
//       {/* <Navbar /> */}

//       <section className="min-h-screen bg-[#0E0E10] py-16 px-6 md:px-12 lg:px-20">
//         {/* Page Header */}
//         {/* <div className="mb-12">
//           <h1 className="text-3xl md:text-4xl font-bold text-white">
//             All Live Streams
//           </h1>
//           <p className="text-gray-400 mt-2 text-sm md:text-base">
//             Discover trending streams happening right now.
//           </p>
//         </div> */}

//         {/* Streams Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//           {liveStreams.map((stream) => (
//             <div
//               key={stream.id}
//               onClick={() => navigate("/player")}
//               className="relative group bg-[#18181B] rounded-xl overflow-hidden cursor-pointer transition-all duration-500"
//               style={{ perspective: "1000px" }}
//             >
//               {/* 3D Wrapper */}
//               <div
//                 className="relative transition-all duration-500"
//                 style={{ transformStyle: "preserve-3d" }}
//               >
//                 {/* Video */}
//                 <video
//                   src={stream.video}
//                   className="w-full h-56 object-cover transition-all duration-500
//                              group-hover:scale-105
//                              group-hover:-rotate-1
//                              group-hover:-translate-y-2
//                              group-hover:opacity-60"
//                   autoPlay
//                   muted
//                   loop
//                 />
//               </div>

//               {/* LIVE Badge */}
//               <div
//                 className="absolute top-3 left-3 flex items-center gap-2
//                               bg-red-600 px-3 py-1 rounded-md text-xs font-semibold z-10"
//               >
//                 <FaCircle className="text-white text-[8px] animate-pulse" />
//                 LIVE
//               </div>

//               {/* Hover Overlay */}
//               <div
//                 className="absolute inset-0 flex items-center justify-center
//                               opacity-0 group-hover:opacity-100
//                               transition-all duration-500
//                               bg-black/40 backdrop-blur-sm"
//               >
//                 <div
//                   className="flex items-center gap-2
//                                 px-5 py-2 rounded-md
//                                 border border-[#9147FF]
//                                 text-white text-sm font-semibold
//                                 tracking-wide
//                                 group-hover:bg-[#9147FF]
//                                 transition duration-300"
//                 >
//                   <FaPlayCircle />
//                   Watch Stream
//                 </div>
//               </div>

//               {/* Bottom Info */}
//               <div
//                 className="absolute bottom-0 left-0 w-full
//                               bg-gradient-to-t from-black via-black/70 to-transparent
//                               p-4"
//               >
//                 <h3 className="text-white text-base font-semibold mb-1">
//                   {stream.title}
//                 </h3>

//                 <p className="text-gray-400 text-sm">{stream.viewers}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* <Footer /> */}
//     </>
//   );
// };

// export default ExploreLiveStreamPage;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { FaPlayCircle } from "react-icons/fa";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// const ExploreLiveStreamPage = () => {
//   const navigate = useNavigate();

//   // Sample live stream data
//   const liveStreams = [
//     {
//       id: 1,
//       title: "Code with AI",
//       viewers: "2.3K watching",
//       video: "/preview/1.webm",
//     },
//     {
//       id: 2,
//       title: "AI Fitness Trainer",
//       viewers: "1.1K watching",
//       video: "/preview/2.webm",
//     },
//     {
//       id: 3,
//       title: "Movie Talk Live",
//       viewers: "3.5K watching",
//       video: "/preview/3.webm",
//     },
//     {
//       id: 4,
//       title: "Gaming Legends",
//       viewers: "5.7K watching",
//       video: "/preview/4.mp4",
//     },
//     {
//       id: 5,
//       title: "Art with AI",
//       viewers: "876 watching",
//       video: "/preview/5.mp4",
//     },
//     {
//       id: 6,
//       title: "Tech Reviews Live",
//       viewers: "4.2K watching",
//       video: "/preview/6.mp4",
//     },
//     {
//       id: 7,
//       title: "Music Jam Session",
//       viewers: "2.9K watching",
//       video: "/preview/7.mp4",
//     },
//     {
//       id: 8,
//       title: "Travel Adventures",
//       viewers: "3.1K watching",
//       video: "/preview/8.mp4",
//     },
//   ];

//   return (
//     <>
//       <Navbar />
//       <section className="py-16 px-6 md:px-16 bg-black/80 min-h-screen pb-20">
//         <h2 className="text-3xl font-bold mb-10 text-red-500">
//           All Live Streams
//         </h2>
//         <div className="flex flex-col gap-10">
//           {liveStreams.map((stream) => (
//             <div
//               key={stream.id}
//               onClick={() => navigate("/player")}
//               className="relative group rounded-2xl overflow-hidden shadow-lg cursor-pointer bg-gray-900"
//             >
//               <video
//                 src={stream.video}
//                 className="w-full h-64 object-cover group-hover:opacity-80 transition duration-300"
//                 autoPlay
//                 muted
//                 loop
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-4">
//                 <h3 className="text-2xl font-bold mb-1">{stream.title}</h3>
//                 <p className="text-sm text-gray-400">{stream.viewers}</p>
//               </div>
//               <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-black/70 flex justify-center items-center">
//                 <button className="btn btn-md bg-red-500 border-none hover:bg-red-600 rounded-full shadow-md">
//                   <FaPlayCircle className="mr-2" /> Watch Now
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//       <Footer />
//     </>
//   );
// };

// export default ExploreLiveStreamPage;
