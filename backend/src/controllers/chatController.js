import prisma from "../config/prismaClient.js";

// Store chat messages to the database
export const saveChatMessage = async (stream_id, user_id, message) => {
  try {
    const newChat = await prisma.chat.create({
      data: {
        stream_id,
        user_id,
        message,
      },
    });
    return newChat;
  } catch (error) {
    console.error("Error saving chat message:", error);
    throw new Error("Error saving message");
  }
};

export const getChatMessagesByStream = async (req, res) => {
  try {
    const { stream_id } = req.params;

    const messages = await prisma.chat.findMany({
      where: {
        stream_id: stream_id,  // important
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
      orderBy: {
        sent_at: "asc",
      },
    });

    // Optional: flatten response (cleaner for frontend)
    const formattedMessages = messages.map((msg) => ({
      id: msg.id,
      message: msg.message,
      sent_at: msg.sent_at,
      username: msg.user.username,
      user_id: msg.user_id,
    }));

    return res.json(formattedMessages);

  } catch (error) {
    console.error("Error fetching chat messages:", error);
    return res.status(500).json({ error: "Error fetching messages" });
  }
};
