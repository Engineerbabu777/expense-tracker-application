import express from 'express'
import {
  addNewIncomeController,
  deleteIncomeById,
  updateIncome
} from '../controllers/incomeController.js'

const incomeRoutes = express.Router()

incomeRoutes.post('/add', addNewIncomeController)

incomeRoutes.delete('/deleteById', deleteIncomeById)

incomeRoutes.put('/edit', updateIncome )


export default incomeRoutes
