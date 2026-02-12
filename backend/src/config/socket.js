import { Server } from "socket.io";
import prisma from "./prismaClient.js";
import { checkPerspectiveToxicity } from "../../services/perspectiveService.js";


const messageTracker = {};
const lastMessageTracker = {};

const RATE_LIMIT_WINDOW = 5000; // 5 sec
const MAX_MESSAGES = 5;

const setupSocketIO = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {

    /* ================= JOIN STREAM ================= */
    socket.on("join_stream", (stream_id) => {
      socket.join(stream_id);

      const room = io.sockets.adapter.rooms.get(stream_id);
      const viewerCount = room ? room.size : 0;

      io.to(stream_id).emit("viewer_count", viewerCount);
    });

    /* ================= SEND MESSAGE ================= */
    socket.on("send_message", async ({ stream_id, user_id, message, username }) => {
      try {
        if (!message?.trim()) return;

        const user = await prisma.user.findUnique({
          where: { user_id: user_id },
        });

        if (!user) return;

        /* ===== 1️⃣ Permanent Block Check ===== */
        if (user.is_blocked) {
          return socket.emit("message_error", "You are permanently blocked.");
        }

        /* ===== 2️⃣ Timeout Check ===== */
        if (user.timeout_until && user.timeout_until > new Date()) {
          return socket.emit("message_error", "You are temporarily muted.");
        }

        /* ===== 3️⃣ Rate Limit Check ===== */
        if (isRateLimited(user_id)) {
          await logModeration(user_id, stream_id, "Rate limit spam");
          return socket.emit("message_error", "You're sending messages too fast.");
        }

        /* ===== 4️⃣ Repeated Message Check ===== */
        if (isRepeatedSpam(user_id, message)) {
          const action = await applyWarning(user_id);
          await logModeration(user_id, stream_id, "Repeated spam");

          if (action === "timeout") {
            return socket.emit("message_error", "You are temporarily muted for spam.");
          }

          return socket.emit("message_error", "Warning: Stop repeating messages.");
        }

        /* ===== 5️⃣ Caps Spam Check ===== */
        if (isCapsSpam(message)) {
          const action = await applyWarning(user_id);
          await logModeration(user_id, stream_id, "Caps spam");

          if (action === "timeout") {
            return socket.emit("message_error", "You are temporarily muted.");
          }

          return socket.emit("message_error", "Warning: Avoid excessive CAPS.");
        }

        /* ===== 4️⃣ Perspective AI Check ===== */
        const scores = await checkPerspectiveToxicity(message);


        if (!scores) {
          console.log("AI failed — allowing message.");
        }

        if (scores) {
          const { toxicity, insult, threat, identity } = scores;

          console.log(`AI Scores - T: ${toxicity.toFixed(2)}, I: ${insult.toFixed(2)}, Th: ${threat.toFixed(2)}, Id: ${identity.toFixed(2)}`);
          // 🔥 Define threshold
          if (
            toxicity > 0.8 ||
            insult > 0.8 ||
            threat > 0.7 ||
            identity > 0.75
          ) {
            const action = await applyWarning(user_id);

            await prisma.moderationLog.create({
              data: {
                user_id,
                stream_id,
                reason: `AI Toxicity detected (T:${toxicity.toFixed(2)})`,
              },
            });

            if (action === "timeout") {
              return socket.emit(
                "message_error",
                "You are temporarily muted due to inappropriate language."
              );
            }

            return socket.emit(
              "message_error",
              "Warning: Inappropriate message detected."
            );
          }
        }

        /* ===== SAVE MESSAGE ===== */
        const savedMessage = await prisma.chat.create({
          data: {
            stream_id,
            user_id,
            message,
            sent_at: new Date(),
          },
        });

        io.to(stream_id).emit("new_message", {
          ...savedMessage,
          username,
        });

      } catch (error) {
        console.error("Message error:", error);
        socket.emit("message_error", "Message failed.");
      }
    });

    /* ================= DISCONNECT ================= */
    socket.on("disconnecting", () => {
      socket.rooms.forEach((room) => {
        if (room !== socket.id) {
          const roomData = io.sockets.adapter.rooms.get(room);
          const count = roomData ? roomData.size - 1 : 0;
          io.to(room).emit("viewer_count", count);
        }
      });
    });

  });
};

/* ================= MODERATION HELPERS ================= */

const isRateLimited = (userId) => {
  const now = Date.now();

  if (!messageTracker[userId]) {
    messageTracker[userId] = [];
  }

  messageTracker[userId] = messageTracker[userId].filter(
    time => now - time < RATE_LIMIT_WINDOW
  );

  messageTracker[userId].push(now);

  return messageTracker[userId].length > MAX_MESSAGES;
};

const isRepeatedSpam = (userId, message) => {
  if (!lastMessageTracker[userId]) {
    lastMessageTracker[userId] = { message, count: 1 };
    return false;
  }

  if (lastMessageTracker[userId].message === message) {
    lastMessageTracker[userId].count++;
  } else {
    lastMessageTracker[userId] = { message, count: 1 };
  }

  return lastMessageTracker[userId].count >= 3;
};

const isCapsSpam = (message) => {
  const letters = message.replace(/[^a-zA-Z]/g, "");
  if (!letters.length) return false;

  const upper = letters.replace(/[^A-Z]/g, "");
  return upper.length / letters.length > 0.7;
};

const applyWarning = async (user_id) => {
  const user = await prisma.user.findUnique({
    where: { user_id: user_id },
  });

  if (user.warning_count < 2) {
    await prisma.user.update({
      where: { user_id: user_id },
      data: { warning_count: { increment: 1 } },
    });
    return "warn";
  } else {
    await prisma.user.update({
      where: { user_id: user_id },
      data: {
        timeout_until: new Date(Date.now() + 5 * 60 * 1000),
      },
    });
    return "timeout";
  }
};

const logModeration = async (user_id, stream_id, reason) => {
  await prisma.moderationLog.create({
    data: {
      user_id,
      stream_id,
      reason,
      created_at: new Date(),
    },
  });
};

export default setupSocketIO;
