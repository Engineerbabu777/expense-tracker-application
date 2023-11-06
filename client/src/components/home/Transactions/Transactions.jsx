import { useCallback, useContext, useEffect, useState } from 'react'
import Headings from '../Right/Headings'
import { AllContext } from '../../../states/ContextProvider'
import styles from '../../../styles/Homepage/Transactions/Transactions.module.css'
import { BiEdit } from 'react-icons/bi'
import Modal from '../../shared/Modal/Modal'
import useCategories from '../../../hooks/useCategory'
import useTrans from '../../../hooks/useTrans'
import Loading from '../../shared/Loading/Loading'
import Row from './ModalBodys/components/Row'

export default function Transactions () {
  const [showMenu, setShowMenu] = useState(false)
  const [filterType, setFilterType] = useState('All')
  const { setShowModal, setModalType, allTransactions,setEditTrans } = useContext(AllContext)

  const data = useCategories()
  const { loadingTrans } = useTrans()
  console.log('TRANSACTIONS STATUS: ', loadingTrans)

  const menu = ['All', 'Income', 'Expense']

  const changeMenu = type => {
    setFilterType(type) // CHANGING THE FILTER TYPE!
    setShowMenu(!showMenu) // CLOSING THE MENU!
  }

  return (
    <>
      <Modal />
      {/* PARENT CONTAINER OF ALL! */}
      <div className={styles.parentContainerOfAll}>
        {/* CHILD CONTAINER ONE OF PARENT CONTAINER FOR HEADING */}
        <div className={styles.childOne}>
          {' '}
          {/* WILL SET HEADING MORE LATER!*/}
          <div className={styles.headingBox}>
            <Headings Heading={'Transactions Details'} />
          </div>
          {/* FILTER OPTIONS */}
          <div className={styles.filterParents}>
            {/* FILTER BY MONTH AS WELL!! (ALSO INCLUDES ALL TO SHOW ALL DATA) */}
            <div
              style={{
                fontSize: '1rem',
                display: 'flex',
                cursor: 'pointer'
              }}
            >
              {/* ICON! */}
              <div
                style={{
                  backgroundColor: 'rgb(110, 56, 224)',
                  padding: '4px'
                }}
              >
                <BiEdit size={20} color={'white'} />
              </div>
              {/* TEXT! */}
              <p
                style={{
                  backgroundColor: 'rgba(110, 56, 224,0.8)',
                  padding: '5px',
                  color: 'white',
                  fontWeight: '600'
                }}
                onClick={() => {
                  setEditTrans(null)
                  setShowModal(true)
                  setModalType('CHOOSE_OPTION')
                }}
              >
                Create&nbsp;Transaction
              </p>
            </div>
            {/* FILTER BY EVERYTHING! */}
            <div className={styles.filterContainer}>
              <p className={styles.filterLabelText}>FILTER&nbsp;BY:</p>
              <div
                className={styles.currentFilter}
                onClick={() => setShowMenu(!showMenu)}
              >
                {filterType}
                {showMenu && (
                  <div className={styles.filterOptionsBox}>
                    {menu.map((item, ind) => (
                      <p
                        className={styles.filterOptionsItem}
                        onClick={() => changeMenu(item)}
                        style={{
                          color: filterType === item && 'white',
                          background:
                            filterType === item &&
                            'linear-gradient(to right, #6E38E0, #FF5F36)'
                        }}
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* CHILD CONTAINER TWO OF PARENT CONTAINER FOR TABLE */}
        {loadingTrans ? (
          <>
            <Loading />
          </>
        ) : !loadingTrans && allTransactions.length === 0 ? (
          <>
            <div
              style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <p style={{}}>
                No Transactions to show&nbsp;
                <span
                  style={{
                    color: 'rgb(110, 56, 224)',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setShowModal(true)
                    setModalType('CHOOSE_OPTION')
                  }}
                >
                  &nbsp;click here
                </span>
                &nbsp; to add categories.
              </p>
            </div>
          </>
        ) : (
          <>
            <div className={styles.childTwo}>
              <table className={styles.tableStyles}>
                <thead>
                  <th className={styles.theadStyles}>Description</th>
                  <th className={styles.theadStyles}>Amount</th>
                  <th className={styles.theadStyles}>Category</th>
                  <th className={styles.theadStyles}>Type</th>
                  <th className={styles.theadStyles}>Date</th>
                  <th className={styles.theadStyles}>Actions</th>
                </thead>
                <tbody style={{}}>
                  {allTransactions.length > 0 &&
                    allTransactions
                      .filter((trans, i) => {
                        if (filterType === 'Income') {
                          console.log('INCOME: ', trans)
                          return trans?.source
                            ? trans
                            : null
                        }
                        if (filterType === 'Expense') {
                          console.log('EXPENSE: ', trans)
                          return trans?.description
                            ? trans
                            : null
                        }
                        return trans
                      })
                      .map((t, i) => (
                        <>
                          <Row t={t} i={i} />
                        </>
                      ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  )
}
