import { createContext, useState } from 'react'

export const AuthContext = createContext(null)

export default function AuthContextProvider ({ children }) {
  // CREATING STATE FOR HANDLING LOGGED USER!
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
    <>
      <AuthContext.Provider value={{ setIsLoggedIn, isLoggedIn }}>
        {children}
      </AuthContext.Provider>
    </>
  )
}


