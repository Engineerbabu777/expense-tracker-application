import { BiEdit } from 'react-icons/bi'
import Headings from '../Right/Headings'
import { useContext, useEffect, useState } from 'react'
import { AllContext } from '../../../states/ContextProvider'
import Modal from '../../shared/Modal/Modal'
import { TiTick } from 'react-icons/ti'
import styles from '../../../styles/Homepage/Transactions/Transactions.module.css'
import Row from './Row'
import useCategories from '../../../hooks/useCategory'
import { getFullMonthName } from '../../../utils/budgetDateVerifier'
import Loading from '../../shared/Loading/Loading'
import useBudget from '../../../hooks/useBudget'
import { MdDeleteForever } from 'react-icons/md'

export default function BudgetMain ({}) {
  const {
    setShowModal,
    setModalType,
    budgetCategories,
    showModal,
    setIsBudgetAvailable,
    isBudgetAvailable
  } = useContext(AllContext)
  const { userCategories: getUserBudget, loadingData } = useCategories()
  const { getCurrentBudget, deleteCurrentBudget } = useBudget()

  const checkForActiveBudget = async () => {
    const response = await getCurrentBudget()
    if (response.success) {
      setIsBudgetAvailable(true)
    }
    // const response = await getUserBudget()
    // if (response?.budget?.length) {
    //   setIsBudgetAvailable(true)
    // }
    // console.log(response)
  }

  useEffect(() => {
    checkForActiveBudget()
  }, [])

  const current = () => {
    // CHECK FOR  CURRENT DATE!
    const date = new Date()
    const CURRENT_DATE = date.toDateString().slice(0, 15)
    const CURRENT_MONTH = CURRENT_DATE.toString().slice(4, 7)
    const CURRENT_YEAR = CURRENT_DATE.toString().slice(11, 15)

    const full = getFullMonthName(CURRENT_MONTH)

    return `${full}, ${CURRENT_YEAR}`
  }

  return (
    <>
      <Modal />
      {/* MAIN RIGHT SIDE! */}
      <div
        style={{
          margin: '2% 2% 0 1%',
          width: '98%',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'auto'
        }}
      >
        {/* PARENT CONTAINER */}

        <div>
          <div
            style={{
              fontSize: '.75rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div style={{ marginTop: '-2%', flex: 1 }}>
              <Headings Heading={'Budget Management'} />
            </div>

            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              {isBudgetAvailable && (
                <div
                  style={{
                    fontSize: '1rem',
                    display: 'flex',
                    cursor: 'pointer'
                  }}
                >
                  {/* ICON! */}

                  {/* TEXT! */}
                  <p
                    style={{
                      backgroundColor: '#3EC70A',
                      padding: '5px',
                      color: 'white',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      justifyContent:'space-around'

                    }}
                    
                  >
                    Budget Activated ({current()})
                    <TiTick size={20} color={'darkGreen'} />
                    <span style={{ color: 'white' }} onClick={() => {deleteCurrentBudget()}}>
                      <MdDeleteForever size={18} />
                    </span>
                  </p>
                </div>
              )}

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
                    setShowModal(true)
                    setModalType('NEW_BUDGET')
                  }}
                >
                  Create&nbsp;New&nbsp;Budget
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SHOW TABLE HERE */}
        {isBudgetAvailable && !loadingData && budgetCategories?.length > 0 ? (
          <div className={styles.childTwo}>
            <table className={styles.tableStyles}>
              <thead>
                <th className={styles.theadStyles}>Sr#</th>
                <th className={styles.theadStyles}>Name</th>
                <th className={styles.theadStyles}>Color Code</th>
                <th className={styles.theadStyles}>Monthly Limit</th>
                <th className={styles.theadStyles}>Currency</th>
                <th className={styles.theadStyles}>Actions</th>
              </thead>
              <tbody style={{}}>
                {budgetCategories?.map((category, i) => {
                  return (
                    <>
                      <Row category={category} i={i} />
                    </>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : loadingData ? (
          <Loading />
        ) : (
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
                No Categories to show&nbsp;
                <span
                  style={{
                    color: 'rgb(110, 56, 224)',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setShowModal(!showModal)
                    setModalType('NEW_CATEGORY')
                  }}
                >
                  &nbsp;click here
                </span>
                &nbsp; to add categories.
              </p>
            </div>
          </>
        )}
      </div>
    </>
  )
}
