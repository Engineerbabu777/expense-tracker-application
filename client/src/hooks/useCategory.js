import { useCookies } from 'react-cookie'
import { dataValidations } from '../utils/expenseValidations'
import { getCurrentUserId } from '../utils/getCurrentUserId'
import { useCallback, useMemo, useState } from 'react'

export default function useCategories () {
  const [cookies] = useCookies([])

  const [loadingState, setLoadingState] = useState(false)
  const [loadingData, setLoadingData] = useState(false)

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

  const getCategories = async () => {
    setLoadingData(true)

    try {
      // CHECK USER!
      const response = getCurrentUserId(cookies['@authTokenExpense'])

      const _RESPONSE = await fetch(
        'http://localhost:4444/api/category/getAll?userId=' + response?.userId
      )
      const FINAL_RESPONSE = await _RESPONSE.json().then()

      console.log('THE:-> ', FINAL_RESPONSE.categories)

      setLoadingData(false)

      return { success: true, categories: FINAL_RESPONSE?.categories }
    } catch (err) {
      setLoadingData(false)
      console.log('ERROR:  ', err.message)
      return { error: true, message: err.message }
    }
  }

  const deleteCategories = async deleteId => {
    setLoadingData(true)

    try {
      // CHECK USER!
      const token = getCurrentUserId(cookies['@authTokenExpense'])

      const _RESPONSE = await fetch(
        'http://localhost:4444/api/category/delete?userId=' +
          token?.userId +
          '&deleteId=' +
          deleteId,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      const FINAL_RESPONSE = await _RESPONSE.json().then()

      console.log('THE:-> ', FINAL_RESPONSE.success)

      setLoadingData(false)

      return { success: true }
    } catch (err) {
      setLoadingData(false)
      console.log('ERROR:  ', err.message)
      return { error: true, message: err.message }
    }
  }

  return {
    addCategory,
    deleteCategories,
    updateCategory,
    getCategories,
    loadingState,
    setLoadingState,
    loadingData
  }
}
