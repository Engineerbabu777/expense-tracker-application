import { userModel } from "../models/userModel"

export const authMiddleware = async (req, res, next) => {
  const { userId } = req.body
  // CHECK USER IN THE DATABASE!
  const user = await userModel.findById(userId)

  if (!user?.email || !user?.name) {
    // RETURN THAT USER IS NOT AUTHORIZED TO DO THIS TASK!
    return res
      .status(401)
      .json({ error: true, message: 'Invalid Authorization!' })
  } else {
    next();
  }
}
