
import prisma from "../config/prismaClient.js";

// GET /analytics/:streamId
export const getAnalytics = async (req, res) => {
  const { streamId } = req.params;

  const [stream, chatHistory] = await Promise.all([
    prisma.stream.findUnique({
      where: { stream_id: streamId },
      include: { likes: true, chats: true },
    }),
    // Get chat counts grouped by minute for the engagement chart
    prisma.$queryRaw`
      SELECT 
        DATE_TRUNC('minute', sent_at) as minute,
        COUNT(*) as comment_count
      FROM "Chat"
      WHERE stream_id = ${streamId}
      GROUP BY minute
      ORDER BY minute ASC
      LIMIT 20
    `,
  ]);

  if (!stream) return res.status(404).json({ error: "Stream not found" });

  res.json({
    likes: stream.likes.length,
    comments: stream.chats.length,
    chatHistory: chatHistory.map(r => ({
      t: new Date(r.minute).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      comments: Number(r.comment_count),
    })),
  });
};