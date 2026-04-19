import prisma from "../config/prismaClient.js";

// GET /summary/:streamId
export const getSummary = async (req, res) => {
  const { streamId } = req.params;

  const summary = await prisma.streamSummary.findUnique({
    where: { stream_id: streamId },
  });

  res.json(summary || { summary: null });
};