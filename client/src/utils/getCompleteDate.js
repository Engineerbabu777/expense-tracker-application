import { getFullMonthName } from './budgetDateVerifier'

export default function getCompleteDate () {
  // CHECK FOR  CURRENT DATE!
  const date = new Date()
  const CURRENT_DATE = date.toDateString().slice(0, 15)
  const CURRENT_DAY = CURRENT_DATE.toString().slice(8, 10)
  const CURRENT_MONTH = CURRENT_DATE.toString().slice(4, 7)
  const CURRENT_YEAR = CURRENT_DATE.toString().slice(11, 15)

  const month = getFullMonthName(CURRENT_MONTH)

  return {
    month,
    year: CURRENT_YEAR,
    day: CURRENT_DAY
  }
}
