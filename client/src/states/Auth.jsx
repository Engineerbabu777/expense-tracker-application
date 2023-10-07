import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext(null)

export default function AuthContextProvider ({ children }) {
  // CREATING STATE FOR HANDLING LOGGED USER!
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loadingState, setLoadingState] = useState(false)

  const getLoginStatus = () => {
    setLoadingState(true)
    // CHECK IF TOKEN IS AVAILABLE!
    const token = localStorage.getItem('@authTokenExpense')
    if (token) {
      setIsLoggedIn(true)
      setLoadingState(false)
    }else{
      setIsLoggedIn(false)
      setLoadingState(false)
    }
  }

  useEffect(() => {
    getLoginStatus()
  }, [])

  return (
    <>
      <AuthContext.Provider value={{ setIsLoggedIn, isLoggedIn, loadingState }}>
        {children}
      </AuthContext.Provider>
    </>
  )
}
