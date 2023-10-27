import Headings from '../Right/Headings'
import { BiEdit } from 'react-icons/bi'
import styles from '../../../styles/Homepage/Transactions/Transactions.module.css'
import { useContext, useEffect } from 'react'
import { AllContext } from '../../../states/ContextProvider'
import Modal from '../../shared/Modal/Modal'
import useCategories from '../../../hooks/useCategory'
import Row from './Row'
import Loading from '../../shared/Loading/Loading'

export default function CategoriesRight () {
  const { getCategories, loadingData } = useCategories()
  const {
    setShowModal,
    showModal,
    setModalType,
    allCategories,
    setEditCategory
  } = useContext(AllContext)

  const getData = async () => {
    await getCategories()
  }

  useEffect(() => {
    getData()
  }, [])

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
            <Headings Heading={'Expense Categories'} />
          </div>
          {/* FILTER OPTIONS */}
          <div className={styles.filterParents}>
            {/* FILTER BY MONTH AS WELL!! (ALSO INCLUDES ALL TO SHOW ALL DATA) */}
            <div className={styles.filterContainer}>
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
                    setEditCategory(null)
                    setShowModal(!showModal)
                    setModalType('NEW_CATEGORY')
                  }}
                >
                  Add&nbsp;New
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CHILD CONTAINER TWO OF PARENT CONTAINER FOR TABLE */}
        {!loadingData && allCategories?.length > 0 ? (
          <div className={styles.childTwo}>
            <table className={styles.tableStyles}>
              <thead>
                <th className={styles.theadStyles}>Sr#</th>
                <th className={styles.theadStyles}>Name</th>
                <th className={styles.theadStyles}>Color Code</th>
                <th className={styles.theadStyles}>Actions</th>
              </thead>
              <tbody style={{}}>
                {allCategories.map((category, i) => {
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
