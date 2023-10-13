import { Route, Routes } from 'react-router'
import './App.css'
import HomePage from './pages/Home/HomePage'
import Login from './pages/Authentication/Login'
import Register from './pages/Authentication/Register'
import ResetPassword from './pages/Authentication/Reset'
import ResetPasswordPage from './pages/Authentication/PasswordResetPage'
import TransactionPage from './pages/Transaction/TransactionPage'
import ReportsPage from './pages/Reports/Page'
import PrivacyPage from './pages/Privacy/Page'
import SettingsPage from './pages/Settings/Page'
import ExportPage from './pages/Exports/Page'
import ManagementPage from './pages/Management/Page'
import CategoriesPage from './pages/Categories/Page'

function App () {

  return (
    <>
      <Routes>
        <Route index element={<HomePage /> } />
        <Route path="/transactions" element={<TransactionPage /> } />
        <Route path="/categories" element={<CategoriesPage /> } />
        <Route path="/management" element={<ManagementPage /> } />
        <Route path="/reports" element={<ReportsPage /> } />
        <Route path="/export" element={<ExportPage /> } />
        <Route path="/privacy" element={<PrivacyPage /> } />
        <Route path="/settings" element={<SettingsPage /> } />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/resetpassword' element={<ResetPassword />} />
        <Route path='/resetPassword/:token' element={<ResetPasswordPage />} />
      </Routes>
    </>
  )
}

export default App
