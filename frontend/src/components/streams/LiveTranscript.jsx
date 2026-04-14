import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";

// ❌ Remove: const socket = io(...)  — no longer creating its own socket

const LiveTranscript = ({ socket, streamId, videoRef }) => {
  const [finalText, setFinalText] = useState("");
  const [segments, setSegments] = useState([]);
  const [interimText, setInterimText] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => { 
    if (!streamId || !socket) return;

    // No need to join again — ChatSection already joined this room
    // Just listen for transcripts
    const handleTranscript = (data) => {
      if (data.stream_id !== streamId) return;

      if (data.final) {
        setSegments((prev) => [...prev, {
          text: data.text,
          words: data.words, // [{ word, startTime: { seconds }, endTime: { seconds } }]
        }]);
        setInterimText("");
      } else {
        setInterimText(data.text);
      }
    };

    socket.on("live_transcript", handleTranscript);

    // ✅ Correct cleanup — matches the event we subscribed to
    return () => {
      socket.off("live_transcript", handleTranscript);
    };
  }, [streamId, socket]);

  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;

    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, [videoRef]);

  // Helper to get seconds from Google's duration object
  const toSeconds = (duration) => {
    if (!duration) return 0;
    return parseFloat(duration.seconds || 0) + (duration.nanos || 0) / 1e9;
  };

  return (
    <div className="bg-gray-950 text-white p-4 rounded-lg font-mono w-full space-y-2 max-h-[300px] overflow-y-auto overflow-x-hidden wrap-break-word">
      {segments.map((seg, si) => (
        <p key={si} className="leading-relaxed">
          {seg.words.length > 0
            ? seg.words.map((w, wi) => {
                const start = toSeconds(w.startTime);
                const end = toSeconds(w.endTime);
                const isActive = currentTime >= start && currentTime <= end;
                const isPast = currentTime > end;

                return (
                  <span
                    key={wi}
                    onClick={() => {
                      if (videoRef?.current) {
                        videoRef.current.currentTime = toSeconds(w.startTime);
                      }
                    }}
                    className={`mr-1 transition-colors duration-150 ${
                      isActive
                        ? "text-green-400 font-bold"   // currently spoken
                        : isPast
                        ? "text-gray-400"               // already spoken
                        : "text-gray-600"               // not yet spoken
                    }`}
                  >
                    {w.word}
                  </span>
                );
              })
            : <span className="text-gray-400">{seg.text}</span>
          }
        </p>
      ))}

      {/* Interim live text */}
      {interimText && (
        <span className="text-yellow-400 italic">{interimText}</span>
      )}
      <span className="animate-pulse">|</span>
    </div>
  );
};

export default LiveTranscript;