import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";
import { axiosInstance } from "../../lib/axios";

const LiveTranscript = ({ socket, streamId, videoRef }) => {
  const [segments, setSegments] = useState([]);
  const [interimText, setInterimText] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setLoading] = useState(true);

  // 🔥 Load existing transcripts for late viewers
  useEffect(() => {
    if (!streamId) return;

    axiosInstance.get(`/transcripts/${streamId}`)
      .then(res => {
        // DB transcripts don't have words array, map to same segment shape
        const historical = res.data.map(t => ({
          text: t.text,
          words: [],              // no word-level data from DB
          start_time: t.start_time,
          end_time: t.end_time,
          fromDB: true,
        }));
        setSegments(historical);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [streamId]);

  // Live transcripts via socket
  useEffect(() => {
    if (!streamId || !socket) return;

    const handleTranscript = (data) => {
      if (data.stream_id !== streamId) return;

      if (data.final) {
        setSegments(prev => [...prev, {
          text: data.text,
          words: data.words,
          fromDB: false,
        }]);
        setInterimText("");
      } else {
        setInterimText(data.text);
      }
    };

    socket.on("live_transcript", handleTranscript);
    return () => socket.off("live_transcript", handleTranscript);
  }, [streamId, socket]);

  // Track video time
  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;
    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, [videoRef]);

  const toSeconds = (duration) => {
    if (!duration) return 0;
    return parseFloat(duration.seconds || 0) + (duration.nanos || 0) / 1e9;
  };

  const seekTo = (seconds) => {
    if (videoRef?.current) videoRef.current.currentTime = seconds;
  };

  if (loading) return (
    <div className="text-gray-600 text-sm italic p-4">Loading transcript...</div>
  );

  return (
    <div className="bg-gray-950 text-white p-4 rounded-lg font-mono w-full space-y-2 max-h-[300px] overflow-y-auto overflow-x-hidden">

      {!segments.length && !interimText && (
        <p className="text-gray-600 text-sm italic">
          Transcript will appear here as the stream progresses...
        </p>
      )}

      {segments.map((seg, si) => (
        <p key={si} className="leading-relaxed">
          {/* Live segments: word-level highlighting + seeking */}
          {!seg.fromDB && seg.words?.length > 0
            ? seg.words.map((w, wi) => {
                const start = toSeconds(w.startTime);
                const end = toSeconds(w.endTime);
                const isActive = currentTime >= start && currentTime <= end;
                const isPast = currentTime > end;

                return (
                  <span
                    key={wi}
                    onClick={() => seekTo(start)}
                    className={`mr-1 cursor-pointer transition-colors duration-150 ${
                      isActive ? "text-green-400 font-bold"
                      : isPast  ? "text-gray-400"
                                : "text-gray-600"
                    }`}
                  >
                    {w.word}
                  </span>
                );
              })
            : /* Historical or no-word segments: plain text, click seeks to start_time */
              <span
                onClick={() => seg.start_time != null && seekTo(seg.start_time)}
                className={`text-gray-400 ${seg.start_time != null ? "cursor-pointer hover:text-gray-200" : ""} transition-colors`}
              >
                {seg.text}
              </span>
          }
        </p>
      ))}

      {interimText && (
        <span className="text-yellow-400 italic">{interimText}</span>
      )}
      <span className="animate-pulse">|</span>
    </div>
  );
};

export default LiveTranscript;