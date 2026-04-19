import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "../src/config/prismaClient.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

const TIMESTAMP_INTERVAL_MS = 0.5 * 60 * 1000; // every 2 min

class TimestampService {
  constructor(streamId) {
    this.streamId = streamId;
    this.intervalHandle = null;
    this.isStopped = false;
    this.processedUpTo = 0; // track last processed transcript end_time
  }

  start() {
    console.log(`⏱️ Starting timestamp service: ${this.streamId}`);
    this.intervalHandle = setInterval(() => {
      this.detectKeyMoments();
    }, TIMESTAMP_INTERVAL_MS);
  }

  async detectKeyMoments() {
    if (this.isStopped) return;

    try {
      // Only fetch NEW transcripts since last run
      const newTranscripts = await prisma.transcript.findMany({
        where: {
          stream_id: this.streamId,
          is_final: true,
          start_time: { gt: this.processedUpTo },
        },
        orderBy: { start_time: "asc" },
      });

      if (!newTranscripts.length) return;

      // Build text with timestamps for Gemini
      const transcriptWithTimes = newTranscripts
        .map((t) => `[${formatTime(t.start_time)}] ${t.text}`)
        .join("\n");

      const prompt = `You are analyzing a live stream transcript to identify key moments worth timestamping.

Transcript (format: [MM:SS] text):
${transcriptWithTimes}

Identify 1-4 key moments from this transcript segment. A key moment is when:
- A new topic is introduced
- An important concept is explained
- A significant demo or example starts
- A question is asked and answered
- A major point is made

Return ONLY a valid JSON array, no markdown, no explanation:
[
  { "time": "MM:SS", "label": "Short description under 6 words" }
]

If there are no key moments, return an empty array: []`;

      let lastError;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          const result = await model.generateContent(prompt);
          const raw = result.response.text().trim();

          // Strip markdown fences if present
          const clean = raw.replace(/```json|```/g, "").trim();
          const moments = JSON.parse(clean);

          if (!Array.isArray(moments) || !moments.length) break;

          // Save to DB and emit each moment
          for (const moment of moments) {
            const seconds = timeToSeconds(moment.time);

            await prisma.streamTimestamp.create({
              data: {
                stream_id: this.streamId,
                label: moment.label,
                time_seconds: seconds,
                time_label: moment.time,
              },
            });

            global.io.to(this.streamId).emit("live_timestamp", {
              label: moment.label,
              time_seconds: seconds,
              time_label: moment.time,
            });
          }

          // Advance our cursor
          const last = newTranscripts[newTranscripts.length - 1];
          this.processedUpTo = last.end_time ?? last.start_time;

          console.log(`⏱️ ${moments.length} timestamps added: ${this.streamId}`);
          break;

        } catch (err) {
          lastError = err;
          if (err.message?.includes("429")) {
            const wait = attempt * 5000;
            console.warn(`⚠️ Gemini rate limit, retrying in ${wait / 1000}s...`);
            await new Promise((r) => setTimeout(r, wait));
          } else {
            throw err;
          }
        }
      }

    } catch (err) {
      console.error("❌ Timestamp error:", err.message);
    }
  }

  stop() {
    console.log(`🛑 Stopping timestamp service: ${this.streamId}`);
    this.isStopped = true;
    if (this.intervalHandle) {
      clearInterval(this.intervalHandle);
      this.intervalHandle = null;
    }
    this.detectKeyMoments(); // one final pass
  }
}

// "MM:SS" → seconds
const timeToSeconds = (timeStr) => {
  const [mm, ss] = timeStr.split(":").map(Number);
  return mm * 60 + ss;
};

// seconds → "MM:SS"
const formatTime = (seconds) => {
  if (!seconds) return "00:00";
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

export default TimestampService;