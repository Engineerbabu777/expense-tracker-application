import React, { useContext, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/shared/Header/Header'
import HomeLayout from '../../components/home/Layout'
import LeftSide from '../../components/home/Left/Left'
import RightSide from '../../components/home/Right/Right'
import useTrans from '../../hooks/useTrans'
import { AllContext } from '../../states/ContextProvider'
import { dashboardData } from '../../utils/getDashboardData'

export default function HomePage () {
  const [cookies] = useCookies([])
  const navigate = useNavigate()

  const { getTrans } = useTrans()
  const { allTransactions, setDashboardData, filterType } =
    useContext(AllContext)

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies['@authTokenExpense']) {
        // IF TOKEN NOT AVAILABLE RETURN BACK TO LOGIN PAGE!
        // NEXT.. DO TOKEN VERIFICATION(CHECKING DATABASES)!
        navigate('/login')
      } else {
        if (allTransactions.length === 0) {
          getTrans()
        } else {
          // CALLING THE FUNCTION AND GETTING SOME DATA!
          const {
            totalExpenses,
            totalIncomes,
            lastFewTransactions,
            savingAlongIncomeExpenses
          } = dashboardData(allTransactions, filterType)
          // RESETTING THE DASHBOARD DATA
          setDashboardData({
            totalExpenses,
            totalIncomes,
            savingAlongIncomeExpenses,
            lastFewTransactions,
            allDataFetched: true,
            currency: filterType
          })
        }
        // MAKE A REQUEST AND GET USER!
      }
    }
    verifyCookie()
  }, [cookies, navigate, filterType])

  return (
    <>
      <div
        style={{
          backgroundColor: '#151515',
          height: '100%',
          width: '100%',
          fontFamily: 'Urbanist',
          overflow: 'hidden'
        }}
      >
        {/* HEADER FOR ALL PAGES! */}
        <Header />

        {/* LAYOUT! */}
        <HomeLayout>
          {/* LEFT SIDE BAR! */}
          <LeftSide />

          {/* RIGHT SIDE BAR! */}
          <RightSide />
        </HomeLayout>
      </div>
    </>
  )
}
