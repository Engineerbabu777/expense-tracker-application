import express from 'express'
import getTransactionController from '../controllers/transactionController.js'

const transactionRoutes = express.Router()

transactionRoutes.get('/month', getTransactionController)

export { transactionRoutes}
