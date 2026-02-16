import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaFire, FaCircle } from "react-icons/fa";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { axiosInstance } from "../lib/axios";

const Explore = () => {
  const navigate = useNavigate();

  const [streams, setStreams] = useState([]);

  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const res = await axiosInstance.get("streams");
        console.log("Fetched streams:", res.data);
        const formatted = res.data.streams.map((s) => ({
          id: s.stream_id,
          title: s.title,
          thumbnail:
            s.thumbnail_url ||
            `https://picsum.photos/seed/${s.streamer?.username}/1280/720`, // fallback
          avatar:
            s.streamer?.profile_picture ||
            `https://api.dicebear.com/7.x/initials/svg?seed=${s.streamer?.username}`,
          streamer: s.streamer?.username || "Unknown",
          category: s.category?.name || "Streaming",
          viewers: s.viewer_count || 0,
          isLive: s.is_live,
        }));

        setStreams(formatted);
      } catch (err) {
        console.error("Failed to fetch streams", err);
      }
    };

    fetchStreams();
  }, []);

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
  <section className="bg-black py-0 px-4 md:px-6">
    {/* Title */}
    <h2 className="text-white text-xl md:text-2xl font-semibold mt-4 mb-6 flex items-center gap-3">
      Live channels we think you’ll like
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {streams.length === 0 ? (
        <p className="text-white col-span-full text-center">
          No live streams available.
        </p>
      ) : (
        streams
          .filter((s) => s.isLive)
          .map((stream) => (
            <div
              key={stream.id}
              onClick={() => navigate(`/player/${stream.id}`)}
              className="group cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={stream.thumbnail}
                  alt={stream.title}
                  className="w-full h-48 object-cover transition duration-300 group-hover:scale-105"
                />

                {/* LIVE Badge */}
                <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                  LIVE
                </span>

                {/* Viewer Count */}
                <span className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {stream.viewers} viewers
                </span>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  <TbPlayerPlayFilled className="text-white text-4xl" />
                </div>
              </div>

              {/* Stream Info */}
              <div className="flex gap-3 mt-3">
                <img
                  src={stream.avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div>
                  <h3 className="text-white text-sm font-semibold line-clamp-1">
                    {stream.title}
                  </h3>
                  <p className="text-gray-400 text-xs">
                    {stream.streamer}
                  </p>
                </div>
              </div>
            </div>
          ))
      )}
    </div>
        {/* Bottom Divider */}
    <div className="mt-12 h-px w-full bg-zinc-800" />

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
