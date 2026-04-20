import express from 'express';
import {getAnalytics}  from '../controllers/analyticsController.js';
const router = express.Router();



// Get all analytics for a specific stream
router.get('/:streamId', getAnalytics);

export default router;
