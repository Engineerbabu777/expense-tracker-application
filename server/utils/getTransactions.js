// GET INCOMES!

import { expenseModel } from '../models/expenseModel.js'
import { incomeModel } from '../models/incomeModel.js'

export async function getIncomes (userId, month, year) {
  console.log(3)
  console.log('dta: ', userId, month, year)

  // GET EXPENSES OF THAT USER!
  const incomes = await incomeModel.find({
    userId: userId,
    month: month,
    year: Number(year)
  })
  console.log(7)

  return { incomes }
}

// GET EXPENSES!

export async function getExpenses (userId, month, year) {
  console.log(4)

  // GET EXPENSES OF THAT USER!
  const expenses = await expenseModel.find({
    userId: userId,
    month: month,
    year: Number(year)
  })
  console.log(5)

  return { expenses }
}
