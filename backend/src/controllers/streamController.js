import prisma from "../config/prismaClient.js";


// Create Stream
export const createStream = async (req, res) => {
  try {
    const { title, description, category_id, thumbnail } = req.body;
    const streamer_id = req.userId; // Assuming the user's ID is available from the JWT
    await prisma.stream.updateMany({
      where: {
        streamer_id: streamer_id,
        ended_at: null,
      },
      data: {
        ended_at: new Date(),
        is_live: false,
      },
    });



    const stream = await prisma.stream.create({
      data: {
        title,
        description,
        category_id,
        thumbnail: thumbnail || "placeholder_url",  // Default if no thumbnail
        streamer_id,
        is_live: false,  // Initial state is offline
      },
    });

    res.status(201).json({ message: "Stream created successfully", stream });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create stream" });
  }
};

// Get All Streams
export const getAllStreams = async (req, res) => {
  try {
    const streams = await prisma.stream.findMany({
      include: {
        category: true,  // Include category details
        streamer: true,  // Include streamer (user) details
      },
    });
    res.status(200).json({ streams });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch streams" });
  }
};

// Get Stream by ID
export const getStreamById = async (req, res) => {
  const { id } = req.params;
  try {
    const stream = await prisma.stream.findUnique({
      where: { stream_id: id },
      include: {
        category: true,
        streamer: {
          select: {
            user_id: true,
            username: true, 
            stream_keys: {
              select: {
                stream_key: true,   // or whatever your field name is
              },
              take: 1,
            },
          },
        },
      },
    });

    if (!stream) {
      return res.status(404).json({ message: "Stream not found" });
    }

    res.status(200).json({ stream });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch stream" });
  }
};

// Update Stream
export const updateStream = async (req, res) => {
  const { id } = req.params;
  const { title, description, category_id, thumbnail } = req.body;
  try {
    const updatedStream = await prisma.stream.update({
      where: { stream_id: id },
      data: {
        title,
        description,
        category_id,
        thumbnail,
      },
    });

    res.status(200).json({ message: "Stream updated successfully", updatedStream });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update stream" });
  }
};

// Delete Stream
export const deleteStream = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.stream.delete({
      where: { stream_id: id },
    });

    res.status(200).json({ message: "Stream deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete stream" });
  }
};

// GET /api/streams/active
export const getActiveStream = async (req, res) => {
  try {
    const userId = req.userId; // from JWT middleware
    console.log("Fetching active stream for user:", userId);
    const stream = await prisma.stream.findFirst({
      where: {
        streamer_id: userId,
        ended_at: null, // active stream = not ended
      },
      orderBy: {
        started_at: "desc", // latest active stream first
      },
      include: {
        category: true,
        streamer: {
          select: {
            stream_keys: {
              select: {
                stream_key: true,   // or whatever your field name is
              },
              take: 1,
            },
          },
        },
      },
    });

    if (!stream) {
      return res.status(404).json({ message: "No active stream" });
    }

  res.json({
    ...stream,
    streamKey: stream.streamer?.stream_keys?.[0]?.stream_key || null,
  });
  } catch (error) {
    console.error("Error fetching active stream:", error);
    res.status(500).json({ error: "Failed to fetch active stream" });
  }
};



export const goLive = async (req, res) => {
  const { id } = req.params;
  try {    const liveStream = await prisma.stream.update({
      where: { stream_id: id },
      data: { is_live: true,
        started_at: new Date() 
      },
    });
    res.status(200).json({ message: "Stream is now live", liveStream });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to go live" });
  }
};

export const endStream = async (req, res) => {
  const { id } = req.params;
  try {    const endedStream = await prisma.stream.update({
      where: { stream_id: id },
      data: { is_live: false ,
        ended_at: new Date()
      },
    });
    res.status(200).json({ message: "Stream has ended", endedStream });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to end stream" });
  }
};


