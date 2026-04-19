import prisma from "../config/prismaClient.js";

// GET /transcripts/:streamId
export const getTranscripts = async (req, res) => {
  const { streamId } = req.params;
  const transcripts = await prisma.transcript.findMany({
    where: { stream_id: streamId, is_final: true },
    orderBy: { start_time: "asc" },
  });
  res.json(transcripts);
};