import { expenseModel } from '../models/expenseModel.js'
import { incomeModel } from '../models/incomeModel.js'
import { userModel } from '../models/userModel.js'



// GETTING ALL TRANSACTION CONTROLLER !!!
export default async function getTransactionController (req, res) {
  try {
    // DESTRUCTING DATA FROM REQUESTED URL !
    const { userId, month, year } = req.query
    // CHECK USER IN THE DATABASE!
    const user = await userModel.findById(userId)
    // CHECKING IF EMAIL OR NAME EXITS THERE!
    if (!user?.email || !user?.name) {
      // RETURN THAT USER IS NOT AUTHORIZED TO DO THIS TASK!
      return res
        .status(401)
        .json({ error: true, message: 'Invalid Authorization!' })
    }
    // GET EXPENSES OF THAT USER!
    const incomes = await incomeModel.find({
      userId: userId,
      month: month,
      year: Number(year)
    })
    // GET EXPENSES OF THAT USER!
    const expenses = await expenseModel.find({
      userId: userId,
      month: month,
      year: Number(year)
    }).populate('categoryId')
    // SENDING RESPONSE BACK TO CLIENT !!
    res.status(200).json({
      success: true,
      message: 'Founded Expenses Success!',
      incomesOfMonth: incomes,
      expensesOfMonth: expenses,
      allTransactions: [...incomes, ...expenses]
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error!', error: true })
  }
}
