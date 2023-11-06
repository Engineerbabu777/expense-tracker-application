import { budgetModel } from '../models/budgetModel.js'
import { categoryModel } from '../models/categoryModel.js'
import { expenseModel } from '../models/expenseModel.js'
import { monthlyCategoryModel } from '../models/monthlyCategoryModel.js'
import { userModel } from '../models/userModel.js'

// :POST 📫 📫 📫  !!!
export const addNewCategory = async (req, res) => {
  try {
    // DESTRUCTING DATA FROM QUERY OBJECT!
    const { categoryName, userId, colorCode } = req.body

    // CHECK USER IN THE DATABASE!
    const user = await userModel.findById(userId)

    // IF USER IS NOT AVAILABLE THAT HIT THIS!
    if (!user?.email || !user?.name) {
      // RETURN THAT USER IS NOT AUTHORIZED TO DO THIS TASK!
      return res
        .status(401)
        .json({ error: true, message: 'Invalid Authorization!' })
    }

    // CREATING NEW CATEGORY HERE!
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

// :GET 🧐🧐🧐!!!
export const getCategories = async (req, res) => {
  try {
    const { userId } = req.query

    // CHECK USER IN THE DATABASE!
    const user = await userModel.findById(userId)

    // IF USER IS NOT AVAILABLE THAT HIT THIS!
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

// :DELETE ❌❌❌!!!
export const deleteCategory = async (req, res) => {
  try {
    // DESTRUCTING DATA FROM QUERY OBJECT!
    const { userId, deleteId } = req.query
    // CHECK USER IN THE DATABASE!
    const user = await userModel.findById(userId)
    // IF USER IS NOT AVAILABLE THAT HIT THIS!
    if (!user?.email || !user?.name) {
      // RETURN THAT USER IS NOT AUTHORIZED TO DO THIS TASK!
      return res
        .status(401)
        .json({ error: true, message: 'Invalid Authorization!' })
    }
    // DELETING THAT CATEGORY TO BE DELETE!
    await categoryModel.findByIdAndDelete(deleteId)
    // DELETE FROM MONTHLY EXPENSES CATEGORY THAT HAS THAT ID!
    await monthlyCategoryModel.deleteMany({ categoryId: deleteId })
    // DELETE FROM EXPENSE TRANSACTIONS AS WELL!
    await expenseModel.deleteMany({ categoryId: deleteId })
    // RETURN SUCCESS RESPONSE!
    res.status(200).json({ success: true, message: 'Category Deleted!' })
  } catch (error) {
    // HANDLING ERROR AND SENDING BACK!
    res.status(500).json({ message: 'Server error!', error: true })
  }
}

// UPDATE ♻️♻️♻️♻️!!!
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

// ::GET EACH USER CATEGORIES 🧐🧐🧐!
export const eachUserCategories = async (req, res) => {
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

    // RETURN SUCCESS RESPONSE!
    res.status(200).json({
      success: true,
      message: 'Categories Found!',
      userCategories,
      userBudgetCategories
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error!', error: true })
  }
}
