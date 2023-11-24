import { incomeModel } from '../models/incomeModel.js'
import { userModel } from '../models/userModel.js'

// :ADD !!
export async function addNewIncomeController (req, res) {
  try {
    const { month, day, year, currency, source, amount, userId } = req.body

    console.log('DATA: ', req.body);


    // CREATE NEW INCOME STREAM!
    const newIncome = await incomeModel.create({
      month: month,
      year: Number(year),
      day: Number(day),
      currency: currency,
      source: source,
      money: Number(amount),
      userId: userId
    })

    res
      .status(200)
      .json({ success: true, message: 'New income added success!', newIncome })
  } catch (error) {
    res.status(500).json({ message: 'Server error!', error: true })
  }
}

// :DELETE !!
export const deleteIncomeById = async (req, res) => {
  try {
    const { userId, deleteId } = req.query
   
    await incomeModel.findOneAndDelete({_id:deleteId,userId:userId})

    // RETURN SUCCESS RESPONSE!
    res
      .status(200)
      .json({ success: true, message: 'Income transaction Deleted!' })
  } catch (error) {
    res.status(500).json({ message: 'Server error!', error: true })
  }
}

// :UPDATE !!
export const updateIncome = async (req, res) => {
  try {
    const { trans, userId, _id } = req.body

    await incomeModel.findByIdAndUpdate(_id, {
      currency: trans.currency,
      source: trans.source,
      money: trans.amount,
    })

    const updated = await incomeModel.findById(_id)

    res.status(200).json({
      success: true,
      message: 'New expense added success!',
      updated
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error!', error: true })
  }
}


// !! -------------