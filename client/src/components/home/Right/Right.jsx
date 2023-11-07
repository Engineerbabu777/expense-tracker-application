import '../../../styles/Homepage/Right/RightSideMain.css'
import IncomeBox from './IncomeBox'
import ExpenseBox from './ExpensesBox'
import SavingBox from './SavingsBox'
import Headings from './Headings'
import Table from './RecentTrans'
import { useContext, useEffect } from 'react'
import { AllContext } from '../../../states/ContextProvider'

export default function RightSide ({}) {
  const { dashboardData } = useContext(AllContext)

  return (
    <>
      {/* MAIN CONTAINER! */}
      <section className='main-section-container'>
        {/* OVERVIEW SECTION! */}
        <div className='overview-section'>
          {/* HEADING TEXT FOR SECTIONS */}
          <Headings Heading={'Overview'} />

          {/* BOXES CONTAINER! */}
          <div className='three-boxes-container'>
            {/* INCOME BOX! */}
            <IncomeBox
              isLoading={dashboardData.fetchedAllData}
              incomes={dashboardData.totalIncomes}
            />

            {/* EXPENSES BOX! */}
            <ExpenseBox
              isLoading={dashboardData.fetchedAllData}
              expenses={dashboardData.totalExpenses}
            />

            {/* SAVING BOX! */}
            <SavingBox
              isLoading={dashboardData.fetchedAllData}
              savings={dashboardData.savingAlongIncomeExpenses}
            />
          </div>

          {/* THIS WEEK EXPENSES! */}
        </div>

        {/* RECENT TRANSACTIONS! */}
        <div className='recent-transactions-section'>
          {/* RECENT HEADING */}
          <Headings Heading={'Recent Transactions'} />

          {/* TABLE! */}
          <Table data={dashboardData.lastFewTransactions} />
        </div>
      </section>
    </>
  )
}
