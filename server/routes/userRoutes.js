import express from 'express'
import {
  accountDeletion,
  getCurrentUserData,
  updateUserData,
  userAccountActivation,
  userAccountDeactivation,
  userDataDeletion
} from '../controllers/userController.js'

const userRoutes = express.Router()

userRoutes.get('/logged', getCurrentUserData)
userRoutes.put('/update', updateUserData)
userRoutes.delete('/account', accountDeletion)
userRoutes.delete('/data', userDataDeletion)
userRoutes.put('/deactivate', userAccountDeactivation)
userRoutes.get('/activate/:token', userAccountActivation)

export default userRoutes
