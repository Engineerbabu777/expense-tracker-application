// CURRENCY AMOUNT CONVERTER!!
export const exchangeRates = {
  dollar: {
    pkr: 286.6,
    inr: 84,
    lira: 30,
    dollar: 1
  },
  pkr: {
    dollar: 0.0035,
    inr: 0.3,
    lira: 0.1,
    pkr: 1
  },
  inr: {
    dollar: 0.012,
    pkr: 3.44,
    lira: 0.34,
    inr: 1
  },
  lira: {
    dollar: 0.035,
    pkr: 9.99,
    lira: 1,
    inr: 2.9
  }
}

// -------------------------------------------

// CONVERT TO SPECIFIC CURRENCY!
export const convertToSpecificCurrency = (original, convert, amount) => {
  const convertedAmount = exchangeRates[original][convert] * Number(amount)
// console.log({rate:convertedAmount.toFixed(2)})
  return { rate: convertedAmount?.toFixed(2) }
}

// --------------------------------------------

// CONVERTING THE WHOLE CATEGORY FOR EMAIL SENDING!
export const currencyConverterForEachCategory = (
  categoryArray,
  selectedCurrency,
  budgetCategories,
  _DATA
) => {
  let amount = 0
  categoryArray.forEach(category => {
    const convertedAmount = convertToSpecificCurrency(
      category.currency,
      selectedCurrency,
      category.money
    )
    amount += convertedAmount.rate
  })

  const MONTHLY_LIMIT = budgetCategories?.filter(
    b => b?.categoryId?._id === _DATA?.categoryId._id
  )[0]

  const limit = convertToSpecificCurrency(
    MONTHLY_LIMIT.currency,
    _DATA.currency,
    MONTHLY_LIMIT?.monthlyLimit
  )

  // NOW VERIFY THE LIMIT!!
  const TOTAL_AMOUNT = amount + _DATA.amount
  // IF THERE IS ANY EXCEEDING AMOUNT!
  const warningOnAmount =
    TOTAL_AMOUNT + Number(_DATA?.amount) - Number(MONTHLY_LIMIT.monthlyLimit)
  // CHECKING IF THE AMOUNT EXCEEDS!
  if (warningOnAmount > 0) {
    console.log(
      `Monthly Limit Exceeds for expense category ${_DATA?.categoryId?.categoryName}`
    )
  }

  console.log('DATA IS HERE: : ', {
    warningOnAmount,
    limit,
    TOTAL_AMOUNT,
    amount
  })

  return {
    warningOnAmount,
    need_to_send_email: warningOnAmount > 0 ? true : false
  }
}
