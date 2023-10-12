import '../../../styles/Homepage/Right/RightSideMain.css'

export default function RightSide ({}) {
  return (
    <>
      {/* MAIN CONTAINER! */}
      <section className='main-section-container'>
        {/* OVERVIEW! */}
        <div className='overview-section'>
          <h1 className='overview-text'>Overview</h1>
          <div className='three-boxes-container'>
            {/* INCOME BOX! */}
            <div className='income-box'>
              <div className='income-box-inside-color' />
            </div>

            {/* EXPENSES BOX! */}
            <div className='expenses-box'>
              <div className='expense-box-inside-color' />
            </div>

            {/* SAVING BOX! */}
            <div className='saving-box'>
              <div className='saving-box-inside-color' />
            </div>

            {/* THIS WEEK EXPENSES! */}
            <div className='current-week-box'>
              <div className='current-week-box-inside-color' />
            </div>
          </div>
        </div>

        {/* RECENT TRANSACTIONS! */}
        <div className='recent-transactions-section'></div>
      </section>
    </>
  )
}
