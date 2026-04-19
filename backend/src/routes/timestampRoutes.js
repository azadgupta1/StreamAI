import express from 'express';
import { getTimestamps }  from '../controllers/timestampController.js';
const router = express.Router();



// Get all timestamps for a specific stream
router.get('/:streamId', getTimestamps);

export default router;
