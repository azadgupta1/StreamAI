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
    if (!window.confirm("Regenerating will invalidate your current stream. Continue?"))
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
    return <div className="text-gray-400">Loading stream key...</div>;
  }

  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-bold text-red-500 mb-6">
        Stream Settings
      </h2>

      <div className="bg-gray-900 p-6 rounded-lg space-y-4">

        {/* RTMP URL */}
        <div>
          <label className="text-sm text-gray-400">RTMP Server</label>
          <input
            value={RTMP_URL}
            disabled
            className="w-full bg-gray-800 p-3 rounded-md mt-1"
          />
        </div>

        {/* STREAM KEY */}
        <div>
          <label className="text-sm text-gray-400">Stream Key</label>
          <div className="flex gap-2 mt-1">
            <input
              value={visible ? streamKey : "••••••••••••••••••••"}
              disabled
              className="flex-1 bg-gray-800 p-3 rounded-md"
            />

            <button
              onClick={() => setVisible(!visible)}
              className="px-4 bg-gray-700 rounded-md"
            >
              {visible ? "Hide" : "Show"}
            </button>

            <button
              onClick={handleCopy}
              className="px-4 bg-blue-600 rounded-md"
            >
              Copy
            </button>

            <button
              onClick={handleReset}
              className="px-4 bg-red-600 rounded-md"
            >
              Reset
            </button>
          </div>
        </div>

        {/* WARNING */}
        <div className="bg-yellow-900/20 border border-yellow-700 p-4 rounded-md text-sm">
          Never share your stream key with anyone. If leaked, regenerate immediately.
        </div>
      </div>
    </div>
  );
};

export default StreamPanel;
