import { createContext, useState } from 'react'
import { useCookies } from 'react-cookie'

export const AllContext = createContext(null)

export default function AllContextProvider ({ children }) {
  // MODAL STATES!
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [allCategories, setAllCategories] = useState([])
  const [editCategory, setEditCategory] = useState(null)
  const [userCategories, setUserCategories] = useState([])
  const [budgetCategories, setBudgetCategories] = useState([])
  const [allTransactions, setAllTransactions] = useState([])
  const [editTrans, setEditTrans] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [cookies, setCookies] = useCookies()
  const [loadingUser, setLoadingUser] = useState(false)
  const [isBudgetAvailable, setIsBudgetAvailable] = useState(false)
  const [monthlyBudgetId, setMonthlyBudgetId] = useState(null)
  const [filterType, setFilterType] = useState('pkr')

  // DASHBOARD STATES!
  const [dashboardData, setDashboardData] = useState({
    totalExpenses: 0,
    totalIncomes: 0,
    savingAlongIncomeExpenses: 0,
    lastFewTransactions: [],
    allDataFetched: false,
    currency:'pkr'
  })

  console.log(showModal, modalType, currentUser)

  return (
    <>
      <AllContext.Provider
        value={{
          showModal,
          setShowModal,
          setModalType,
          modalType,
          allCategories,
          setAllCategories,
          editCategory,
          setEditCategory,
          setUserCategories,
          userCategories,
          setBudgetCategories,
          budgetCategories,
          allTransactions,
          setAllTransactions,
          setEditTrans,
          editTrans,
          dashboardData,
          setDashboardData,
          currentUser,
          setCurrentUser,
          loadingUser,
          setLoadingUser,
          setIsBudgetAvailable,
          isBudgetAvailable,
          setMonthlyBudgetId,
          monthlyBudgetId,
          filterType,
          setFilterType
        }}
      >
        {children}
      </AllContext.Provider>
    </>
  )
}
