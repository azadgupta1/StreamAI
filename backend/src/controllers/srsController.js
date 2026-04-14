import prisma from '../config/prismaClient.js';
import transcriptionManager from "../../services/transcriptionManager.js";

export const onPublish = async (req, res) => {
  const { stream } = req.body; // streamKey
  console.log(req.body);
  console.log(`🔔 Stream published: ${stream}`);

  const streamData = await prisma.stream.findFirst({
    where: { stream_key: stream },
  });

  if (!streamData) return res.sendStatus(404);

  await prisma.stream.update({
    where: { stream_id: streamData.stream_id },
    data: {
      is_live: true,
      started_at: new Date(),
    },
  });
  console.log(` ${streamData.stream_id} ${stream}`);

  transcriptionManager.start(streamData.stream_id, stream);

  res.json({ code: 0 });
};

export const onUnpublish = async (req, res) => {
  const { stream } = req.body;

  const streamData = await prisma.stream.findFirst({
    where: { stream_key: stream },
  });

  if (!streamData) return res.sendStatus(404);

  await prisma.stream.update({
    where: { stream_id: streamData.stream_id },
    data: {
      is_live: false,
      ended_at: new Date(),
    },
  });

  transcriptionManager.stop(streamData.stream_id);

  res.json({ code: 0 });
};