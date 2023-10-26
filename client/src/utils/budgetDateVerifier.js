function getFullMonthName (shortMonth) {
  const monthMapping = {
    Jan: 'January',
    Feb: 'February',
    Mar: 'March',
    Apr: 'April',
    May: 'May',
    Jun: 'June',
    Jul: 'July',
    Aug: 'August',
    Sep: 'September',
    Oct: 'October',
    Nov: 'November',
    Dec: 'December'
  }

  return monthMapping[shortMonth]
}


export const Verifier = MY_D => {
  if (MY_D === null || undefined) {
    throw new Error('Please provide a date!')
  }
  const myDate = new Date(MY_D)
  const SELECTED_DATE = myDate.toDateString().slice(0, 15)
  const SELECTED_DAY = SELECTED_DATE.toString().slice(8, 10)
  const SELECTED_MONTH = SELECTED_DATE.slice(4, 7)
  const SELECTED_YEAR = SELECTED_DATE.slice(11, 15)

  // CHECK FOR  CURRENT DATE!
  const date = new Date()
  const CURRENT_DATE = date.toDateString().slice(0, 15)
  const CURRENT_DAY = CURRENT_DATE.toString().slice(8, 10)
  const CURRENT_MONTH = CURRENT_DATE.toString().slice(4, 7)
  const CURRENT_YEAR = CURRENT_DATE.toString().slice(11, 15)

  // DATE MUST NOT BE GREATER THAN CURRENT!
  if (
    SELECTED_DAY + 1 < CURRENT_DAY + 1 &&
    SELECTED_MONTH === CURRENT_MONTH &&
    SELECTED_YEAR === CURRENT_YEAR
  ) {
    throw new Error("Date shouldn't be > Today's!")
  }

  const month = getFullMonthName(SELECTED_MONTH)
  const year = SELECTED_YEAR
  const day = SELECTED_DAY + 1
  return { success: true, month, year, date: day }
}
