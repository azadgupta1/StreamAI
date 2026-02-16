import express from 'express';
import { followUser, unfollowUser, isFollowingUser, getFollowers, getFollowing } from '../controllers/followerController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Follow a user
router.post('/', authenticate, followUser);

// Unfollow a user
router.delete('/', authenticate, unfollowUser);

router.get('/is-following/:followee_id', authenticate, isFollowingUser);


// Get followers of a user
router.get('/followers', authenticate, getFollowers);

// Get following users of a user
router.get('/following', authenticate, getFollowing);

export default router;
