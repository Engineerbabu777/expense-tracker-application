import { expenseModel } from '../models/expenseModel.js'
import { incomeModel } from '../models/incomeModel.js'
import { userModel } from '../models/userModel.js'

// GETTING ALL TRANSACTION CONTROLLER !!!
export async function getTransactionController (req, res) {
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
    const expenses = await expenseModel
      .find({
        userId: userId,
        month: month,
        year: Number(year)
      })
      .populate('categoryId')
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

// SEARCH FOR TRANSACTIONS !!
export async function searchForTransactions (req, res) {
  try {
    // DESTRUCTING DATA FROM REQUESTED URL !
    const { userId, q, isDigit, isString } = req.query

    console.log('TYPES: ', typeof isDigit, typeof isString, req.query)
    // CHECK USER IN THE DATABASE!
    const user = await userModel.findById(userId)
    // CHECKING IF EMAIL OR NAME EXITS THERE!
    if (!user?.email || !user?.name) {
      // RETURN THAT USER IS NOT AUTHORIZED TO DO THIS TASK!
      return res
        .status(401)
        .json({ error: true, message: 'Invalid Authorization!' })
    }

    // MAKE REGEXP
    let search = new RegExp(q, 'i')

    let toSearchWith = {}

    // IF ITS STRING THEN WE WILL LOOK THROUGH MONTH DESCRIPTION!
    // if (isDigit == 1) {
    //   console.log('YES', 'ISDIGIT')
    //   toSearchWith = {
    //     $or: [
    //       { description: { $regex: search } },
    //       { month: { $regex: search } }
    //     ]
    //   }
    // }

    // IF ITS DIGIT THEN WE WILL LOOK THROUGH YEAR AMOUNT!
    // ELSE MEANS ISSTRING IS TRUE!
    // if (isString == 1) {
    // console.log('YES', 'ISSTRING')

    toSearchWith = {
      userId: userId,
      $or: [{ description: { $regex: search } }, { month: { $regex: search } }]
    }
    // }

    // NOW SEARCH THROUGH TRANSACTIONS !!
    // const incomesDocs = await incomeModel
    //   .find(toSearchWith, {
    //     source: 1,
    //     month: 1,
    //     year: 1,
    //     money: 1
    //   })
    //   .limit(10)
    const expensesDocs = await expenseModel.find(toSearchWith)

    console.log({ expensesDocs })

    // RETURN THE RESPONSE BACK!
    res.status(200).json({
      success: true,
      data: [
        // ...incomesDocs,
        ...expensesDocs
      ],
      // incomesDocs,
      expensesDocs
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error!', error: true })
  }
}
