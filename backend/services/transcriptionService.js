import speech from "@google-cloud/speech";
import ffmpeg from "fluent-ffmpeg";
import EventEmitter from "events";

class TranscriptionService extends EventEmitter {
  constructor(streamId, streamKey) {
    super();
    this.streamId = streamId;
    this.streamKey = streamKey;
    this.client = new speech.SpeechClient();
    this.ffmpegCommand = null;
    this.recognizeStream = null;
    this.retryCount = 0;
    this.maxRetries = 99; // infinite for live streams
    this.isStopped = false;
    this.isRestarting = false; // 🔥 prevent duplicate restarts
  }

  start() {
    if (this.isStopped) return;
    console.log(`🎤 Starting transcription: ${this.streamId}`);
    setTimeout(() => {
      if (!this.isStopped) this.startPipeline();
    }, 4000);
  }

  startPipeline() {
    if (this.isStopped) return;

    const streamUrl = `${process.env.STREAM_URL}/${this.streamKey}.m3u8`;
    console.log("🔗 Using stream URL:", streamUrl);

    const request = {
      config: {
        encoding: "LINEAR16",
        sampleRateHertz: 16000,
        languageCode: "en-US",
        enableAutomaticPunctuation: true,
        enableWordTimeOffsets: true,
        model: "latest_long",
      },
      interimResults: true,
    };

    this.recognizeStream = this.client
      .streamingRecognize(request)
      .on("data", async (data) => {
        const result = data.results[0];
        if (!result) return;

        const alt = result.alternatives[0];
        const transcriptData = {
          stream_id: this.streamId,
          text: alt.transcript,
          final: result.isFinal,
          words: alt.words?.map(w => ({
            word: w.word,
            startTime: w.startTime,
            endTime: w.endTime,
          })) || [],
        };

        this.emit("transcript", transcriptData);

        if (result.isFinal) {
          console.log("📝 FINAL:", transcriptData.text);
        }
      })
      .on("error", (err) => {
        // 305s limit hit — this is expected, just restart cleanly
        console.warn("⚠️ STT stream ended:", err.message);
        this.triggerRestart();
      })
      .on("end", () => {
        console.log("⚠️ STT stream ended naturally");
        this.triggerRestart();
      });

    this.ffmpegCommand = ffmpeg(streamUrl)
      .audioChannels(1)
      .audioFrequency(16000)
      .format("s16le")
      .on("start", (cmd) => {
        console.log("🎬 FFmpeg started:", cmd);
        this.isRestarting = false; // 🔥 pipeline is up, reset flag
      })
      .on("error", (err) => {
        // Only restart if this wasn't triggered by us killing ffmpeg
        if (!this.isRestarting && !this.isStopped) {
          console.error("❌ FFmpeg Error:", err.message);
          this.triggerRestart();
        }
      })
      .on("end", () => {
        if (!this.isRestarting && !this.isStopped) {
          console.log("⚠️ FFmpeg stream ended");
          this.triggerRestart();
        }
      });

    const ffmpegStream = this.ffmpegCommand.pipe();
    ffmpegStream.pipe(this.recognizeStream);
  }

  // 🔥 Single entry point for all restarts — prevents duplicates
  triggerRestart() {
    if (this.isStopped) return;
    if (this.isRestarting) {
      console.log("⏭️ Restart already in progress, skipping");
      return;
    }

    this.isRestarting = true;
    this.retryCount++;
    console.log(`🔄 Restarting pipeline... Attempt ${this.retryCount}`);

    this.stopInternal(); // kill ffmpeg + STT (won't trigger more restarts)

    const delay = Math.min(3000 * this.retryCount, 15000); // backoff up to 15s
    setTimeout(() => {
      if (!this.isStopped) {
        this.startPipeline(); // skip the 4s delay on restarts
      }
    }, delay);
  }

  stopInternal() {
    if (this.ffmpegCommand) {
      try { this.ffmpegCommand.kill("SIGKILL"); } catch {}
      this.ffmpegCommand = null;
    }
    if (this.recognizeStream) {
      try { this.recognizeStream.destroy(); } catch {}
      this.recognizeStream = null;
    }
  }

  stop() {
    console.log("🛑 Stopping transcription:", this.streamId);
    this.isStopped = true;
    this.isRestarting = true; // prevent any pending restart from firing
    this.stopInternal();
  }
}

export default TranscriptionService;