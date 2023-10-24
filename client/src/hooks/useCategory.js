import { useCookies } from 'react-cookie'
import { dataValidations } from '../utils/expenseValidations'
import { getCurrentUserId } from '../utils/getCurrentUserId'
import { useContext, useState } from 'react'
import { AllContext } from '../states/ContextProvider'

export default function useCategories () {
  const [cookies] = useCookies([])

  const [loadingState, setLoadingState] = useState(false)
  const [loadingData, setLoadingData] = useState(false)
  const { setAllCategories, setShowModal } = useContext(AllContext)

  const addCategory = async data => {
    try {
      setLoadingState(true)
      // CHECK IF USER ID EXISTS!
      const response = getCurrentUserId(cookies['@authTokenExpense'])

      // NOW VALIDATE THIS DATA!
      const validator = dataValidations(data) // THIS WILL RETURN TRUE IF EVERYTHING GOING WELL!

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
        console.log('CHECK: ', resp?.newCategory)

        // CHECK IF ERROR!
        if (resp?.error) {
          setLoadingState(false)
          return { error: true, message: data.message }
        }

        // CHECK IF SUCCESS!
        if (resp?.success) {
          setLoadingState(false)
          setAllCategories(prev => [...prev, resp?.newCategory])
          setShowModal(false)
          return {
            success: true,
            newCategory: resp?.newCategory,
            message: 'New Category Added!'
          }
        }
      }
    } catch (err) {
      return { error: true, message: err.message }
    }
  }
  const updateCategory = async data => {
    try {
      setLoadingState(true)
      // CHECK IF USER ID EXISTS!
      const response = getCurrentUserId(cookies['@authTokenExpense'])

      // NOW VALIDATE THIS DATA!
      const validator = dataValidations(data) // THIS WILL RETURN TRUE IF EVERYTHING GOING WELL!

      if (validator) {
        // CONTINUE SAVING NEW CATEGORY!
        const body = {
          categoryName: data.name,
          categoryLimit: data.limit,
          colorCode: data.code,
          currency: data.currency,
          userId: response.userId,
          id: data?.id
        }

        console.log('SENDING DATA:', body)

        const _RESPONSE = await fetch(
          'http://localhost:4444/api/category/update',
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              accept: 'application/json'
            },
            body: JSON.stringify(body)
          }
        )

        const resp = await _RESPONSE.json().then()

        console.log('RESP: ', resp)

        // CHECK IF ERROR!
        if (resp?.error) {
          setLoadingState(false)
          return { error: true, message: data.message }
        }

        // CHECK IF SUCCESS!
        if (resp?.success) {
          setLoadingState(false)
          setAllCategories(prev => [
            ...prev.filter(category => category?._id !== data?.id),
            resp?.updatedCategory
          ])
          setShowModal(false)
          return {
            success: true,
            updatedCategory: resp?.updatedCategory,
            message: 'Category Updated!'
          }
        }
      }
    } catch (err) {
      return { error: true, message: err.message }
    }
  }
  const getCategories = async () => {
    setLoadingData(true)

    try {
      // CHECK USER!
      const response = getCurrentUserId(cookies['@authTokenExpense'])

      const _RESPONSE = await fetch(
        'http://localhost:4444/api/category/getAll?userId=' + response?.userId
      )
      const FINAL_RESPONSE = await _RESPONSE.json().then()

      setLoadingData(false)

      setAllCategories(FINAL_RESPONSE.categories)

      return { success: true, message: 'Fetched all categories' }
    } catch (err) {
      setLoadingData(false)
      return { error: true, message: err.message }
    }
  }

  const deleteCategories = async deleteId => {
    try {
      // CHECK USER!
      const token = getCurrentUserId(cookies['@authTokenExpense'])

      setLoadingState(true)

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

      if (FINAL_RESPONSE?.success) {
        setAllCategories(prev => [
          ...prev.filter(category => category._id !== deleteId)
        ])
        setLoadingState(false)

        return { success: true }
      }

      return { error: true, message: FINAL_RESPONSE.message }
    } catch (err) {
      console.log('ERROR:  ', err.message)
      setLoadingState(false)
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
