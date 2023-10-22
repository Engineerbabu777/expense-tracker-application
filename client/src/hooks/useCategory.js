import { useCookies } from 'react-cookie'
import { dataValidations } from '../utils/expenseValidations'
import { getCurrentUserId } from '../utils/getCurrentUserId'
import { useState } from 'react'

export default function useCategories () {
  const [cookies] = useCookies([])

  const [loadingState, setLoadingState] = useState(false)

  const addCategory = async data => {
    try {
      setLoadingState(true)
      // CHECK IF USER ID EXISTS!
      const response = getCurrentUserId(cookies['@authTokenExpense'])

      // NOW VALIDATE THIS DATA!
      const validator = dataValidations(data) // THIS WILL RETURN TRUE IF EVERYTHING GOING WELL!

      console.log('DATA SENDING... ', data)

      if (validator) {
        // CONTINUE SAVING NEW CATEGORY!
        const body = {
          categoryName: data.name,
          categoryLimit: data.limit,
          colorCode: data.code,
          currency: data.currency,
          userId: response.userId
        }

        const _RESPONSE = await fetch(
          'http://localhost:4444/api/category/add',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              accept: 'application/json'
            },
            body: JSON.stringify(body)
          }
        )
        
        const resp = await _RESPONSE.json().then()

        console.log('THE DATA: ', resp)
        // CHECK IF ERROR!
        if (resp?.error) {
          setLoadingState(false)
          return { error: true, message: data.message }
        }

        // CHECK IF SUCCESS!
        if (resp?.success) {
          setLoadingState(false)
          return { success: true, newCategory: data.newCategory }
        }
      }
    } catch (err) {
      console.log('ERROR:  ', err.message)
      return { error: true, message: err.message }
    }
  }

  const updateCategory = () => {}

  const getCategories = () => {}

  const deleteCategories = () => {}

  return {
    addCategory,
    deleteCategories,
    updateCategory,
    getCategories,
    loadingState,
    setLoadingState
  }
}
