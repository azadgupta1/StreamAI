import React, {useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Hls from "hls.js";
import Navbar from "../components/Navbar";
import VideoSection from "../components/streams/VideoSection";
import SideRecommendations from "../components/streams/SideRecommendations";
import ChatSection from "../components/streams/ChatSection";
import Footer from "../components/Footer";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";


const StreamPlayer = () => {
  const videoRef = useRef(null);
  const { id } = useParams();
  const [hlsUrl, setHlsUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [streamData, setStreamData] = useState(null);

  const [streamId, setStreamId] = useState(null);
  const [userId, setUserId] = useState(null);  // You can set this based on your auth system
  const [username, setUsername] = useState(null);  // Optional: for displaying username in chat

  const [viewerCount, setViewerCount] = useState(0);
  const [streamerId, setStreamerId] = useState(null);


  useEffect(() => {
    setUserId(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).user_id : null); // Example of getting user ID from localStorage
  }, []);

  useEffect(() => {
    setUsername(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).username : null); // Update username if localStorage changes
  },[]);
  


  useEffect(() => {
    const fetchStream = async () => {
      try {
        const res = await axiosInstance.get(`streams/${id}`);
        const stream = res.data.stream;

        if (!stream.streamer?.stream_keys?.[0]?.stream_key) {
          console.error("Stream key missing");
          return;
        }

        console.log("STREAM DATA IS : ", stream);

        const stream_key = stream.streamer.stream_keys[0].stream_key;
        const url = `${import.meta.env.VITE_STREAM_URL}/${stream_key}.m3u8`;
        setHlsUrl(url);
        setStreamId(stream.stream_id);
        setStreamerId(stream.streamer.user_id);
        setStreamData(stream);
      } catch (err) {
        console.error("Failed to load stream", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStream();
  }, [id]);


  useEffect(() => {
    if (!hlsUrl) return;

    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(hlsUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((err) => console.error("Autoplay failed:", err));
      });
      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = hlsUrl;
      video.addEventListener("loadedmetadata", () =>
        video.play().catch((err) => console.error("Autoplay failed:", err))
      );
    } else {
      console.error("HLS not supported in this browser.");
    }
    
  }, [hlsUrl]);

  if (loading) {
    return <div className="text-white p-10">Loading stream...</div>;
  }


  // return (
  //   <>
  //     <Navbar />
      
  //     <div className="w-full min-h-screen bg-black/40 pb-10">
  //       <div className="flex flex-col lg:flex-row p-4 gap-6">
  //         <VideoSection videoRef={videoRef} stream={streamData}/>
  //         <ChatSection streamId={streamId} userId={userId} username={username}/>
  //       </div>
  //       {/* <SideRecommendations /> */}
  //     </div>
  //   </>
  // );

  // bg-[#0E0E10]

//   return (
//   <div className="h-screen bg-black flex flex-col">
//     <Navbar />

//     <div className="flex flex-1 relative overflow-hidden">
//       {/* Sidebar stays sticky at top */}
//       <div className="sticky top-16 z-10 h-screen">
//         <Sidebar />
//       </div>

//       {/* Main content */}
//       <div className="flex-1 flex bg-black/40">
//         <div className="flex flex-col lg:flex-row w-full h-full">

//           {/* 80% Video */}
//           <div className="w-full lg:w-[70%] h-full">
//             <VideoSection 
//               videoRef={videoRef} 
//               stream={streamData}
//               viewerCount={viewerCount}
//               streamerId={streamerId}
//             />
//           </div>

//           {/* 20% Chat */}
//           <div className="w-full lg:w-[30%] h-full border-l border-gray-800">
//             {/* <ChatSection 
//               streamId={streamId} 
//               userId={userId} 
//               username={username}
//             /> */}

//             <ChatSection
//               streamId={streamId}
//               userId={userId}
//               username={username}
//               viewerCount={viewerCount}
//               setViewerCount={setViewerCount}
//             />


//           </div>

//         </div>
//       </div>
//     </div>
//   </div>
// );


return (
  <div className="h-screen bg-black flex flex-col">

    {/* Navbar */}
    <Navbar />

    {/* Body */}
    <div className="flex flex-1 overflow-hidden">

      {/* ================= SIDEBAR (fixed automatically) ================= */}
      <div className="h-full">
        <Sidebar />
      </div>

      {/* ================= MAIN ================= */}
      <div className="flex flex-1">

        {/* ===== VIDEO (ONLY SCROLLABLE) ===== */}
        <div className="w-full lg:w-[70%] h-full overflow-y-auto">
          <VideoSection
            videoRef={videoRef}
            streamerName={streamData?.streamer?.username}
            viewerCount={viewerCount}
            streamerId={streamerId}
            hlsUrl={hlsUrl}
          />
        </div>

        {/* ===== CHAT (FIXED) ===== */}
        <div className="w-full lg:w-[30%] h-full border-l border-gray-800">
          <ChatSection
            streamId={streamId}
            userId={userId}
            username={username}
            viewerCount={viewerCount}
            setViewerCount={setViewerCount}
          />
        </div>

      </div>
    </div>
  </div>
);


};

export default StreamPlayer;




















// import { useEffect, useRef } from "react";
// import Hls from "hls.js";

// export default function StreamPlayer({ streamKey = "test" }) {
//   const videoRef = useRef(null);

//   useEffect(() => {
//     const video = videoRef.current;
//     const hlsUrl = `/hls/${streamKey}.m3u8`;

//     if (Hls.isSupported()) {
//       const hls = new Hls();
//       hls.loadSource(hlsUrl);
//       hls.attachMedia(video);
//       hls.on(Hls.Events.MANIFEST_PARSED, () => video.play());
//     } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
//       video.src = hlsUrl;
//       video.addEventListener("loadedmetadata", () => video.play());
//     }
//   }, [streamKey]);

//   return (
//     <div className="flex flex-col items-center">
//       <h2 className="text-xl font-bold mb-2">StreamAI - Player</h2>
//       <video
//         ref={videoRef}
//         controls
//         autoPlay
//         playsInline
//         style={{ maxWidth: "100%", width: "720px", height: "auto" }}
//       />
//     </div>
//   );
// }

// import React, { useEffect, useRef } from "react";
// import Hls from "hls.js";

// const StreamPlayer = () => {
//   const videoRef = useRef(null);
//   const streamKey = "test";
//   const hlsUrl = `/hls/${streamKey}.m3u8`;

//   useEffect(() => {
//     const video = videoRef.current;

//     if (Hls.isSupported()) {
//       const hls = new Hls();
//       hls.loadSource(hlsUrl);
//       hls.attachMedia(video);

//       hls.on(Hls.Events.MANIFEST_PARSED, function () {
//         video.play().catch((err) => console.error("Autoplay failed:", err));
//       });

//       return () => {
//         hls.destroy(); // Clean up on unmount
//       };
//     } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
//       video.src = hlsUrl;
//       video.addEventListener("loadedmetadata", () => {
//         video.play().catch((err) => console.error("Autoplay failed:", err));
//       });
//     } else {
//       console.error("HLS not supported in this browser.");
//     }
//   }, [hlsUrl]);

//   return (
//     <div style={{ textAlign: "center", padding: "20px" }}>
//       <h2>StreamAI - Test Player</h2>
//       <p>
//         If the stream is live, the player will automatically play it. Stream key:{" "}
//         <strong>{streamKey}</strong>
//       </p>

//       <video
//         ref={videoRef}
//         controls
//         autoPlay
//         playsInline
//         style={{ maxWidth: "100%", width: "720px", height: "auto" }}
//       ></video>
//     </div>
//   );
// };

// export default StreamPlayer;