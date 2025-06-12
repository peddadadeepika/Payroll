import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addLeave, getLeave, getLeaves, getLeaveDetail, updateLeave, sendLeave  } from '../controllers/leaveController.js'

const router = express.Router()

router.post('/add', authMiddleware, addLeave)
router.get('/:id', authMiddleware, getLeave)
router.get('/detail/:id', authMiddleware, getLeaveDetail)
router.get('/', authMiddleware, getLeaves)
router.put('/:id', authMiddleware, updateLeave)
router.post('/leave/send/:id', authMiddleware, sendLeave )

export default router