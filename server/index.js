// IMPORTING OUR REQUIRED PACKAGES FOR PROJECT!

import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import { databaseConnect } from './database.js'
import categoryRoutes from './routes/category.js'
import budgetRoutes from './routes/budgetRoutes.js'
import incomeRoutes from './routes/income.js'
import expenseRoutes from './routes/expense.js'
import { transactionRoutes } from './routes/transactions.js'
import userRoutes from './routes/userRoutes.js'

// CREATING EXPRESS SERVER APP!
const app = express()

// NECESSARY MIDDLEWARES!
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
// app.use(authMiddleware);

//!! ROUTES START WITH /api/auth WILL BE HANDLED BY THIS ROUTE!)
app.use('/api/auth', authRoutes) //!! HERE WE ARE HANDLING AUTH ROUTES (LOGIN! /REGISTER! /RESET!)
//!! ROUTES START WITH /api/expenses WILL BE HANDLED BY THIS ROUTE!
app.use('/api/category', categoryRoutes)
//!! ROUTES START WITH /api/expenses WILL BE HANDLED BY THIS ROUTE!
app.use('/api/budget', budgetRoutes)
//!! ROUTES START WITH /api/income WILL BE HANDLED BY THIS ROUTE!
app.use('/api/income', incomeRoutes)
//!! ROUTES START WITH /api/expense WILL BE HANDLED BY THIS ROUTE!
app.use('/api/expense', expenseRoutes)
//!! ROUTES START WITH /api/transactions WILL BE HANDLED BY THIS->
app.use('/api/transactions', transactionRoutes)
//!! ROUTES START WITH /api/user WILL BE HANDLED BY THIS->
app.use('/api/user', userRoutes)
// CONNECTING WITH DATABASE!
databaseConnect()

// RUNNING OUR SERVER APP!
app.listen(4444, () => {
  console.log('Server is running on PORT-> 4444')
})
