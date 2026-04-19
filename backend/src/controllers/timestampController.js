import prisma from "../config/prismaClient.js";

// GET /timestamps/:streamId
export const getTimestamps = async (req, res) => {
  const { streamId } = req.params;
  const timestamps = await prisma.streamTimestamp.findMany({
    where: { stream_id: streamId },
    orderBy: { time_seconds: "asc" },
  });
  res.json(timestamps);
};