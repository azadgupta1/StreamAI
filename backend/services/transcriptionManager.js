import TranscriptionService from "./transcriptionService.js";

class TranscriptionManager {
  constructor() {
    this.streams = new Map();
  }

  start(streamId, streamKey) {
    if (this.streams.has(streamId)) return;

    const service = new TranscriptionService(streamId, streamKey);

    // service.on("transcript", (data) => {
    //   service.retryCount = 0;
    //   global.io.to(streamId).emit("live_transcript", data);
    // });






    service.on("transcript", async (data) => {
      service.retryCount = 0;

      try {
        // ⚠️ ONLY SAVE FINAL TRANSCRIPTS
        if (data.final) {
          let startTime = null;
          let endTime = null;

          if (data.words && data.words.length > 0) {
            const first = data.words[0];
            const last = data.words[data.words.length - 1];

            startTime =
              parseFloat(first?.startTime?.seconds || 0) +
              (first?.startTime?.nanos || 0) / 1e9;

            endTime =
              parseFloat(last?.endTime?.seconds || 0) +
              (last?.endTime?.nanos || 0) / 1e9;
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

      // ✅ Always emit to frontend (both interim + final)
      global.io.to(streamId).emit("live_transcript", data);
    });







    


    service.start();
    this.streams.set(streamId, service);

    console.log(`🎤 Started transcription: ${streamId}`);
  }

  stop(streamId) {
    const service = this.streams.get(streamId);
    if (!service) return;

    service.stop();
    this.streams.delete(streamId);

    console.log(`🛑 Stopped transcription: ${streamId}`);
  }
}

export default new TranscriptionManager();