export async function expenseWarningFunction (
  userCategories,
  allTransactions,
  _DATA,
  budgetCategories
) {
  let IS_EXPENSE_VOILATION = false

  const result = await userCategories()
  if (result?.error) return

  // CHECK FOR LIMIT EXCEEDS !!
  const ONLY_EXPENSES = allTransactions.filter(t => t?.description)
  // FROM THAT GET THOSE WHOSE CATEGORY ID MATCHES !!
  const ONLY_THAT_CATEGORY = ONLY_EXPENSES.filter(
    c => c?.categoryId?._id === _DATA?.categoryId._id
  )
  console.log('ONLY THAT CATEGORY: ', ONLY_THAT_CATEGORY)
  // NOW ADDED THE TOTAL AMOUNT !!
  const TOTAL_AMOUNT = ONLY_THAT_CATEGORY.reduce(
    (acc, curr) => acc + curr?.money,
    0
  )
  console.log('TOTAL_AMOUNT: ', TOTAL_AMOUNT)
  // NOW CHECK WETHER IT IS GREATER THAN THE MONTHLY LIMIT OR NOT !!
  const MONTHLY_LIMIT = budgetCategories.filter(
    b => b?.categoryId?._id === _DATA?.categoryId._id
  )[0]?.monthlyLimit
  const CURRENCY_FOR_THAT_LIMIT = budgetCategories.filter(
    b => b?.categoryId?._id === _DATA?.categoryId._id
  )[0]?.currency
  console.log(
    `Monthly Limit for expense category ${_DATA?.categoryId?.categoryName} is ${MONTHLY_LIMIT}`
  )
  // IF THERE IS ANY EXCEEDING AMOUNT!
  const warningOnAmount = TOTAL_AMOUNT + Number(_DATA?.amount) - MONTHLY_LIMIT
  // CHECKING IF THE AMOUNT EXCEEDS!
  if (warningOnAmount > 0) {
    console.log(
      `Monthly Limit Exceeds for expense category ${_DATA?.categoryId?.categoryName}`
    )
    IS_EXPENSE_VOILATION = true
  }

  return {
    success: IS_EXPENSE_VOILATION,
    warningOnAmount,
    TOTAL_AMOUNT,
    MONTHLY_LIMIT,
    CURRENCY_FOR_THAT_LIMIT,
  }
}
