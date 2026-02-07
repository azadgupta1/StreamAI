import React from "react";
import Slider from "react-slick";
import { FaCircle } from "react-icons/fa";

const streams = [
  {
    id: 1,
    title: "Fortnite Ranked Grind",
    streamer: "Oatley",
    viewers: "2.5K",
    category: "Fortnite",
    thumbnail:
      "https://images.unsplash.com/photo-1610041321461-37a7d578ebad?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    title: "Valorant Immortal Push",
    streamer: "Tenzo",
    viewers: "1.8K",
    category: "Valorant",
    thumbnail:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    id: 3,
    title: "Late Night Warzone",
    streamer: "GhostFPS",
    viewers: "3.2K",
    category: "Warzone",
    thumbnail:
      "https://images.unsplash.com/photo-1751256743518-5836ec5154e9?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
  },
];

const NextArrow = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="absolute group right-4 top-1/2 -translate-y-1/2 z-30 
                 w-12 h-12 flex items-center justify-center 
                 bg-black/60 hover:bg-transparent 
                 rounded-full cursor-pointer transition-all duration-300"
    >
      <span className="text-white text-xl text-xl group-hover:text-3xl group-hover:font-black group-hover:text-[#9147FF]">
        ›
      </span>
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="absolute group left-4 top-1/2 -translate-y-1/2 z-30 
                 w-12 h-12 flex items-center justify-center 
                 bg-black/60 hover:bg-transparent
                 rounded-full cursor-pointer transition-all duration-300"
    >
      <span className="text-white text-xl group-hover:text-3xl group-hover:font-black group-hover:text-[#9147FF]">
        ‹
      </span>
    </div>
  );
};

const Hero = () => {
  const settings = {
    centerMode: true,
    centerPadding: "120px",
    slidesToShow: 1,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerPadding: "60px",
        },
      },
      {
        breakpoint: 640,
        settings: {
          centerPadding: "20px",
        },
      },
    ],
  };

  return (
    <div className="bg-[#0E0E10] py-10 px-10 sm:px-14 md:px-16 lg:px-20 cursor-pointer">
      <Slider {...settings}>
        {streams.map((stream) => (
          <div key={stream.id} className="px-3">
            <div className="relative rounded-xl overflow-hidden shadow-2xl group">
              {/* Thumbnail */}
              <img
                src={stream.thumbnail}
                alt={stream.title}
                className="w-full h-[350px] md:h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

              {/* LIVE Badge */}
              <div className="absolute top-4 left-4 bg-red-600 px-3 py-1 rounded text-xs font-semibold flex items-center gap-2">
                <FaCircle className="text-white text-[8px]" />
                LIVE
              </div>

              {/* Stream Info */}
              <div className="absolute bottom-6 left-6 flex items-center gap-4">
                <img
                  src={stream.avatar}
                  alt="avatar"
                  className="w-14 h-14 rounded-full border-2 border-[#9147FF]"
                />

                <div>
                  <h3 className="text-white text-lg font-semibold">
                    {stream.streamer}
                  </h3>
                  <p className="text-sm text-gray-300">{stream.category}</p>
                  <p className="text-sm text-gray-400">
                    {stream.viewers} viewers
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;

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
