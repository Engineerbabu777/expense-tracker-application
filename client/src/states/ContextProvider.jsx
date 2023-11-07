import { createContext, useState } from 'react'

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

  // DASHBOARD STATES!
  const [dashboardData, setDashboardData] = useState({
    totalExpenses: 0,
    totalIncomes: 0,
    savingAlongIncomeExpenses: 0,
    lastFewTransactions: [],
    allDataFetched: false
  })

  console.log(showModal, modalType)

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
          setDashboardData
        }}
      >
        {children}
      </AllContext.Provider>
    </>
  )
}
