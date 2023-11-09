import { useContext, useState } from 'react'
import styles from '../../styles/Homepage/Transactions/Transactions.module.css'
import { AllContext } from '../../states/ContextProvider'
import { FaWindowClose } from 'react-icons/fa'
import { TbMoodEmptyFilled } from 'react-icons/tb'
import useTrans from '../../hooks/useTrans'
import toast from 'react-hot-toast'

export default function SearchModalBody ({}) {
  const { setShowModal } = useContext(AllContext)
  const [searchText, setSearchText] = useState('')
  const { searchTrans } = useTrans()

  return (
    <>
      {/* HEADER! */}
      <header
        style={{
          fontSize: '1.2rem',
          fontWeight: '700',
          color: 'white',
          textAlign: 'center',
          padding: '15px',
          borderBottom: '1px solid #272829',
          position: 'relative'
        }}
      >
        <p
          style={{
            position: 'absolute',
            right: '15px',
            top: '15px',
            cursor: 'pointer'
          }}
          onClick={() => setShowModal(false)}
        >
          <FaWindowClose size={20} color={'gray'} />
        </p>
        Search Your Transactions
      </header>

      {/* MAIN BODY */}
      <section
        style={{
          marginTop: '10px',
          display: 'flex',
          margin: '0 auto',
          flexDirection: 'column',
          width: '95%',
          alignItems: 'center',
          padding: '5px',
          height: '80vh'
        }}
      >
        {/* SEARCH INPUT! */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            gap: '5px',
            marginBottom: '10px'
          }}
        >
          <input
            placeholder='Search using months, details, amount, year'
            style={{
              width: '100%',
              padding: '8px',
              backgroundColor: '#272829',
              border: '1px solid #63e',
              borderRadius: '5px',
              outline: 'none',
              color: 'white',
              flexGrow: 1
            }}
            onChange={e => setSearchText(e.target.value)}
            value={searchText}
          />
          <button
            style={{
              backgroundColor: '#FF5F36',
              borderRadius: '5px',
              outline: 'none',
              color: 'white',
              padding: '8px',
              cursor: 'pointer',
              border: '1px solid #272829'
            }}
            onClick={async() => {
              await searchTrans(searchText)
            }}
          >
            Search
          </button>
        </div>

        <div
          style={{
            width: '100%'
            // flexGrow:1,
            // overflow:'auto'
          }}
        >
          {/* TABLE! */}
          {/* <table className={styles.tableStyles}>
            <thead>
              <th className={styles.theadStyles}>Description</th>
              <th className={styles.theadStyles}>Amount</th>
              <th className={styles.theadStyles}>Category</th>
              <th className={styles.theadStyles}>Type</th>
              <th className={styles.theadStyles}>Date</th>
            </thead>
            <tbody style={{}}>
              <tr>
                <td>Nothing to show</td>
                <td>$500</td>
                <td>-</td>
                <td>Income</td>
                <td>12-11-2023</td>
              </tr>

              <tr>
                <td>What can I show?</td>
                <td>$750</td>
                <td>Bills</td>
                <td>Expense</td>
                <td>27-11-2023</td>
              </tr>

              <tr>
                <td>Hey, how are u?</td>
                <td>$330</td>
                <td>Entertainment</td>
                <td>Expense</td>
                <td>23-11-2023</td>
              </tr>

              <tr>
                <td>Nothing to show</td>
                <td>$500</td>
                <td>-</td>
                <td>Income</td>
                <td>12-11-2023</td>
              </tr>

              <tr>
                <td>What can I show?</td>
                <td>$750</td>
                <td>Bills</td>
                <td>Expense</td>
                <td>27-11-2023</td>
              </tr>

              <tr>
                <td>Hey, how are u?</td>
                <td>$330</td>
                <td>Entertainment</td>
                <td>Expense</td>
                <td>23-11-2023</td>
              </tr>

              <tr>
                <td>Nothing to show</td>
                <td>$500</td>
                <td>-</td>
                <td>Income</td>
                <td>12-11-2023</td>
              </tr>

              <tr>
                <td>What can I show?</td>
                <td>$750</td>
                <td>Bills</td>
                <td>Expense</td>
                <td>27-11-2023</td>
              </tr>

              <tr>
                <td>Hey, how are u?</td>
                <td>$330</td>
                <td>Entertainment</td>
                <td>Expense</td>
                <td>23-11-2023</td>
              </tr>

              <tr>
                <td>Nothing to show</td>
                <td>$500</td>
                <td>-</td>
                <td>Income</td>
                <td>12-11-2023</td>
              </tr>

              <tr>
                <td>What can I show?</td>
                <td>$750</td>
                <td>Bills</td>
                <td>Expense</td>
                <td>27-11-2023</td>
              </tr>

              <tr>
                <td>Hey, how are u?</td>
                <td>$330</td>
                <td>Entertainment</td>
                <td>Expense</td>
                <td>23-11-2024</td>
              </tr>
            </tbody>
          </table> */}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            fontSize: '2.2rem',
            fontWeight: 'bold',
            color: '#333'
          }}
        >
          <p style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            Nothing to show
            <TbMoodEmptyFilled />
          </p>
        </div>
      </section>
    </>
  )
}
