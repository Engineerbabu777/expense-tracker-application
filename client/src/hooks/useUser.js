import { useCookies } from 'react-cookie'
import { updateUserVal } from '../utils/authValidations'
import { getCurrentUserId } from '../utils/getCurrentUserId'
import { useContext } from 'react'
import { AllContext } from '../states/ContextProvider'
import toast from 'react-hot-toast'

export default function useUser () {
  const [cookies, setCookies, removeCookie] = useCookies()
  const { currentUser, setCurrentUser, setLoadingUser } = useContext(AllContext)

  // GET CURRENT USER!!
  const getCurrentUser = async () => {
    if (currentUser?.email) return // THAT MEANS USER ALREADY FETCHED!
    try {
      setLoadingUser(true)
      // CHECK IF USER ID EXISTS!
      const user = getCurrentUserId(cookies['@authTokenExpense'])

      fetch(
        'http://localhost:4444/api/user/logged?userId=' + user?.userId
      ).then(response =>
        response.json().then(data => {
          console.log(data.currentUser)

          if (data?.success) {
            setCurrentUser(data.currentUser)
            setLoadingUser(false)
          }
        })
      )
    } catch (error) {
      console.log('GETTING USER ERROR: ', error.message)
      return { error: true, message: error?.message }
    }
  }

  const updateUser = async DATA => {
    try {
      toast.success('1')
      // CHECK IF USER ID EXISTS!
      const user = getCurrentUserId(cookies['@authTokenExpense'])

      // CHECKING USER!!
      updateUserVal(DATA?.name, DATA?.email, DATA?.password)

      const data = {
        name: DATA?.name,
        email: DATA?.email,
        image: DATA?.image,
        userId: user?.userId,
        password: DATA?.password
      }

      // MAKE THE API REQUEST!
      fetch('http://localhost:4444/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json'
        },
        body: JSON.stringify(data)
      }).then(response =>
        response.json().then(data => {
          if (data?.error) {
            toast.error(data?.message)
          } else {
            toast.success(data?.message)
            setCurrentUser(data.currentUser)
          }
          console.log('UPDATED DATA: ', data)
        })
      )
    } catch (err) {
      console.log('UPDATING USER ERROR! ', err)
      toast.success('Error while updating.. try later')
      return { error: true, message: err.message }
    }

    // GO TO UPDATE THE DATA!
  }

  // DELETE USER DATA!
  const deleteUserData = async () => {
    try {
      // CHECK IF USER ID EXISTS!
      const user = getCurrentUserId(cookies['@authTokenExpense'])

      fetch('http://localhost:4444/api/user/data?userId=' + user?.userId, {
        method: 'DELETE'
      }).then(response =>
        response.json().then(data => {
          if (data?.success) {
            toast.success(data?.message)
            removeCookie('@authTokenExpense')
          } else {
            toast.error(data?.message)
          }
        })
      )
    } catch (error) {
      console.log('ERROR WHILE DELETING USER DATA!')
      toast.error(error?.message)
    }
  }

  // DELETE USER ACCOUNT!
  const deleteUserAccount = async () => {
    try {
      // CHECK IF USER ID EXISTS!
      const user = getCurrentUserId(cookies['@authTokenExpense'])

      fetch('http://localhost:4444/api/user/account?userId=' + user?.userId, {
        method: 'DELETE'
      }).then(response =>
        response.json().then(data => {
          if (data?.success) {
            toast.success(data?.message)
            removeCookie('@authTokenExpense')
          } else {
            toast.error(data?.message)
          }
        })
      )
    } catch (error) {
      console.log('ERROR WHILE DELETING USER ACCOUNT!')
      toast.error(error?.message)
    }
  }

  // DEACTIVATE USER ACCOUNT!
  const deActivateUserAccount = async () => {
    try {
      // CHECK IF USER ID EXISTS!
      const user = getCurrentUserId(cookies['@authTokenExpense'])

      fetch(
        'http://localhost:4444/api/user/deactivate?userId=' + user?.userId,
        {
          method: 'PUT'
        }
      ).then(response =>
        response.json().then(data => {
          if (data?.success) {
            toast.success(data?.message)
            removeCookie('@authTokenExpense')
          } else {
            toast.error(data?.message)
          }
        })
      )
      return { success: true }
    } catch (error) {
      console.log('ERROR WHILE DELETING USER ACCOUNT!')
      toast.error(error?.message)
    }
  }
  return {
    updateUser,
    getCurrentUser,
    deleteUserData,
    deleteUserAccount,
    deActivateUserAccount
  }
}
