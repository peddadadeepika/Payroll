import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment, viewEmployee} from '../controllers/depController.js'

const router = express.Router()

router.get('/', authMiddleware, getDepartments)
router.post('/add', authMiddleware, addDepartment)
router.get('/:id', authMiddleware, getDepartment)
router.put('/:id', authMiddleware, updateDepartment)
router.delete('/:id', authMiddleware, deleteDepartment)
router.get('/:id/employees', authMiddleware, viewEmployee)

export default router