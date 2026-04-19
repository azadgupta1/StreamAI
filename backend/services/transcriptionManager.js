import TranscriptionService from "./transcriptionService.js";
import SummarizationService from "./summarizationService.js";
import prisma from "../src/config/prismaClient.js";

class TranscriptionManager {
  constructor() {
    this.streams = new Map();
    this.summarizers = new Map(); // 🔥 track summarizers separately
  }

  start(streamId, streamKey) {
    if (this.streams.has(streamId)) return;

    const service = new TranscriptionService(streamId, streamKey);

    service.on("transcript", async (data) => {
      service.retryCount = 0;

      try {
        if (data.final) {
          let startTime = null;
          let endTime = null;

          if (data.words?.length > 0) {
            const first = data.words[0];
            const last = data.words[data.words.length - 1];
            startTime = parseFloat(first?.startTime?.seconds || 0) + (first?.startTime?.nanos || 0) / 1e9;
            endTime = parseFloat(last?.endTime?.seconds || 0) + (last?.endTime?.nanos || 0) / 1e9;
          }

          await prisma.transcript.create({
            data: {
              stream_id: data.stream_id,
              text: data.text,
              is_final: true,
              start_time: startTime,
              end_time: endTime,
            },
          });
        }
      } catch (err) {
        console.error("❌ DB Transcript Save Error:", err.message);
      }

      global.io.to(streamId).emit("live_transcript", data);
    });

    service.start();
    this.streams.set(streamId, service);

    // 🔥 Start summarizer
    const summarizer = new SummarizationService(streamId);
    summarizer.start();
    this.summarizers.set(streamId, summarizer);

    console.log(`🎤 Started transcription: ${streamId}`);
  }

  stop(streamId) {
    const service = this.streams.get(streamId);
    if (service) {
      service.stop();
      this.streams.delete(streamId);
    }

    // 🔥 Stop summarizer
    const summarizer = this.summarizers.get(streamId);
    if (summarizer) {
      summarizer.stop();
      this.summarizers.delete(streamId);
    }

    console.log(`🛑 Stopped transcription: ${streamId}`);
  }
}

export default new TranscriptionManager();