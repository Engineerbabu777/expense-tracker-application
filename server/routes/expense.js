import express from 'express'
import {
  addNewExpense,
  deleteExpenseById,
  updateExpense,
} from '../controllers/expenseController.js'
import { authMiddleware } from '../middlewares/userAuth.js'

const expenseRoutes = express.Router()

expenseRoutes.post('/add', authMiddleware ,addNewExpense)

expenseRoutes.delete('/deleteById', deleteExpenseById)

expenseRoutes.put('/edit', updateExpense)

export default expenseRoutes
