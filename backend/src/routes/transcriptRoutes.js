import express from 'express';
import { getTranscripts } from '../controllers/transcriptController.js';
const router = express.Router();



// Get all transcripts for a specific stream
router.get('/:streamId', getTranscripts);

export default router;
