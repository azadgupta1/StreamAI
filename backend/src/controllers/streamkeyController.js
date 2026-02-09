import prisma from "../config/prismaClient.js";
import crypto from "crypto";

// Helper function to generate a unique stream key
const generateUniqueStreamKey = async () => {
  let streamKey = crypto.randomBytes(8).toString("hex");
  let streamKeyExists = await prisma.streamKey.findUnique({
    where: { stream_key: streamKey },
  });

  // Keep generating a unique key if a duplicate exists
  while (streamKeyExists) {
    streamKey = crypto.randomBytes(8).toString("hex");
    streamKeyExists = await prisma.streamKey.findUnique({
      where: { stream_key: streamKey },
    });
  }

  return streamKey;
};

// Generate a new stream key for the user
export const generateStreamKey = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const existingStreamKey = await prisma.streamKey.findFirst({
      where: { streamer_id: userId },
    });

    if (existingStreamKey) {
      return res.status(200).json({
        message: "Stream key already exists",
        streamKey: existingStreamKey,
      });
    }

    const streamKey = await generateUniqueStreamKey();

    const newStreamKey = await prisma.streamKey.create({
      data: {
        streamer_id: userId,
        stream_key: streamKey,
      },
    });

    return res.status(201).json({ streamKey: newStreamKey });
  } catch (error) {
    console.error("Error generating stream key:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Get the stream key for the user
export const getStreamKey = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const streamKey = await prisma.streamKey.findFirst({
      where: { streamer_id: userId },
    });

    if (!streamKey) {
      return res.status(404).json({ error: "Stream key not found" });
    }

    return res.status(200).json({ streamKey });
  } catch (error) {
    console.error("Error retrieving stream key:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Regenerate the stream key for the user
export const regenerateStreamKey = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    // Find the existing stream key
    const existingStreamKey = await prisma.streamKey.findFirst({
      where: { streamer_id: userId },
    });

    // If no stream key exists, return an error
    if (!existingStreamKey) {
      return res.status(404).json({
        error: "No stream key found for this user. Please generate one first.",
      });
    }

    // Delete the old stream key
    await prisma.streamKey.delete({
      where: {
        key_id: existingStreamKey.key_id,
      },
    });

    // Generate a new unique stream key
    const newStreamKey = await generateUniqueStreamKey();

    // Create the new stream key
    const createdStreamKey = await prisma.streamKey.create({
      data: {
        streamer_id: userId,
        stream_key: newStreamKey,
      },
    });

    return res.status(201).json({ streamKey: createdStreamKey });
  } catch (error) {
    console.error("Error regenerating stream key:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Validate the stream key
export const validateStreamKey = async (req, res) => {
  try {
    const { streamKey } = req.query;
    if (!streamKey) {
      return res.status(400).json({ error: "Stream key is required" });
    }

    const validStreamKey = await prisma.streamKey.findUnique({
      where: { stream_key: streamKey },
    });

    if (!validStreamKey) {
      return res.status(404).json({ error: "Stream key not found" });
    }

    return res.status(200).json({ message: "Stream key is valid" });
  } catch (error) {
    console.error("Error validating stream key:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
