import { Route, Routes } from 'react-router'
import './App.css'
import HomePage from './pages/HomePage'
import { useContext } from 'react'
import { AuthContext } from './states/Auth'
import Login from './pages/Authentication/Login'
import Register from './pages/Authentication/Register'

function App () {
  const { isLoggedIn } = useContext(AuthContext)

  return (
    <>
      <Routes>
        <Route path='/' element={isLoggedIn ? <HomePage /> : <Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  )
}

export default App
