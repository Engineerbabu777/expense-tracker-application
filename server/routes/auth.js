import express from 'express'
import {
  loginUser,
  newUserAccount,
  resetPassword
} from '../controllers/authController.js'

const authRoutes = express.Router()

// POST END POINTS !!
authRoutes.post('/register', newUserAccount) // POST METHOD OF THIS PARTICULAR ROUTE!
authRoutes.post('/login', loginUser) // POST METHOD OF THIS PARTICULAR ROUTE!
authRoutes.post('/resetPassword', resetPassword)

export default authRoutes
