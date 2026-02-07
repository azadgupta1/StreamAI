import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFire, FaCircle } from "react-icons/fa";
import { TbPlayerPlayFilled } from "react-icons/tb";

const Explore = () => {
  const navigate = useNavigate();

  const liveStreams = [
    {
      id: 1,
      title: "Code with AI",
      viewers: "2.3K watching",
      video: "/preview/1.webm",
    },
    {
      id: 2,
      title: "AI Fitness Trainer",
      viewers: "1.1K watching",
      video: "/preview/2.webm",
    },
    {
      id: 3,
      title: "Movie Talk Live",
      viewers: "3.5K watching",
      video: "/preview/3.webm",
    },
    {
      id: 4,
      title: "Gaming Legends",
      viewers: "5.7K watching",
      video: "/preview/4.mp4",
    },
    {
      id: 5,
      title: "Art with AI",
      viewers: "876 watching",
      video: "/preview/5.mp4",
    },
    {
      id: 6,
      title: "Tech Reviews Live",
      viewers: "4.2K watching",
      video: "/preview/6.mp4",
    },
    {
      id: 7,
      title: "Music Jam Session",
      viewers: "2.9K watching",
      video: "/preview/7.mp4",
    },
    {
      id: 8,
      title: "Travel Adventures",
      viewers: "3.1K watching",
      video: "/preview/8.mp4",
    },
  ];

  return (
    <section className="py-16 px-6 md:px-12 lg:px-20 bg-[#0E0E10]">
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold mb-10 flex items-center gap-3 text-white">
        <TbPlayerPlayFilled className="text-[#9147FF]" />
        Live Streams
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {liveStreams.map((stream) => (
          <div
            key={stream.id}
            onClick={() => navigate("/player")}
            className="relative group bg-[#18181B] rounded-xl overflow-hidden cursor-pointer"
            style={{ perspective: "1000px" }}
          >
            {/* 3D Wrapper */}
            <div
              className="relative transition-all duration-500"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* VIDEO */}
              <video
                src={stream.video}
                className="w-full h-56 object-cover transition-all duration-500
                           group-hover:opacity-60"
                autoPlay
                muted
                loop
              />

              {/* Strong 3D Effect */}
              <div
                className="absolute inset-0 transition-all duration-500 pointer-events-none
                           group-hover:translate-x-2
                           group-hover:-translate-y-2
                           group-hover:rotateY-6
                           group-hover:rotateX-3"
              />
            </div>

            {/* MOVING GLOW BORDER */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition duration-300">
              {/* Bottom Border */}
              <span className="absolute bottom-0 left-0 w-full h-[4px] animated-bottom-border" />

              {/* Left Border */}
              <span className="absolute bottom-0 left-0 w-[4px] h-full animated-left-border" />
            </div>

            {/* LIVE Badge */}
            <div
              className="absolute top-3 left-3 flex items-center gap-2
                            bg-red-600 px-3 py-1 rounded-md text-xs font-semibold z-10"
            >
              <FaCircle className="text-white text-[8px] animate-pulse" />
              LIVE
            </div>

            {/* Hover Overlay (LESS BLUR) */}
            <div
              className="absolute inset-0 flex items-center justify-center
                            opacity-0 group-hover:opacity-100
                            transition-all duration-500
                            bg-black/30"
            >
              <div
                className="px-6 py-2 border-2 border-[#9147FF]
                              text-white text-sm font-semibold
                              rounded-md tracking-wide
                              group-hover:bg-[#9147FF]/50
                              transition duration-300"
              >
                Watch Stream
              </div>
            </div>

            {/* Bottom Info */}
            <div
              className="absolute bottom-0 left-0 w-full
                            bg-gradient-to-t from-black via-black/70 to-transparent
                            p-4"
            >
              <h3 className="text-white text-base font-semibold mb-1">
                {stream.title}
              </h3>

              <p className="text-gray-400 text-sm">{stream.viewers}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Explore;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { FaPlayCircle, FaFire } from "react-icons/fa";

// const Explore = () => {
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
//     <section className="py-20 px-6 md:px-16 bg-black/80">
//       <h2 className="text-3xl font-bold mb-10 flex items-center gap-2">
//         <FaFire className="text-red-500" /> Explore Live Streams
//       </h2>
//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//         {liveStreams.map((stream) => (
//           <div
//             key={stream.id}
//             onClick={() => navigate("/player")}
//             className="relative group overflow-hidden rounded-2xl shadow-lg bg-gray-900 hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
//           >
//             <video
//               src={stream.video}
//               className="w-full h-56 object-cover group-hover:opacity-75 transition-all"
//               autoPlay
//               muted
//               loop
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-4">
//               <h3 className="text-xl font-bold mb-1">{stream.title}</h3>
//               <p className="text-sm text-gray-400">{stream.viewers}</p>
//             </div>
//             <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-black/70 flex justify-center items-center">
//               <button className="btn btn-sm bg-red-500 border-none hover:bg-red-600 rounded-full shadow-md">
//                 <FaPlayCircle className="mr-2" /> Watch Now
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Explore;
