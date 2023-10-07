import React, { useContext } from 'react'
import { AuthContext } from '../../states/Auth'
import { Navigate, useNavigation } from 'react-router-dom'

export default function HomePage () {
  const { loadingState, isLoggedIn } = useContext(AuthContext)

  if (loadingState) {
    return 'loading...'
  }

  if (!isLoggedIn) {
    return <Navigate to='/login' />
  }
  return <div>Home page</div>
}
