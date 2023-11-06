import express from 'express'
import { createNewBudget, currentMonthBudget, newMonthlyBudgetCategorySettings } from '../controllers/budgetController.js'

const budgetRoutes = express.Router()

// ALL ROUTES!
// GET ROUTES!
budgetRoutes.get('/thisMonth', currentMonthBudget)

// POST ROUTES!
budgetRoutes.post('/new', createNewBudget) // /add will be handled here!
budgetRoutes.post('/category',newMonthlyBudgetCategorySettings);

// PUT ROUTES!
// budgetRoutes.put('/update', updateCategory)

// DELETE ROUTES!
// budgetRoutes.delete('/delete', deleteCategory)

export default budgetRoutes
