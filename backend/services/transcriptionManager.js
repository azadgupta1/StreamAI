import TranscriptionService from "./transcriptionService.js";

class TranscriptionManager {
  constructor() {
    this.streams = new Map();
  }

  start(streamId, streamKey) {
    if (this.streams.has(streamId)) return;

    const service = new TranscriptionService(streamId, streamKey);

    service.on("transcript", (data) => {
      service.retryCount = 0;
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