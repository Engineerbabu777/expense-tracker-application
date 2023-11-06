import { useCookies } from 'react-cookie'
import { getCurrentUserId } from '../utils/getCurrentUserId'
import getCompleteDate from '../utils/getCompleteDate'
import { ValidateIncomeData } from '../utils/incomeValidations'
import { useContext } from 'react'
import { AllContext } from '../states/ContextProvider'
import toast from 'react-hot-toast'
import useCategories from './useCategory'

export default function useExpense () {
  const [cookies, setCookies] = useCookies([])
  const { userCategories } = useCategories()
  const {
    setAllTransactions,
    setShowModal,
    editTrans,
    allTransactions,
    budgetCategories
  } = useContext(AllContext)

  const addNewExpense = async _DATA => {
    let IS_EXPENSE_VOILATION = false
    // VALIDATIONS FIRST!
    // GET CURRENT USER!
    try {
      // CHECK IF USER ID EXISTS!
      const user = getCurrentUserId(cookies['@authTokenExpense'])

      const _DATA2 = {
        amount: _DATA?.amount,
        currency: _DATA?.currency,
        description: _DATA?.description,
        categoryId: _DATA?.categoryId?._id
      }

      // NOW VALIDATE THIS DATA!
      ValidateIncomeData(_DATA2)

      const date = getCompleteDate()

      const result = await userCategories();
      if(result?.error) return;

      // CHECK FOR LIMIT EXCEEDS !!
      const ONLY_EXPENSES = allTransactions.filter(t => t?.description)
      // FROM THAT GET THOSE WHOSE CATEGORY ID MATCHES !!
      const ONLY_THAT_CATEGORY = ONLY_EXPENSES.filter(
        c => c?.categoryId?._id === _DATA?.categoryId._id
      )
      console.log('ONLY THAT CATEGORY: ', ONLY_THAT_CATEGORY)
      // NOW ADDED THE TOTAL AMOUNT !!
      const TOTAL_AMOUNT = ONLY_THAT_CATEGORY.reduce(
        (acc, curr) => acc + curr?.money,
        0
      )
      console.log('TOTAL_AMOUNT: ', TOTAL_AMOUNT)
      // NOW CHECK WETHER IT IS GREATER THAN THE MONTHLY LIMIT OR NOT !!
      const MONTHLY_LIMIT = budgetCategories.filter(
        b => b?.categoryId?._id === _DATA?.categoryId._id
      )[0]?.monthlyLimit
      const CURRENCY_FOR_THAT_LIMIT = budgetCategories.filter(
        b => b?.categoryId?._id === _DATA?.categoryId._id
      )[0]?.currency
      console.log(
        `Monthly Limit for expense category ${_DATA?.categoryId?.categoryName} is ${MONTHLY_LIMIT}`
      )
      // IF THERE IS ANY EXCEEDING AMOUNT!
      const warningOnAmount =
        TOTAL_AMOUNT + Number(_DATA?.amount) - MONTHLY_LIMIT
      // CHECKING IF THE AMOUNT EXCEEDS!
      if (warningOnAmount > 0) {
        console.log(
          `Monthly Limit Exceeds for expense category ${_DATA?.categoryId?.categoryName}`
        )
        IS_EXPENSE_VOILATION = true
      }

      // IF ITS GREATER THAN THAT THEN SEND EMAIL TO THE USER !!
      const DATA = {
        ...date,
        ..._DATA2,
        userId: user.userId,
        need_to_send_email: IS_EXPENSE_VOILATION,
        monthlyData: budgetCategories.filter(
          b => b?.categoryId?._id === _DATA?.categoryId._id
        )[0],
        exceedingAmount: warningOnAmount > 0 ? warningOnAmount : 0
      }

      // AND ALSO DISPLAY THE MESSAGE / ON SCREEN !!

      fetch('http://localhost:4444/api/expense/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json'
        },
        body: JSON.stringify(DATA)
      }).then(response =>
        response.json().then(data => {
          if (data?.success) {
            setAllTransactions(prev => [...prev, data?.newExpense])
            setShowModal(false)
          }
        })
      )
    } catch (err) {
      console.log('ADD NEW INCOME ERROR! ', err)
      return { error: true, message: err.message }
    }
  }

  const deleteExpenseById = _ID => {
    // GET CURRENT USER!
    try {
      // CHECK IF USER ID EXISTS!
      const user = getCurrentUserId(cookies['@authTokenExpense'])

      fetch(
        'http://localhost:4444/api/expense/deleteById?deleteId=' +
          _ID +
          '&userId=' +
          user.userId,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json'
          }
        }
      ).then(response =>
        response.json().then(data => {
          if (data?.success) {
            setAllTransactions(prev => [
              ...prev.filter(expense => expense._id !== _ID)
            ])
            console.log('DELETED!')
            toast.success('Success!')
          }
        })
      )
    } catch (err) {
      console.log('DELETE EXPENSE ERROR! ', err)
      return { error: true, message: err.message }
    }
  }

  const updateExpenseById = _data => {
    // GET CURRENT USER!
    try {
      // CHECK IF USER ID EXISTS!
      const user = getCurrentUserId(cookies['@authTokenExpense'])

      // NOW VALIDATE THIS DATA!
      //  ValidateIncomeData(_data)

      fetch('http://localhost:4444/api/expense/edit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json'
        },
        body: JSON.stringify({
          trans: _data,
          userId: user?.userId,
          _id: editTrans?._id
        })
      }).then(response =>
        response.json().then(data => {
          console.log('UPDATED: ', data)
          if (data?.success) {
            setAllTransactions(prev => [
              ...prev.filter(i => i._id !== editTrans?._id),
              data?.updated
            ])
          }
        })
      )
    } catch (err) {
      console.log('EDIT INCOME ERROR! ', err)
      return { error: true, message: err.message }
    }
  }

  return {
    addNewExpense,
    deleteExpenseById,
    updateExpenseById
  }
}
