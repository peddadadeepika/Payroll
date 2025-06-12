import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { getSummary } from '../controllers/dashboardController.js'
const router = express.Router()

router.get('/summary', authMiddleware, getSummary)
//router.post('/add', authMiddleware, addDepartment)
//router.get('/:id', authMiddleware, getDepartment)
//router.put('/:id', authMiddleware, updateDepartment)
//router.delete('/:id', authMiddleware, deleteDepartment)

export default router