import prisma from '../config/prismaClient.js';

// Follow a user
export const followUser = async (req, res) => {
  try {
    const { followee_id } = req.body; // The user to be followed
    const follower_id = req.userId;

    if (follower_id === followee_id) {
      return res.status(400).json({ message: 'You cannot follow yourself.' });
    }

    // Check if already following the user
    const existingFollow = await prisma.follower.findFirst({
      where: {
        follower_id,
        followee_id,
      },
    });

    if (existingFollow) {
      return res.status(400).json({ message: 'You are already following this user.' });
    }

    // Follow the user
    const newFollow = await prisma.follower.create({
      data: {
        follower_id,
        followee_id,
      },
    });

    return res.status(201).json(newFollow);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error following the user.' });
  }
};

// Unfollow a user
export const unfollowUser = async (req, res) => {
  try {
    const { followee_id } = req.body; // The user to unfollow
    const follower_id = req.userId;

    // Check if the user is actually following
    const existingFollow = await prisma.follower.findFirst({
      where: {
        follower_id,
        followee_id,
      },
    });

    if (!existingFollow) {
      return res.status(404).json({ message: 'You are not following this user.' });
    }

    // Unfollow the user
    await prisma.follower.delete({
      where: {
        follower_id_followee_id: {
          follower_id,
          followee_id,
        },
      },
    });

    return res.status(200).json({ message: 'Unfollowed successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error unfollowing the user.' });
  }
};


export const isFollowingUser = async (req, res) => {
  try {
    const follower_id = req.userId;
    const { followee_id } = req.params;

    const follow = await prisma.follower.findFirst({
      where: {
        follower_id,
        followee_id,
      },
      select: { follower_id: true },
    });

    return res.json({
      isFollowing: !!follow,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error checking follow status." });
  }
};



// Get followers of a user
export const getFollowers = async (req, res) => {
  try {
    const userId = req.userId; 

    const followers = await prisma.follower.findMany({
      where: { followee_id: userId },
      select: {
        follower_id: true,
        followed_at: true, 
        follower: {
          select: {
            username: true,
            profile_picture: true,
          },
        },
      },
      orderBy: { followed_at: "desc" }, // newest first (optional)
    });

    return res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching followers." });
  }
};


// Get following users of a user
export const getFollowing = async (req, res) => {
  try {
    const userId = req.userId;

    const following = await prisma.follower.findMany({
      where: { follower_id: userId },
      include: { followee: { select: { username: true, profile_picture: true } } },
    });

    return res.status(200).json(following);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching following users.' });
  }
};
