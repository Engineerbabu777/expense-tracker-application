import { useCookies } from 'react-cookie'
import { getCurrentUserId } from '../utils/getCurrentUserId'
import getCompleteDate from '../utils/getCompleteDate'
import { useContext, useEffect, useState } from 'react'
import { AllContext } from '../states/ContextProvider'
import useCategories from './useCategory'

export default function useTrans () {
  const [cookies] = useCookies()

  const { setAllTransactions, allTransactions, setDashboardData } =
    useContext(AllContext)
  const [loadingTrans, setLoadingTrans] = useState(false)
  const { userCategories } = useCategories()

  useEffect(() => {
    if (cookies['@authTokenExpense']) {
      getTrans()
    }
  }, [cookies])

  const getTrans = async () => {
    // SAVE FROM REQUESTING AGAIN AND AGAIN !!
    if (allTransactions?.length > 0) {
      console.log('NO MORE REQUESTS DATA IS ALREADY AVAILABLE!')
      return
    }
    // GET CURRENT USER!
    try {
      // CHECK IF USER ID EXISTS!
      const user = getCurrentUserId(cookies['@authTokenExpense'])

      await userCategories()

      // NOW VALIDATE THIS DATA!

      const date = getCompleteDate()

      setLoadingTrans(true)

      fetch(
        'http://localhost:4444/api/transactions/month?month=' +
          date?.month +
          '&year=' +
          date?.year +
          '&userId=' +
          user?.userId,
        {
          method: 'GET'
        }
      ).then(response =>
        response.json().then(data => {
          // DO CALCULATIONS !!
          // FILTER OUT EXPENSE!
          const expenses = data?.allTransactions?.filter(t => t?.description) // GET ALL EXPENSES!
          // EXPENSES TOTAL!
          const totalExpenses = expenses?.reduce(
            (acc, obj) => obj?.money + acc,
            0
          ) // HERE ALL EXPENSES AMOUNT WILL BE TAKEN!
          // FILTER OUT INCOMES!
          const incomes = data?.allTransactions?.filter(t => t?.source) // GET ALL EXPENSES!
          // GET TOTAL INCOMES!
          const totalIncomes = incomes?.reduce(
            (acc, obj) => obj?.money + acc,
            0
          ) // HERE WE WILL GET ALL INCOMES!
          const savingAlongIncomeExpenses = totalIncomes - totalExpenses
          const lastFewTransactions = [
            ...expenses?.slice(0, 5),
            ...incomes.slice(0, 5)
          ]

          setDashboardData({
            totalExpenses,
            totalIncomes,
            savingAlongIncomeExpenses,
            lastFewTransactions,
            allDataFetched: true
          })

          setLoadingTrans(false)
          setAllTransactions(data.allTransactions)
        })
      )
    } catch (err) {
      setLoadingTrans(false)

      console.log('GET TRANSACTIONS ERROR ! ', err)
      return { error: true, message: err.message }
    }
  }

  return {
    getTrans,
    loadingTrans
  }
}
