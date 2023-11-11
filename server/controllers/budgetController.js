import { budgetModel } from '../models/budgetModel.js'
import { categoryModel } from '../models/categoryModel.js'
import { monthlyCategoryModel } from '../models/monthlyCategoryModel.js'
import { userModel } from '../models/userModel.js'
import { incomeModel } from '../models/incomeModel.js'
import { expenseModel } from '../models/expenseModel.js'

export const createNewBudget = async (req, res) => {
  try {
    const { month, date, year, userId } = req.body

    // CHECK USER IN THE DATABASE!
    const user = await userModel.findById(userId)

    if (!user?.email || !user?.name) {
      // RETURN THAT USER IS NOT AUTHORIZED TO DO THIS TASK!
      return res
        .status(401)
        .json({ error: true, message: 'Invalid Authorization!' })
    }

    // CHECK IF BUDGET ALREADY EXISTS!
    const isBudgetExists = await budgetModel.findOne({
      month: month,
      year: year,
      // date: date,
      userId: userId
    })

    if (isBudgetExists?.month) {
      return res
        .status(400)
        .json({ error: true, message: 'Budget already exists!' })
    }

    // CREATE NEW BUDGET!
    const newBudget = await budgetModel.create({
      month,
      year,
      date,
      userId
    })

    // FIND ALL CATEGORIES OF THAT USER!
    const categories = await categoryModel.find({ userId })

    res.status(200).json({
      success: true,
      message: 'Budget created!',
      newBudget,
      userCategories: categories
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error!', error: true })
  }
}

export const newMonthlyBudgetCategorySettings = async (req, res) => {
  try {
    const { month, year, userId, categoryId, monthlyLimit, currency, _id } =
      req.body

    console.log('DATA GETTING: ', req.body)

    // CHECK USER IN THE DATABASE!
    const user = await userModel.findById(userId)

    if (!user?.email || !user?.name) {
      // RETURN THAT USER IS NOT AUTHORIZED TO DO THIS TASK!
      return res
        .status(401)
        .json({ error: true, message: 'Invalid Authorization!' })
    }

    // CHECK IF ALREADY EXISTS THEN ONLY UPDATE!
    if (_id) {
      const isExisted = await monthlyCategoryModel.findById(_id)

      if (isExisted?.userId) {
        // UPDATE!
        await monthlyCategoryModel.findByIdAndUpdate(_id, {
          monthlyLimit,
          currency
        })
        const userCategories = await categoryModel.find({ userId })

        const userBudgetCategories = await monthlyCategoryModel
          .find({
            userId,
            year: Number(year),
            month
          })
          .populate('categoryId')
        return res.status(200).json({
          success: true,
          message: 'updated created!',
          // newArray,
          userCategories,
          userBudgetCategories
        })
      }
    }

    // CREATE NEW BUDGET!
    const budgetCategory = await monthlyCategoryModel.create({
      month,
      year,
      userId,
      categoryId,
      monthlyLimit,
      currency
    })

    // console.log(budgetCategory)

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

    // const newArray = []

    // for (let i = 0; i < userCategories?.length; i++) {
    //   for (let j = 0; j < userBudgetCategories?.length; j++) {
    //     if (
    //       userCategories[i]?._id?.toString() ===
    //       userBudgetCategories[j]?.categoryId?._id?.toString()
    //     ) {
    //       userCategories.splice(i, i + 1)
    //       newArray.push(userBudgetCategories[j])
    //       break
    //     }
    //   }
    // }

    return res.status(200).json({
      success: true,
      message: 'CREATED SUCCESS!',
      userCategories,
      userBudgetCategories
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error!', error: true })
  }
}

export const currentMonthBudget = async (req, res) => {
  try {
    const { userId, year, month } = req.query

    // CHECK USER IN THE DATABASE!
    const user = await userModel.findById(userId)

    if (!user?.email || !user?.name) {
      // RETURN THAT USER IS NOT AUTHORIZED TO DO THIS TASK!
      return res
        .status(401)
        .json({ error: true, message: 'Invalid Authorization!' })
    }

    // CHECK FOR THIS MONTH BUDGET!
    const monthBudget = await budgetModel.find({
      userId: userId,
      month: month,
      year: Number(year)
    })

    res.status(200).json({ success: true, monthBudget })
  } catch (err) {
    console.log('ERROR WHILE GETTING BUDGET!', err?.message)
    res.status(500).json({ message: 'Server error!', error: true })
  }
}

// DELETE: BUDGET!
export const deleteBudget = async (req, res) => {
  try {
    const { userId, budgetId, month, year } = req.query

    console.log(req.query)

    // CHECK USER IN THE DATABASE!
    const user = await userModel.findById(userId)

    if (!user?.email || !user?.name) {
      // RETURN THAT USER IS NOT AUTHORIZED TO DO THIS TASK!
      return res
        .status(401)
        .json({ error: true, message: 'Invalid Authorization!' })
    }

    // DELETE BUDGET!
    await budgetModel.findByIdAndDelete(budgetId)

    // DELETE ALL TRANSACTION OF BUDGET!
    await incomeModel.deleteMany({
      month: month,
      year: Number(year),
      userId: userId
    })
    await expenseModel.deleteMany({
      month: month,
      year: Number(year),
      userId: userId
    })
    await monthlyCategoryModel.deleteMany({
      month: month,
      year: Number(year),
      userId: userId
    })

    res.status(200).json({ success: true, message: 'Budget deleted!' })
  } catch (err) {
    console.log('ERROR: ', err?.message)
    res.status(500).json({ message: 'Server error!', error: true })
  }
}
