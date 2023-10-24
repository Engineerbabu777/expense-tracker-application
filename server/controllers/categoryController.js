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

// GET ALL CATEGORIES!
export const getCategories = async (req, res) => {
  try {
    const { userId } = req.query

    // CHECK USER IN THE DATABASE!
    const user = await userModel.findById(userId)

    if (!user?.email || !user?.name) {
      // RETURN THAT USER IS NOT AUTHORIZED TO DO THIS TASK!
      return res
        .status(401)
        .json({ error: true, message: 'Invalid Authorization!' })
    }

    const categories = await categoryModel.find({ userId })

    // RETURN SUCCESS RESPONSE!
    res
      .status(200)
      .json({ success: true, message: 'Added Successfully!', categories })
  } catch (error) {
    res.status(500).json({ message: 'Server error!', error: true })
  }
}

// :DELETE
export const deleteCategory = async (req, res) => {
  try {
    const { userId, deleteId } = req.query

    // CHECK USER IN THE DATABASE!
    const user = await userModel.findById(userId)

    if (!user?.email || !user?.name) {
      // RETURN THAT USER IS NOT AUTHORIZED TO DO THIS TASK!
      return res
        .status(401)
        .json({ error: true, message: 'Invalid Authorization!' })
    }

    await categoryModel.findByIdAndDelete(deleteId)

    // RETURN SUCCESS RESPONSE!
    res.status(200).json({ success: true, message: 'Category Deleted!' })
  } catch (error) {
    res.status(500).json({ message: 'Server error!', error: true })
  }
}

// UPDATE
export const updateCategory = async (req, res) => {
  try {
    const { categoryName, categoryLimit, currency, userId, colorCode, id } =
      req.body

    // CHECK USER IN THE DATABASE!
    const user = await userModel.findById(userId)

    if (!user?.email || !user?.name) {
      // RETURN THAT USER IS NOT AUTHORIZED TO DO THIS TASK!
      return res
        .status(401)
        .json({ error: true, message: 'Invalid Authorization!' })
    }

    await categoryModel.findByIdAndUpdate(id, {
      categoryLimit,
      categoryName,
      colorCode,
      userId,
      currency
    })

    const updatedCategory = await categoryModel.findById(id)

    console.log('UPDATED: ', updatedCategory)

    // RETURN SUCCESS RESPONSE!
    res
      .status(200)
      .json({ success: true, message: 'Updated Success!', updatedCategory })
  } catch (error) {
    res.status(500).json({ message: 'Server error!', error: true })
  }
}
