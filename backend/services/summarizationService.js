import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "../src/config/prismaClient.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

const SUMMARY_INTERVAL_MS = 2 * 60 * 1000;

class SummarizationService {
  constructor(streamId) {
    this.streamId = streamId;
    this.intervalHandle = null;
    this.isStopped = false;
    this.previousSummary = null;
  }

  start() {
    console.log(`📝 Starting summarization: ${this.streamId}`);
    this.intervalHandle = setInterval(() => {
      this.generateSummary();
    }, SUMMARY_INTERVAL_MS);
  }

  async generateSummary() {
    if (this.isStopped) return;

    try {
      const recentTranscripts = await prisma.transcript.findMany({
        where: { stream_id: this.streamId, is_final: true },
        orderBy: { start_time: "asc" },
      });

      if (!recentTranscripts.length) return;

      const fullText = recentTranscripts.map((t) => t.text).join(" ");

      const prompt = this.previousSummary
        ? `You are summarizing a live stream in real-time.

Previous summary:
"${this.previousSummary}"

New transcript since last summary:
"${fullText}"

Update the summary incorporating the new content. Keep it concise (3-5 sentences), present tense. Return only the updated summary text, no preamble.`
        : `You are summarizing a live stream in real-time.

Transcript so far:
"${fullText}"

Write a concise summary (3-5 sentences) of what has been discussed. Present tense. Return only the summary text, no preamble.`;

      const result = await model.generateContent(prompt);
      const summary = result.response.text().trim();

      this.previousSummary = summary;

      await prisma.streamSummary.upsert({
        where: { stream_id: this.streamId },
        update: { summary, updated_at: new Date() },
        create: { stream_id: this.streamId, summary, updated_at: new Date() },
      });

      global.io.to(this.streamId).emit("live_summary", { summary });
      console.log(`✅ Summary updated: ${this.streamId}`);

    } catch (err) {
      console.error("❌ Summarization error:", err.message);
    }
  }

  stop() {
    console.log(`🛑 Stopping summarization: ${this.streamId}`);
    this.isStopped = true;
    if (this.intervalHandle) {
      clearInterval(this.intervalHandle);
      this.intervalHandle = null;
    }
    this.generateSummary(); // final summary on stream end
  }
}

export default SummarizationService;