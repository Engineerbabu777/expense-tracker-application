import { useContext, useState } from 'react'
import styles from '../../styles/Homepage/Transactions/Transactions.module.css'
import { AllContext } from '../../states/ContextProvider'
import { FaWindowClose } from 'react-icons/fa'
import { TbMoodEmptyFilled } from 'react-icons/tb'
import useTrans from '../../hooks/useTrans'
import toast from 'react-hot-toast'
import Row from '../home/Transactions/ModalBodys/components/Row'

export default function SearchModalBody ({}) {
  const { setShowModal } = useContext(AllContext)
  const [searchText, setSearchText] = useState('')
  const { searchTrans, results } = useTrans()

  console.log({ results })
  console.log(1)

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
          height: '80vh',
          overflow: 'auto'
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
            onClick={async () => {
              await searchTrans(searchText)
            }}
          >
            Search
          </button>
        </div>

        <div
          style={{
            width: '100%',
            overflow: 'auto'
          }}
        >
          {/* TABLE! */}
          {results.data.length > 0 && (
            <table className={styles.tableStyles}>
              <thead>
                <th className={styles.theadStyles}>Description</th>
                <th className={styles.theadStyles}>Amount</th>
                <th className={styles.theadStyles}>Category</th>
                <th className={styles.theadStyles}>Type</th>
                <th className={styles.theadStyles}>Date</th>
              </thead>
              <tbody style={{}}>
                {results.data.map((item, index) => (
                  <>
                    <Row t={item} i={index} show={false} />
                  </>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/*  IF NOTHING TO SHOW! */}
        {results.data.length === 0 && (
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
            {/* <p style={{ display: 'flex', alignItems: 'center', gap: '5px' }}> */}
            <TbMoodEmptyFilled />
            {/* </p> */}
          </div>
        )}
      </section>
    </>
  )
}
