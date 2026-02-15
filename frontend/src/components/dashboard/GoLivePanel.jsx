import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Hls from "hls.js";
import { axiosInstance } from "../../lib/axios";
import { io } from "socket.io-client";


const GoLivePanel = () => {
  const videoRef = useRef(null);

  const [streamId, setStreamId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [isLive, setIsLive] = useState(false);
  const [isStreamDetected, setIsStreamDetected] = useState(false);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [streamer_id, setStreamer_id] = useState(null);
  const [username, setUsername] = useState("");

  const [HLS_URL, setHLS_URL] = useState("");
  const socket = io(import.meta.env.VITE_SOCKET_URL, {
    withCredentials: true,
  });





  /* ================= LOAD ACTIVE STREAM ================= */
  useEffect(() => {
    const loadActiveStream = async () => {
      try {
        const res = await axiosInstance.get(
          "streams/active",
        );

        const stream = res.data;
        console.log("Active stream:", stream);

        if (stream) {
          setStreamId(stream.stream_id);
          setStreamer_id(stream.streamer_id);
          setTitle(stream.title);
          setDescription(stream.description || "");
          setCategory(stream.category_id);
          setIsLive(stream.is_live);
          setHLS_URL(`${import.meta.env.VITE_STREAM_URL}/${stream.streamKey}.m3u8`);
        }
      } catch (err) {
        console.log(
          "Active stream error:",
          err.response?.data || err.message
        );
      }
    };

    loadActiveStream();
  }, []);

  useEffect(() => {
    setUsername(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).username : null); // Update username if localStorage changes
  }, []);

  /* ================= DETECT STREAM ================= */
  useEffect(() => {
    if (!HLS_URL) return;   // IMPORTANT

    const checkStream = async () => {
      try {
        const res = await fetch(HLS_URL, { method: "HEAD" });
        setIsStreamDetected(res.ok);
      } catch (err) {
        setIsStreamDetected(false);
      }
    };

    checkStream(); // run immediately
    const interval = setInterval(checkStream, 3000);

    return () => clearInterval(interval);
  }, [HLS_URL]);   // 👈 DEPENDENCY ADDED


  /* ================= LOAD PLAYER ================= */
  useEffect(() => {
    console.log(isStreamDetected, videoRef.current);
    if (!isStreamDetected || !videoRef.current) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(HLS_URL);
      hls.attachMedia(videoRef.current);
    } else {
      videoRef.current.src = HLS_URL;
    }
  }, [isStreamDetected]);

  /* ================= STATE COMPUTATION ================= */
  const getState = () => {
    if (!isStreamDetected) return "OFFLINE";
    if (!isLive) return "READY";
    return "LIVE";
  };

  const state = getState();

  /* ================= FETCH CHATS WHEN LIVE ================= */
  // useEffect(() => {
  //   if (!streamId || !isLive) return;

  //   const fetchChats = async () => {
  //     try {
  //       const res = await axios.get(
  //         `http://localhost:3000/api/chats/stream/${streamId}`
  //       );
  //       setChats(res.data);
  //     } catch (err) {
  //       console.log("Error fetching chats:", err);
  //     }
  //   };

  //   fetchChats();
  //   const interval = setInterval(fetchChats, 2000);
  //   return () => clearInterval(interval);
  // }, [streamId, isLive]);

  useEffect(() => {
    if (!streamId) return;

    console.log("Loading chats for stream:", streamId);
    const loadChats = async () => {
      const res = await axiosInstance.get(`/chat/stream/${streamId}`);
      setChats(res.data);
    };

    loadChats();
  }, [streamId]);

  /* ================= SOCKET CHAT ================= */
  useEffect(() => {
    if (!streamId) return;

    // Join stream room
    socket.emit("join_stream", streamId);

    // Listen for new messages
    socket.on("new_message", (message) => {
      setChats((prev) => [...prev, message]);
    });

    return () => {
      socket.off("new_message");
    };
  }, [streamId]);

  const [chatMessage, setChatMessage] = useState("");

  const sendChatMessage = () => {
    if (!chatMessage.trim()) return;

    socket.emit("send_message", {
      stream_id: streamId,
      user_id: streamer_id,
      username: username,
      message: chatMessage,
    });

    setChatMessage("");
  };



  /* ================= CREATE STREAM ================= */
  const handleCreateStream = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.post(
        "streams/create",
        { title, description, category_id: category },
      );

      setStreamId(res.data.stream.stream_id);
      alert("Stream created");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UPDATE METADATA ================= */
  const handleSaveMeta = async () => {
    if (!streamId) return;

    await axiosInstance.put(
      `streams/${streamId}`,
      { title, description, category_id: category },

    );
    alert("Metadata updated");
  };

  /* ================= GO LIVE ================= */
  const handleGoLive = async () => {
    if (!isStreamDetected) return alert("Start OBS first");

    await axiosInstance.put(
      `streams/go-live/${streamId}`,
      {},

    );

    setIsLive(true);
  };

  /* ================= END STREAM ================= */
  const handleEndStream = async () => {
    await axiosInstance.put(
      `streams/end-stream/${streamId}`,
      {},
    );

    alert("Stream ended");
    window.location.reload();
  };

  const getUserColor = (username) => {
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }

    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 70%, 60%)`;
  };


  return (
    <div className="grid grid-cols-3 gap-6">

      {/* LEFT */}
      <div className="col-span-2 space-y-6">

        <div className="bg-gray-900 p-4 rounded-lg">
          <div className="mb-4 text-lg font-semibold">Stream Preview</div>
          <video ref={videoRef} autoPlay muted controls className="w-full h-64 bg-black" />
          <div className="mt-2 text-sm">
            {state === "OFFLINE" && <span className="text-gray-400">OFFLINE</span>}
            {state === "READY" && <span className="text-green-400">READY</span>}
            {state === "LIVE" && <span className="text-red-500">● LIVE</span>}
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg space-y-4">
          <p className="text-lg font-semibold">Stream Details</p>
          <p className="text-sm text-red-500">Title</p>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-gray-800 p-3" placeholder="Title" />
          <p className="text-sm text-red-500">Description</p>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-gray-800 p-3" placeholder="Description" />
          <p className="text-sm text-red-500">Category</p>
          <input value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-gray-800 p-3" placeholder="Category" />

          {!streamId && (
            <button onClick={handleCreateStream} className="bg-blue-600 w-full py-3">
              Create Stream
            </button>
          )}


          {streamId && (state === "READY" || state === "LIVE") && (
            <>
              <button onClick={handleSaveMeta} className="bg-gray-700 w-full py-3">
                Save Metadata
              </button>
              {streamId && state === "READY" && (
                <button
                  onClick={handleGoLive}
                  disabled={!isStreamDetected}
                  className="bg-red-600 w-full py-3"
                >
                  Go Live
                </button>
              )}
            </>
          )}

          {state === "LIVE" && (
            <button onClick={handleEndStream} className="bg-red-800 w-full py-3">
              End Stream
            </button>
          )}
        </div>
      </div>

      {/* CHAT */}
      <div className="bg-gray-900 rounded-lg flex flex-col h-[600px]">
        <div className="p-4 border-b border-gray-800 font-semibold">Stream Chat</div>

        <div className="flex-1 overflow-y-auto p-4 text-sm space-y-2">
          {chats.map((c, i) => (
            <div key={i}>
              <p className="text-gray-200">
                <span
                  style={{ color: getUserColor(c.username) }}
                  className="font-semibold"
                >
                  {c.username}:
                </span>{" "}
                {c.message}
              </p>

            </div>
          ))}
        </div>
        <div className="p-3 border-t border-gray-800 flex">
          <input
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-800 p-2 text-white"
          />
          <button
            onClick={sendChatMessage}
            className="bg-red-600 px-4 ml-2"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
};

export default GoLivePanel;
