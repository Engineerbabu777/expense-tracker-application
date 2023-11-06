import { useCookies } from 'react-cookie'
import { getCurrentUserId } from '../utils/getCurrentUserId'
import { ValidateIncomeData } from '../utils/incomeValidations'
import getCompleteDate from '../utils/getCompleteDate'
import { useContext } from 'react'
import { AllContext } from '../states/ContextProvider'
import toast from 'react-hot-toast'

export default function useIncome () {
  const [cookies, setCookies] = useCookies()
  const { setAllTransactions, setShowModal, editTrans } = useContext(AllContext)

  const updateIncomes = (_data) => {
    // GET CURRENT USER!
    try {
      // CHECK IF USER ID EXISTS!
      const user = getCurrentUserId(cookies['@authTokenExpense'])

      // NOW VALIDATE THIS DATA!
      // ValidateIncomeData(_data)


      fetch('http://localhost:4444/api/income/edit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json'
        },
        body: JSON.stringify({ trans: _data, userId: user?.userId, _id: editTrans?._id})
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

  const deleteIncomeById = _ID => {
    // GET CURRENT USER!
    try {
      // CHECK IF USER ID EXISTS!
      const user = getCurrentUserId(cookies['@authTokenExpense'])

      fetch(
        'http://localhost:4444/api/income/deleteById?deleteId=' +
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
            setAllTransactions(prev => [...prev.filter(i => i._id !== _ID)])
            toast.success('Success!')
          }
        })
      )
    } catch (err) {
      console.log('DELETE INCOME ERROR! ', err)
      return { error: true, message: err.message }
    }
  }

  const addNewIncome = async _DATA => {
    // VALIDATIONS FIRST!
    // GET CURRENT USER!
    try {
      // CHECK IF USER ID EXISTS!
      const user = getCurrentUserId(cookies['@authTokenExpense'])

      // NOW VALIDATE THIS DATA!
      ValidateIncomeData(_DATA)

      const date = getCompleteDate()

      const DATA = {
        ...date,
        ..._DATA,
        userId: user.userId
      }

      fetch('http://localhost:4444/api/income/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json'
        },
        body: JSON.stringify(DATA)
      }).then(response =>
        response.json().then(data => {
          if (data?.success) {
            setAllTransactions(prev => [...prev, data?.newIncome])
            setShowModal(false)
          }
        })
      )
    } catch (err) {
      console.log('ADD NEW INCOME ERROR! ', err)
      return { error: true, message: err.message }
    }
  }

  return { updateIncomes, deleteIncomeById, addNewIncome }
}
