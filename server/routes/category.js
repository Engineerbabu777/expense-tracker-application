import express from 'express'
import {
  addNewCategory,
  deleteCategory,
  getCategories,
  updateCategory
} from '../controllers/categoryController.js'

const categoryRoutes = express.Router()

// ALL ROUTES!
// GET ROUTES!
categoryRoutes.get('/getAll', getCategories)

// POST ROUTES!
categoryRoutes.post('/add', addNewCategory) // /add will be handled here!

// PUT ROUTES!
categoryRoutes.put('/update', updateCategory)

// DELETE ROUTES!
categoryRoutes.delete('/delete', deleteCategory)

export default categoryRoutes
