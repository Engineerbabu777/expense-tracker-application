import { Route, Routes } from 'react-router'
import './App.css'
import HomePage from './pages/Home/HomePage'
import Login from './pages/Authentication/Login'
import Register from './pages/Authentication/Register'
import ResetPassword from './pages/Authentication/Reset'
import ResetPasswordPage from './pages/Authentication/PasswordResetPage'

function App () {

  return (
    <>
      <Routes>
        <Route index element={<HomePage /> } />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/resetpassword' element={<ResetPassword />} />
        <Route path='/resetPassword/:token' element={<ResetPasswordPage />} />
      </Routes>
    </>
  )
}

export default App
