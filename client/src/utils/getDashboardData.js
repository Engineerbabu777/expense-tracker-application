import { convertToSpecificCurrency } from './exchangeRates'

// GETTING DASHBOARD DATA!
export function dashboardData (data, type) {
  // FILTER OUT EXPENSE!
  const expenses = data?.filter(t => t?.description) // GET ALL EXPENSES!
  // EXPENSES TOTAL!
  const totalExpenses = expenses?.reduce((acc, obj) => {
    return (
      Number(
        Number(
          convertToSpecificCurrency(obj?.currency, type, obj?.money).rate
        ).toFixed(2)
      ) + acc
    )
  }, 0) // HERE ALL EXPENSES AMOUNT WILL BE TAKEN!

  // FILTER OUT INCOMES!
  const incomes = data?.filter(t => t?.source) // GET ALL EXPENSES!

  // GET TOTAL INCOMES!
  const totalIncomes = incomes?.reduce((acc, obj) => {
    return (
      Number(
        Number(
          convertToSpecificCurrency(obj?.currency, type, obj?.money).rate
        ).toFixed(2)
      ) + acc
    )
  }, 0) // HERE WE WILL GET ALL INCOMES!

  const savingAlongIncomeExpenses = totalIncomes - totalExpenses // SAVINGS!
  const lastFewTransactions = [...expenses?.slice(0, 5), ...incomes.slice(0, 5)] // LAST FEW TRANS FROM BOTH CAT'S!

  // RETURNING DATA!
  return {
    lastFewTransactions,
    savingAlongIncomeExpenses,
    totalExpenses,
    totalIncomes,
    success: true
  }
}
