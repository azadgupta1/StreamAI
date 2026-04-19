import express from 'express';
import {getSummary}  from '../controllers/summaryController.js';
const router = express.Router();



// Get all likes for a specific stream
router.get('/:streamId', getSummary);

export default router;
