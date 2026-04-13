import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";

const StreamPanel = () => {
  const [streamKey, setStreamKey] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const RTMP_URL = "rtmp://stream.streamai.in/live";

  /* ================= LOAD / GENERATE STREAM KEY ================= */
  useEffect(() => {
    const loadKey = async () => {
      try {
        const res = await axiosInstance.get("streamkey/generate");
        setStreamKey(res.data.streamKey.stream_key);
      } catch (err) {
        console.error("Error fetching stream key:", err);
      } finally {
        setLoading(false);
      }
    };

    loadKey();
  }, []);

  /* ================= REGENERATE STREAM KEY ================= */
  const handleReset = async () => {
    if (
      !window.confirm(
        "Regenerating will invalidate your current stream. Continue?",
      )
    )
      return;

    try {
      setLoading(true);
      const res = await axiosInstance.post("streamkey/regenerate");
      setStreamKey(res.data.streamKey.stream_key);
      setVisible(false);
    } catch (err) {
      console.error("Error regenerating key:", err);
      alert("Failed to regenerate stream key");
    } finally {
      setLoading(false);
    }
  };

  /* ================= COPY STREAM KEY ================= */
  const handleCopy = () => {
    navigator.clipboard.writeText(streamKey);
    alert("Stream key copied");
  };

  if (loading) {
    return (
      <div className="w-full rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 via-black to-gray-950 p-6 text-gray-300 shadow-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-7 w-48 rounded bg-gray-800"></div>
          <div className="h-24 rounded-xl bg-gray-800/70"></div>
          <div className="h-24 rounded-xl bg-gray-800/70"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-wide text-white">
            Stream Settings
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Manage your RTMP server and stream key
          </p>
        </div>
        <div className="h-1 w-20 rounded-full bg-[#5af04f] shadow-[0_0_20px_#5af04f66]" />
      </div>

      <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 via-black to-gray-950 p-5 sm:p-6 shadow-lg space-y-6">
        {/* RTMP URL */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            RTMP Server
          </label>
          <div className="relative">
            <input
              value={RTMP_URL}
              disabled
              className="w-full rounded-lg border border-gray-800 bg-gray-900 px-4 py-3 pr-28 text-white outline-none opacity-90"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-[#5af04f]/10 px-3 py-1 text-xs font-semibold text-[#5af04f]">
              RTMP
            </span>
          </div>
        </div>

        {/* STREAM KEY */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            Stream Key
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={visible ? streamKey : "••••••••••••••••••••"}
              disabled
              className="flex-1 rounded-lg border border-gray-800 bg-gray-900 px-4 py-3 text-white outline-none opacity-90"
            />

            <div className="grid grid-cols-3 gap-2 sm:flex">
              <button
                onClick={() => setVisible(!visible)}
                className="rounded-lg border border-gray-800 bg-gray-900 px-4 py-3 font-medium text-gray-200 transition hover:border-[#5af04f]/50 hover:text-[#5af04f] cursor-pointer"
              >
                {visible ? "Hide" : "Show"}
              </button>

              <button
                onClick={handleCopy}
                className="rounded-lg bg-[#5af04f] px-4 py-3 font-semibold text-black transition hover:bg-[#49d63f] hover:shadow-[0_0_15px_#5af04f55] cursor-pointer"
              >
                Copy
              </button>

              <button
                onClick={handleReset}
                className="rounded-lg bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700 hover:shadow-[0_0_15px_#dc262655] cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* WARNING */}
        <div className="rounded-xl border border-yellow-700/60 bg-yellow-950/20 p-4 text-sm text-yellow-200">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 h-2.5 w-2.5 rounded-full bg-yellow-400 shadow-[0_0_12px_#facc1566]" />
            <p>
              Never share your stream key with anyone. If it leaks, regenerate
              it immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamPanel;

// import { useEffect, useState } from "react";
// import { axiosInstance } from "../../lib/axios";

// const StreamPanel = () => {
//   const [streamKey, setStreamKey] = useState("");
//   const [visible, setVisible] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const RTMP_URL = "rtmp://stream.streamai.in/live";

//   /* ================= LOAD / GENERATE STREAM KEY ================= */
//   useEffect(() => {
//     const loadKey = async () => {
//       try {
//         const res = await axiosInstance.get("streamkey/generate");
//         setStreamKey(res.data.streamKey.stream_key);
//       } catch (err) {
//         console.error("Error fetching stream key:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadKey();
//   }, []);

//   /* ================= REGENERATE STREAM KEY ================= */
//   const handleReset = async () => {
//     if (!window.confirm("Regenerating will invalidate your current stream. Continue?"))
//       return;

//     try {
//       setLoading(true);
//       const res = await axiosInstance.post("streamkey/regenerate");
//       setStreamKey(res.data.streamKey.stream_key);
//       setVisible(false);
//     } catch (err) {
//       console.error("Error regenerating key:", err);
//       alert("Failed to regenerate stream key");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= COPY STREAM KEY ================= */
//   const handleCopy = () => {
//     navigator.clipboard.writeText(streamKey);
//     alert("Stream key copied");
//   };

//   if (loading) {
//     return <div className="text-gray-400">Loading stream key...</div>;
//   }

//   return (
//     <div className="max-w-3xl">
//       <h2 className="text-2xl font-bold text-red-500 mb-6">
//         Stream Settings
//       </h2>

//       <div className="bg-gray-900 p-6 rounded-lg space-y-4">

//         {/* RTMP URL */}
//         <div>
//           <label className="text-sm text-gray-400">RTMP Server</label>
//           <input
//             value={RTMP_URL}
//             disabled
//             className="w-full bg-gray-800 p-3 rounded-md mt-1"
//           />
//         </div>

//         {/* STREAM KEY */}
//         <div>
//           <label className="text-sm text-gray-400">Stream Key</label>
//           <div className="flex gap-2 mt-1">
//             <input
//               value={visible ? streamKey : "••••••••••••••••••••"}
//               disabled
//               className="flex-1 bg-gray-800 p-3 rounded-md"
//             />

//             <button
//               onClick={() => setVisible(!visible)}
//               className="px-4 bg-gray-700 rounded-md"
//             >
//               {visible ? "Hide" : "Show"}
//             </button>

//             <button
//               onClick={handleCopy}
//               className="px-4 bg-blue-600 rounded-md"
//             >
//               Copy
//             </button>

//             <button
//               onClick={handleReset}
//               className="px-4 bg-red-600 rounded-md"
//             >
//               Reset
//             </button>
//           </div>
//         </div>

//         {/* WARNING */}
//         <div className="bg-yellow-900/20 border border-yellow-700 p-4 rounded-md text-sm">
//           Never share your stream key with anyone. If leaked, regenerate immediately.
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StreamPanel;
