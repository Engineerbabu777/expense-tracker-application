import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { getCurrentUserId } from '../utils/getCurrentUserId'
import { Verifier } from '../utils/budgetDateVerifier'

export default function useBudget () {
  const [cookies] = useCookies([])

  const [loadingState, setLoadingState] = useState(false)
  const [loadingData, setLoadingData] = useState(false)

  const createNewBudget = async MY_DATE => {
    // GET CURRENT USER!
    try {
      setLoadingState(true)
      // CHECK IF USER ID EXISTS!
      const user = getCurrentUserId(cookies['@authTokenExpense'])

      // NOW VALIDATE THIS DATA!
      const response = Verifier(MY_DATE)

      if (response) {
        // CONTINUE SAVING NEW CATEGORY!
        const body = {
          budgetDate: response.date,
          budgetMonth: response.month,
          budgetYear: response.year,
          userId: user.userId
        }

        const _RESPONSE = await fetch('http://localhost:4444/api/budget/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json'
          },
          body: JSON.stringify(body)
        })

        const resp = await _RESPONSE.json().then()
        console.log('CHECK: ', resp?.newBudget)

        // CHECK IF ERROR!
        if (resp?.error) {
          setLoadingState(false)
          return { error: true, message: resp.message }
        }

        // CHECK IF SUCCESS!
        if (resp?.success) {
          setLoadingState(false)
          //   setAllCategories(prev => [...prev, resp?.newCategory])
          //   setShowModal(false)
          return {
            success: true,
            newBudget: resp?.newBudget,
            message: 'New Budget Added!'
          }
        }
      }
    } catch (err) {
      return { error: true, message: err.message }
    }
  }
  const deleteAnyBudget = () => {}
  const updateAnyBudget = () => {}
  const getAllBudgetsData = () => {}

  return { createNewBudget }
}
