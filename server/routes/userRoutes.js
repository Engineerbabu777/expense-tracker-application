import express from 'express'
import {
  accountDeletion,
  getCurrentUserData,
  updateUserData,
  userDataDeletion
} from '../controllers/userController.js'

const userRoutes = express.Router()

userRoutes.get('/logged', getCurrentUserData)
userRoutes.put('/update', updateUserData)
userRoutes.delete('/account', accountDeletion)
userRoutes.delete('/data', userDataDeletion)

export default userRoutes
