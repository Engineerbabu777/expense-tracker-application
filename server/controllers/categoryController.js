import { categoryModel } from '../models/categoryModel.js'
import { userModel } from '../models/userModel.js'

// FUNCTION TO ADD NEW CATEGORY !!!
export const addNewCategory = async (req, res) => {
  try {
    const { categoryName, categoryLimit, currency, userId, colorCode } =
      req.body

    // CHECK USER IN THE DATABASE!
    const user = await userModel.findById(userId)

    if (!user?.email || !user?.name) {
      // RETURN THAT USER IS NOT AUTHORIZED TO DO THIS TASK!
      return res
        .status(401)
        .json({ error: true, message: 'Invalid Authorization!' })
    }

    const newCategory = await categoryModel.create({
      categoryLimit,
      categoryName,
      colorCode,
      userId,
      currency
    })

    // RETURN SUCCESS RESPONSE!
    res
      .status(200)
      .json({ success: true, message: 'Added Successfully!', newCategory })
  } catch (error) {
    res.status(500).json({ message: 'Server error!', error: true })
  }
}
