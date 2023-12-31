import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/shared/Header/Header'
import HomeLayout from '../../components/home/Layout'
import LeftSide from '../../components/home/Left/Left'
import Transactions from '../../components/home/Transactions/Transactions'


export default function TransactionPage () {
  const [cookies] = useCookies([])
  const navigate = useNavigate()

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies['@authTokenExpense']) {
        navigate('/login')
      } else {
        // MAKE A REQUEST AND GET USER!
      }
    }
    verifyCookie()
  }, [cookies, navigate])

  return (
    <>
      <div
        style={{
          backgroundColor: '#151515',
          height: '100%',
          width: "100%",
          fontFamily: 'Urbanist',
          overflow:'hidden',

        }}
      >
        {/* HEADER FOR ALL PAGES! */}
        <Header />

        {/* LAYOUT! */}
        <HomeLayout>
          {/* LEFT SIDE BAR! */}
          <LeftSide />

          {/* RIGHT SIDE BAR(TRANSACTION TABLE)! */}
          <Transactions />

        </HomeLayout>
      </div>
    </>
  )
}
