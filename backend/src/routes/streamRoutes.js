import express from 'express';
import { createStream, getAllStreams, getStreamById, updateStream, deleteStream, getActiveStream, goLive, endStream} from '../controllers/streamController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Create Stream
router.post('/create', authenticate, createStream);


// Get Active Stream
router.get('/active', authenticate, getActiveStream);

// Get All Streams
router.get('/', getAllStreams);

// Get Stream by ID
router.get('/:id', getStreamById);

// Update Stream
router.put('/:id', authenticate, updateStream);

// Delete Stream
router.delete('/:id', authenticate, deleteStream);


// Go Live
router.put('/go-live/:id', authenticate, goLive);

// End Stream
router.put('/end-stream/:id', authenticate, endStream);



export default router;
