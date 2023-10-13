import '../../../styles/Homepage/Right/RightSideMain.css'
import IncomeBox from './IncomeBox'
import ExpenseBox from './ExpensesBox'
import SavingBox from './SavingsBox'
import Headings from './Headings'
import Table from './RecentTrans'

export default function RightSide ({}) {
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
            <IncomeBox />

            {/* EXPENSES BOX! */}
            <ExpenseBox />

            {/* SAVING BOX! */}
            <SavingBox />
          </div>

          {/* THIS WEEK EXPENSES! */}
        </div>

        {/* RECENT TRANSACTIONS! */}
        <div className='recent-transactions-section'>
          {/* RECENT HEADING */}
          <Headings Heading={'Recent Transactions'} />

          {/* TABLE! */}
          <Table />
        </div>
      </section>
    </>
  )
}
