import { useCookies } from 'react-cookie'
import { getCurrentUserId } from '../utils/getCurrentUserId'
import getCompleteDate from '../utils/getCompleteDate'
import { useContext, useEffect, useState } from 'react'
import { AllContext } from '../states/ContextProvider'

export default function useTrans () {
  const [cookies] = useCookies()

  const { setAllTransactions} = useContext(AllContext)
  const [loadingTrans, setLoadingTrans] = useState(false);

  useEffect(() => {
    if (cookies['@authTokenExpense']) {
      getTrans()
    }
  }, [cookies])

  const getTrans = async () => {
    // GET CURRENT USER!
    try {
      // CHECK IF USER ID EXISTS!
      const user = getCurrentUserId(cookies['@authTokenExpense'])

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
          setLoadingTrans(false)
          setAllTransactions(data.allTransactions)
          console.log('HELLE: ', data)
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
