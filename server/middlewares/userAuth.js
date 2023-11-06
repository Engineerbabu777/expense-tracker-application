import { userModel } from '../models/userModel.js'

export const authMiddleware = async (req, res, next) => {
  const { userId } = req.body
  const { userId: userID } = req.query

  console.log('HELLO FROM AUTH MIDDLEWARE!')
  // CHECK USER IN THE DATABASE!
  const user = await userModel.findById(userId || userID)
  // IF USER IS NOT AVAILABLE THAT HIT THIS!
  if (!user?.email || !user?.name) {
    // RETURN THAT USER IS NOT AUTHORIZED TO DO THIS TASK!
    return res
      .status(401)
      .json({ error: true, message: 'Invalid Authorization!' })
  } else {
    next()
  }
}
