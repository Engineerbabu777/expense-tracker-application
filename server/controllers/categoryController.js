import { budgetModel } from '../models/budgetModel.js'
import { categoryModel } from '../models/categoryModel.js'
import { monthlyCategoryModel } from '../models/monthlyCategoryModel.js'
import { userModel } from '../models/userModel.js'

// FUNCTION TO ADD NEW CATEGORY !!!
export const addNewCategory = async (req, res) => {
  try {
    const { categoryName, userId, colorCode } = req.body

    // CHECK USER IN THE DATABASE!
    const user = await userModel.findById(userId)

    if (!user?.email || !user?.name) {
      // RETURN THAT USER IS NOT AUTHORIZED TO DO THIS TASK!
      return res
        .status(401)
        .json({ error: true, message: 'Invalid Authorization!' })
    }

    const newCategory = await categoryModel.create({
      categoryName,
      colorCode,
      userId
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
    const { categoryName, userId, colorCode, id } = req.body

    // CHECK USER IN THE DATABASE!
    const user = await userModel.findById(userId)

    if (!user?.email || !user?.name) {
      // RETURN THAT USER IS NOT AUTHORIZED TO DO THIS TASK!
      return res
        .status(401)
        .json({ error: true, message: 'Invalid Authorization!' })
    }

    await categoryModel.findByIdAndUpdate(id, {
      categoryName,
      colorCode,
      userId
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

// GET EACH USER CATEGORIES!
export const eachUserCategories = async (req, res) => {
  // GET ALL CATEGORIES CREATED BY USER!
  // GET ALL BUDGET SET CATEGORIES OF THAT PARTICULAR MONTH BY USER!
  // THEN COMPARE THESE VALUES AGAINST THEIR ID'S!
  // TAKES BOTH DATA FROM THEM BUT REMOVE THE SAME DATA FROM USER CATEGORIES!
  // THEN SEND THAT DATA/ SHOW THAT PARTICULAR THAT IN OUR TABLE!

  try {
    // GETTING DATA FROM OUR REQUESTED URL!
    const { userId, month, year } = req.query

    // CHECK USER IN THE DATABASE!
    const user = await userModel.findById(userId)

    // CHECKING FOR USER!
    if (!user?.email || !user?.name) {
      // RETURN THAT USER IS NOT AUTHORIZED TO DO THIS TASK!
      return res
        .status(401)
        .json({ error: true, message: 'Invalid Authorization!' })
    }

    // GETTING ALL CATEGORIES DATA THAT WAS CREATED BY USER!
    const userCategories = await categoryModel.find({ userId })

    // BUDGET DATA THAT WAS CREATED BY USER IN EACH MONTH!
    const userBudgetCategories = await monthlyCategoryModel
      .find({
        userId,
        year: Number(year),
        month
      })
      .populate('categoryId')

    console.log(userCategories, userBudgetCategories)

    const newArray = []

    for (let i = 0; i < userCategories?.length; i++) {
      for (let j = 0; j < userBudgetCategories?.length; j++) {
        if (
          userCategories[i]?._id?.toString() ==
          userBudgetCategories[j]?.categoryId?._id?.toString()
        ) {
          userCategories.splice(i, i + 1)
          newArray.push(userBudgetCategories[j])
          break
        }
      }
    }

    // let x = userCategories;
    // userCategories = [...x];

    // RETURN SUCCESS RESPONSE!
    res.status(200).json({
      success: true,
      message: 'Categories Found!',
      userCategories,
      newArray,
      userBudgetCategories
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error!', error: true })
  }
}
