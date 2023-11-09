import express from 'express'
import {
  getTransactionController,
  searchForTransactions
} from '../controllers/transactionController.js'

const transactionRoutes = express.Router()

transactionRoutes.get('/month', getTransactionController)

transactionRoutes.get('/', searchForTransactions)

export { transactionRoutes }
