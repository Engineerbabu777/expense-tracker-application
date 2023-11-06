export function ValidateIncomeData (data) {
  console.log(data)
  if (
    !data?.amount ||
    (!data?.source && !data?.description) ||
    !data?.currency
  ) {
    throw new Error('Fields Look empty!')
  } else if (data?.amount <= 0) {
    throw new Error('Amount must be greater than 0!')
  } else if (
    (data?.source ? data?.source?.length < 4 : false) ||
    (data?.description ? data?.description?.length < 4 : false)
  ) {
    throw new Error('source/description length at least 5!')
  } else {
    if (data?.description && !data?.categoryId) {
      throw new Error('Category Not Selected!')
    }
    return true
  }
}
