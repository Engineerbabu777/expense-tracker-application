import express from 'express'
import {
  checkVerifyPasswordPage,
  loginUser,
  newPassword,
  newUserAccount,
  resetPassword
} from '../controllers/authController.js'

const authRoutes = express.Router()

// POST END POINTS !!
authRoutes.post('/register', newUserAccount) // POST METHOD OF THIS PARTICULAR ROUTE!
authRoutes.post('/login', loginUser) // POST METHOD OF THIS PARTICULAR ROUTE!
authRoutes.post('/resetPassword', resetPassword) // POST METHOD OF THIS PARTICULAR ROUTE!

// PUT/UPDATE ENDPOINTS!
authRoutes.put('/newPassword', newPassword) // PUT METHOD OF THIS PARTICULAR ROUTE!
// GET ENDPOINTS!
authRoutes.get('/page/newPassword/', checkVerifyPasswordPage) // GET METHOD OF THIS PARTICULAR ROUTE!

// EXPORTING!!!
export default authRoutes
