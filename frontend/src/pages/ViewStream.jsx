import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

const ViewStream = () => {
  const videoRef = useRef(null);
  const streamUrl = "http://localhost:8080/hls/test.m3u8";


  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(streamUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });

      // cleanup on unmount
      return () => {
        hls.destroy();
      };
    } 
    else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = streamUrl;
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });
    } 
    else {
      alert("Your browser does not support HLS playback.");
    }
  }, []);

  return (
    <div>
      <h1>StreamAI Live Stream</h1>
      <video
        ref={videoRef}
        controls
        autoPlay
        width="720"
        height="405"
      />
    </div>
  );
};

export default ViewStream;
