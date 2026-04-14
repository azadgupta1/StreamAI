import { onPublish, onUnpublish } from "../controllers/srsController.js";
import express from 'express';

const router = express.Router();


router.post("/publish", onPublish);
router.post("/unpublish", onUnpublish);



export default router;