import { expenseModel } from '../models/expenseModel.js'
import { monthlyCategoryModel } from '../models/monthlyCategoryModel.js'
import { userModel } from '../models/userModel.js'
import { expenseVoilationMail } from '../utils/sendMail.js'

// :POST 📫 📫 📫  !!!
export async function addNewExpense (req, res) {
  try {
    const {
      month,
      day,
      year,
      currency,
      description,
      amount,
      userId,
      categoryId,
      need_to_send_email,
      monthlyData,
      exceedingAmount // GETTING THIS DATA HERE!
    } = req.body

    const user = await userModel.findById(userId)

    // CREATE NEW INCOME STREAM!
    const newExpense = await expenseModel.create({
      month: month,
      year: Number(year),
      day: Number(day),
      currency: currency,
      description: description,
      money: Number(amount),
      userId: userId,
      categoryId: categoryId
    })

    console.log('DATA: ', req.body);

    // GET FRESH DATA!
    const freshData = await expenseModel
      .findById(newExpense._id)
      .populate('categoryId')
    
    

    if (need_to_send_email) {
      await expenseVoilationMail(user?.email, monthlyData, exceedingAmount)

      return res.status(200).json({
        success: true,
        message: 'New expense added success! & check warning email!',
        newExpense: freshData
      })
    }

    res.status(200).json({
      success: true,
      message: 'New expense added success!',
      newExpense: freshData
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error!', error: true })
  }
}

// :DELETE ❌❌❌!!!
export const deleteExpenseById = async (req, res) => {
  try {
    const { userId, deleteId } = req.query

    // DELETING THAT EXPENSE!
    await expenseModel.findOneAndDelete({ _id: deleteId, userId: userId })

    // RETURN SUCCESS RESPONSE!
    res
      .status(200)
      .json({ success: true, message: 'Expense transaction Deleted!' })
  } catch (error) {
    res.status(500).json({ message: 'Server error!', error: true })
  }
}

// UPDATE ♻️♻️♻️♻️!!!
export const updateExpense = async (req, res) => {
  try {
    const { trans, userId, _id } = req.body

    // UPDATING THE DOC!
    await expenseModel.findByIdAndUpdate(_id, {
      currency: trans.currency,
      description: trans.description,
      money: trans.amount,
      categoryId: trans.categoryId?._id
    })
    // GETTING THE FRESH DOC!
    const updated = await expenseModel.findById(_id).populate('categoryId')
    // RETURNING RESPONSE BACK!
    res.status(200).json({
      success: true,
      message: 'New expense added success!',
      updated
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error!', error: true })
  }
}
