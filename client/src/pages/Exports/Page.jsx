import React, { useContext, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/shared/Header/Header'
import HomeLayout from '../../components/home/Layout'
import LeftSide from '../../components/home/Left/Left'
import { BiSolidFileExport } from 'react-icons/bi'
import { ExportAsPdf } from 'react-export-table'
import { AllContext } from '../../states/ContextProvider'

export default function ExportPage () {
  const [cookies] = useCookies([])
  const navigate = useNavigate()
  const { allTransactions } = useContext(AllContext)

  const getData = t => {
    const date = new Date(t?.createdAt).getDate()
    const month = new Date(t?.createdAt).getMonth() + 1
    const year = new Date(t?.createdAt).getFullYear()
    return `${date}-${month}-${year}`
  }
  const incomes = allTransactions.filter(transaction => transaction?.source)
  const expenses = allTransactions.filter(transaction => transaction?.description)

  const incomeData = [
    ...incomes.map(income => ({
      source: income?.source,
      income: income?.money,
      currency: income?.currency,
      type: 'Income',
      date: getData(income)
    }))
  ]

  const expenseData = [
    ...expenses.map(expense => ({
      description: expense?.description,
      income: expense?.money,
      currency: expense?.currency,
      type: 'Expense',
      date: getData(expense)
    }))
  ]

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

          {/* RIGHT SIDE BAR(TRANSACTION TABLE)! */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              flexDirection: 'column',
              gap: '30px'
            }}
          >
            <ExportAsPdf
              data={incomeData}
              headers={['Source', 'Amount', 'Currency', 'Type', 'Date']}
              headerStyles={{ fillColor: '#6ea' }}
              title='Monthly Income Record (November,2023)'
            >
              <button
                style={{
                  width: '330px',
                  background: '#63e',
                  color: 'white',
                  borderRadius: '30px',
                  outline: 'none',
                  border: '1px solid #272829',
                  padding: '15px',
                  fontSize: '1.23rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  cursor: 'pointer'
                }}
              >
                <BiSolidFileExport size={24} />
                Export Incomes Data
              </button>
            </ExportAsPdf>

            <ExportAsPdf
              data={expenseData}
              headers={['Description', 'Amount', 'Currency', 'Type', 'Date']}
              headerStyles={{ fillColor: '#272829' }}
              title='Monthly Expenses Record (November,2023)'
            >
              <button
                style={{
                  width: '330px',
                  background: '#63e',
                  color: 'white',
                  borderRadius: '30px',
                  outline: 'none',
                  border: '1px solid #272829',
                  padding: '15px',
                  fontSize: '1.23rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  gap: '10px'
                }}
              >
                <BiSolidFileExport size={24} />
                Export Expenses Data
              </button>
            </ExportAsPdf>
          </div>
        </HomeLayout>
      </div>
    </>
  )
}
