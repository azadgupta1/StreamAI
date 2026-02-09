import express from "express";
import {
  generateStreamKey,
  getStreamKey,
  regenerateStreamKey,
  validateStreamKey,
} from "../controllers/streamkeyController.js";
import {authenticate} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Generate a new stream key for the user
router.get("/generate", authenticate, generateStreamKey);

// Get the current stream key for the user
router.get("/", authenticate, getStreamKey);

// Regenerate a new stream key for the user
router.post("/regenerate", authenticate, regenerateStreamKey);

// Validate a stream key
router.get("/validate", authenticate, validateStreamKey);

export default router;
