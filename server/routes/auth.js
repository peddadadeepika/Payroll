import express from 'express'
import { login, verify, forgotPassword, verifyOtp } from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/login', login)
router.get('/verify', authMiddleware, verify)
router.post('/forgot-password', forgotPassword);
router.post("/verify-otp", verifyOtp);

export default router;