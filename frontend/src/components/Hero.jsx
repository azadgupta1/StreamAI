import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { FaCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const settings = {
    centerMode: true,
    centerPadding: "200px",
    slidesToShow: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 800,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (_, next) => setActiveIndex(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerPadding: "100px",
        },
      },
      {
        breakpoint: 640,
        settings: {
          centerPadding: "40px",
        },
      },
    ],
  };

  const activeStream = liveStreams[activeIndex];

  return (
    <div className="relative h-90 sm:min-h-150 w-full bg-[#0E0E10] overflow-hidden">
      {/* ================= BACKGROUND VIDEO ================= */}
      <video
        key={activeStream.video}
        src={activeStream.video}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30"></div>

      {/* ================= HEADER CONTENT ================= */}
      <div className="absolute top-20 md:top-28 left-6 md:left-20 z-20 max-w-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-red-600 px-3 py-1 rounded text-xs font-semibold flex items-center gap-2">
            <FaCircle className="text-white text-[8px]" />
            LIVE
          </div>

          <span className="text-white text-sm">{activeStream.viewers}</span>
        </div>

        <h2 className="text-white text-md md:text-4xl font-semibold mb-4">
          {activeStream.title}
        </h2>

        <div className="flex items-center gap-4 mb-6">
          <img
            src={activeStream.avatar}
            alt="avatar"
            className="w-12 h-12 rounded-full border-2 border-[#9147FF]"
          />
          <p className="text-white font-medium">{activeStream.streamer}</p>
        </div>

        <button
          onClick={() => navigate(`/player/${activeStream.id}`)}
          className="bg-[#5af04f] hover:bg-[#7b35d9] px-6 py-3 rounded-md text-black font-semibold transition"
        >
          Watch Now
        </button>
      </div>

      {/* ================= BOTTOM CAROUSEL ================= */}
      <div className="absolute bottom-10 hidden sm:block w-[85%] xl:w-[65%] 2xl:w-[50%] px-4 md:px-16 z-20">
        <Slider {...settings}>
          {liveStreams.map((stream, index) => (
            <div key={stream.id} className="py-4">
              <div
                className={`w-60 rounded-xl overflow-hidden transition-all duration-500 cursor-pointer
                ${
                  index === activeIndex
                    ? "scale-105 border-2 border-[#5af04f] opacity-100 hover:scale-110"
                    : "opacity-60 hover:opacity-100 hover:scale-101"
                }`}
              >
                <video
                  src={stream.video}
                  muted
                  className="w-full h-40 object-cover"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

const NextArrow = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="absolute right-6 top-1/2 -translate-y-1/2 z-30
                 w-12 h-12 flex items-center justify-center
                 bg-black/60 hover:bg-black/80
                 rounded-full cursor-pointer transition"
    >
      <span className="text-[#5af04f] text-2xl font-bold">›</span>
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="absolute left-6 top-1/2 -translate-y-1/2 z-30
                 w-12 h-12 flex items-center justify-center
                 bg-black/60 hover:bg-black/80
                 rounded-full cursor-pointer transition"
    >
      <span className="text-[#5af04f] text-2xl font-bold">‹</span>
    </div>
  );
};

export default Hero;

// import React from "react";
// import Slider from "react-slick";
// import { FaCircle } from "react-icons/fa";
// import { useEffect, useState } from "react";
// import { axiosInstance } from "../lib/axios";

// const NextArrow = ({ onClick }) => {
//   return (
//     <div
//       onClick={onClick}
//       className="absolute group right-4 top-1/2 -translate-y-1/2 z-30
//                  w-12 h-12 flex items-center justify-center
//                  bg-black/60 hover:bg-transparent
//                  rounded-full cursor-pointer transition-all duration-300"
//     >
//       <span className="text-white text-xl text-xl group-hover:text-3xl group-hover:font-black group-hover:text-[#9147FF]">
//         ›
//       </span>
//     </div>
//   );
// };

// const PrevArrow = ({ onClick }) => {
//   return (
//     <div
//       onClick={onClick}
//       className="absolute group left-4 top-1/2 -translate-y-1/2 z-30
//                  w-12 h-12 flex items-center justify-center
//                  bg-black/60 hover:bg-transparent
//                  rounded-full cursor-pointer transition-all duration-300"
//     >
//       <span className="text-white text-xl group-hover:text-3xl group-hover:font-black group-hover:text-[#9147FF]">
//         ‹
//       </span>
//     </div>
//   );
// };

// const Hero = () => {
//   const [streams, setStreams] = useState([]);

//   useEffect(() => {
//     const fetchStreams = async () => {
//       try {
//         const res = await axiosInstance.get("streams");

//         const formatted = res.data.streams.map((s) => ({
//           id: s.stream_id,
//           title: s.title,
//           thumbnail:
//             s.thumbnail_url ||
//             `https://picsum.photos/seed/${s.streamer?.username}/1280/720`, // fallback
//           avatar:
//             s.streamer?.avatar_url ||
//             `https://api.dicebear.com/7.x/initials/svg?seed=${s.streamer?.username}`,
//           streamer: s.streamer?.username || "Unknown",
//           category: s.category?.name || "Streaming",
//           viewers: s.viewer_count || 0,
//           isLive: s.is_live,
//         }));

//         setStreams(formatted);
//       } catch (err) {
//         console.error("Failed to fetch streams", err);
//       }
//     };

//     fetchStreams();
//   }, []);

//   const settings = {
//     centerMode: true,
//     centerPadding: "120px",
//     slidesToShow: 1,
//     infinite: true,
//     speed: 600,
//     autoplay: true,
//     autoplaySpeed: 4000,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           centerPadding: "60px",
//         },
//       },
//       {
//         breakpoint: 640,
//         settings: {
//           centerPadding: "20px",
//         },
//       },
//     ],
//   };

//   return (
//     <div className="bg-[#0E0E10] py-10 px-10 sm:px-14 md:px-16 lg:px-20 cursor-pointer">
//       {streams.length > 0 && (
//         <Slider {...settings}>
//           {streams
//             .filter((s) => s.isLive)
//             .map((stream) => (
//               <div
//                 key={stream.id}
//                 className="px-3"
//                 onClick={() => (window.location.href = `/player/${stream.id}`)}
//               >
//                 <div className="relative rounded-xl overflow-hidden shadow-2xl group">
//                   {/* Thumbnail */}
//                   <img
//                     src={stream.thumbnail}
//                     alt={stream.title}
//                     className="w-full h-[350px] md:h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
//                   />

//                   {/* Dark Overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

//                   {/* LIVE Badge */}
//                   <div className="absolute top-4 left-4 bg-red-600 px-3 py-1 rounded text-xs font-semibold flex items-center gap-2">
//                     <FaCircle className="text-white text-[8px]" />
//                     LIVE
//                   </div>
//                   <div className="absolute top-4 right-4 text-white">
//                     <p className="text-sm text-white">
//                       {stream.viewers} viewers
//                     </p>
//                   </div>

//                   {/* Stream Info */}
//                   <div className="absolute bottom-6 left-6 flex items-center gap-4">
//                     <img
//                       src={stream.avatar}
//                       alt="avatar"
//                       className="w-14 h-14 rounded-full border-2 border-[#9147FF]"
//                     />

//                     <div>
//                       <h3 className="text-white text-lg font-semibold">
//                         {stream.title.length > 40
//                           ? stream.title.slice(0, 37) + "..."
//                           : stream.title}
//                       </h3>
//                       <h3 className="text-white text-sm font-light">
//                         {stream.streamer}
//                       </h3>
//                       <p className="text-sm text-gray-300">{stream.category}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//         </Slider>
//       )}
//     </div>
//   );
// };

// export default Hero;

// import React from "react";
// import { Link } from "react-router-dom";
// import { FaPlayCircle, FaFire, FaTv } from "react-icons/fa";

// const Hero = () => {
//   return (
//     <section className="relative w-full h-[85vh] flex flex-col justify-center items-start px-8 md:px-20 bg-gradient-to-b from-black/70 to-black/90">
//       <img
//         src="/overview/2.gif"
//         alt="hero"
//         className="absolute inset-0 w-full h-full object-cover opacity-30"
//       />
//       <div className="relative z-10 max-w-2xl">
//         <h1 className="text-2xl md:text-6xl font-extrabold mb-6 leading-tight">
//           Experience <br />
//           <span className="text-red-500">Smart Streaming with</span>
//           <div className="relative rounded-xl flex items-center text-5xl md:text-7xl transition-colors">
//             <div className="z-40 font-bold">
//               Stream<span className="text-red-500">AI</span>
//             </div>
//           </div>
//         </h1>
//         <p className="text-gray-300 text-sm md:text-lg mb-8">
//           Experience next-generation smart streaming powered by AI — real-time
//           subtitles, real-time content filtering, real-time comments filtering,
//           intelligent filters, stats and more.
//         </p>
//         <Link
//           to="/player"
//           className=" hidden w-1/2 md:w-full bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full md:text-lg font-semibold sm:flex flex-wrap items-center gap-2 shadow-lg hover:shadow-red-500/40 transition-all"
//         >
//           <FaPlayCircle /> <span>Start Watching</span>
//         </Link>
//       </div>
//     </section>
//   );
// };

// export default Hero;
