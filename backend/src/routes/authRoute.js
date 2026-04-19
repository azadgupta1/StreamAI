import { registerUser, loginUser } from "../controllers/authController.js";
import express from 'express';
import { googleAuth } from "../controllers/authController.js";


const router = express.Router();


router.post('/signup', registerUser);

router.post('/login', loginUser);

router.post("/google", googleAuth);


export default router;