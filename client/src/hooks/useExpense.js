import { useCookies } from 'react-cookie'
import { getCurrentUserId } from '../utils/getCurrentUserId'
import getCompleteDate from '../utils/getCompleteDate'
import { ValidateIncomeData } from '../utils/incomeValidations'
import { useContext } from 'react'
import { AllContext } from '../states/ContextProvider'
import toast from 'react-hot-toast'
import useCategories from './useCategory'
import {
  currencyConverterForEachCategory,
} from '../utils/exchangeRates'

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

      if (budgetCategories?.length === 0) {
        const result = await userCategories()
        if (result?.error) return
      }

      // CHECK FOR LIMIT EXCEEDS !!
      const ONLY_EXPENSES = allTransactions.filter(t => t?.description)
      // FROM THAT GET THOSE WHOSE CATEGORY ID MATCHES !!
      const ONLY_THAT_CATEGORY = ONLY_EXPENSES.filter(
        c => c?.categoryId?._id === _DATA?.categoryId._id
      )

      const responseFromConverter = currencyConverterForEachCategory(
        ONLY_THAT_CATEGORY,
        _DATA.currency,
        budgetCategories,
        _DATA
      )

      const DATA = {
        ...date,
        ..._DATA2,
        userId: user.userId,
        need_to_send_email: responseFromConverter.need_to_send_email,
        monthlyData: budgetCategories.filter(
          b => b?.categoryId?._id === _DATA?.categoryId._id
        )[0],
        exceedingAmount:
          responseFromConverter.warningOnAmount > 0
            ? responseFromConverter.warningOnAmount
            : 0
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
