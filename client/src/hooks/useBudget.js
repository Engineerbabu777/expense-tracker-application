import { useContext, useState } from 'react'
import { useCookies } from 'react-cookie'
import { getCurrentUserId } from '../utils/getCurrentUserId'
import { Verifier } from '../utils/budgetDateVerifier'
import { AllContext } from '../states/ContextProvider'
import { dataValidations } from '../utils/expenseValidations'
import getCompleteDate from '../utils/getCompleteDate'
import useCategories from './useCategory'

export default function useBudget () {
  const [cookies] = useCookies([])

  const [creatingBudget, setCreatingBudget] = useState(false)
  // const [loadingData, setLoadingData] = useState(false)
  const {
    setShowModal,
    setBudgetCategories,
    budgetCategories,
    setModalType,
    editCategory
  } = useContext(AllContext)
  const { userCategories } = useCategories()

  const createNewBudget = async MY_DATE => {
    // GET CURRENT USER!
    try {
      setCreatingBudget(true)
      // CHECK IF USER ID EXISTS!
      const user = getCurrentUserId(cookies['@authTokenExpense'])

      // NOW VALIDATE THIS DATA!
      const response = Verifier(MY_DATE)

      if (response) {
        // CONTINUE SAVING NEW CATEGORY!
        const body = {
          date: response.date,
          month: response.month,
          year: response.year,
          userId: user.userId
        }

        console.log(body)

        const _RESPONSE = await fetch('http://localhost:4444/api/budget/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json'
          },
          body: JSON.stringify(body)
        })

        const resp = await _RESPONSE.json().then()
        // console.log('CHECK: ', resp)

        // CHECK IF ERROR!
        if (resp?.error) {
          setCreatingBudget(false)
          return { error: true, message: resp.message }
        }

        // CHECK IF SUCCESS!
        if (resp?.success) {
          setBudgetCategories(resp?.userCategories)
          setCreatingBudget(false)
          console.log('good')
          setShowModal(false)
          setModalType('none')
        }
        return {
          success: true,
          newBudget: resp?.newBudget,
          message: 'New Budget Added!'
        }
      }
    } catch (err) {
      return { error: true, message: err.message }
    }
  }

  const editMonthlyBudgetCategory = async data => {
    // GET CURRENT USER!
    try {
      setCreatingBudget(true)
      // CHECK IF USER ID EXISTS!
      const user = getCurrentUserId(cookies['@authTokenExpense'])

      const response = dataValidations(data)

      const completeDate = getCompleteDate()
      console.log('SELECTED DATA: ', data)

      if (true) {
        // CONTINUE SAVING NEW CATEGORY!
        const body = {
          month: completeDate.month,
          year: Number(completeDate.year),
          userId: user.userId,
          monthlyLimit: data.limit,
          currency: data.currency,
          categoryId: editCategory?._id,
          _id: editCategory?._id
        }

        console.log('BODY: ', body)

        const _RESPONSE = await fetch(
          'http://localhost:4444/api/budget/category',
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
        console.log('CHECK22: ', resp)

        // CHECK IF ERROR!
        if (resp?.error) {
          setCreatingBudget(false)
          return { error: true, message: resp.message }
        }

        // CHECK IF SUCCESS!
        if (resp?.success) {
          let userCategories = resp?.userCategories
          let userBudgetCategories = resp?.userBudgetCategories

          let newArray = []
          for (let i = 0; i < userCategories?.length; i++) {
            let isNotFound = true
            for (let j = 0; j < userBudgetCategories?.length; j++) {
              if (
                userCategories[i]?._id?.toString() ===
                userBudgetCategories[j]?.categoryId?._id?.toString()
              ) {
                newArray.push(userBudgetCategories[j])
                isNotFound = false
                break
              }
            }
            isNotFound && newArray.push(userCategories[i])
          }

          setBudgetCategories([...newArray])
          setShowModal(false)
          setModalType('none')
        }
        return {
          success: true,
          message: 'New Limit/Currency set!'
        }
      }
    } catch (err) {
      return { error: true, message: err.message }
    }
  }

  const getCurrentBudget = async () => {
    // GET CURRENT USER!
    try {
      setCreatingBudget(true)
      // CHECK IF USER ID EXISTS!
      const user = getCurrentUserId(cookies['@authTokenExpense'])
      // GETTING TODAYS DATE!
      const completeDate = getCompleteDate()
      // -> CALLING API AND GETTING DATA!
      const response = await fetch(
        'http://localhost:4444/api/budget/thisMonth?month=' +
          completeDate?.month +
          '&year=' +
          completeDate?.year +
          '&userId=' +
          user?.userId,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json'
          }
        }
      ).then(response => response.json())
      // GET USER CATEGORIES !!
      const allUserCategories = await userCategories()
      console.log('ALL USER CATEGORIES: ', allUserCategories)
      // RETURNING DATA BACK TO CALL!
      return {
        success: response?.monthBudget[0] ? true : false,
        message: 'New Limit/Currency set!'
      }
    } catch (err) {
      return { error: true, message: err.message }
    }
  }

  return {
    createNewBudget,
    creatingBudget,
    editMonthlyBudgetCategory,
    getCurrentBudget
  }
}
