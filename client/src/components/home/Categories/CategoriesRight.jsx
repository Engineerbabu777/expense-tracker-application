import Headings from '../Right/Headings'
import { BiEdit } from 'react-icons/bi'
import styles from '../../../styles/Homepage/Transactions/Transactions.module.css'
import { useContext, useEffect, useState } from 'react'
import { AllContext } from '../../../states/ContextProvider'
import Modal from '../../shared/Modal/Modal'
import useCategories from '../../../hooks/useCategory'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

export default function CategoriesRight () {
  const { getCategories, loadingData, deleteCategories } = useCategories()
  const [categories, setCategories] = useState([])
  const { setShowModal, showModal, setModalType } = useContext(AllContext)

  const getData = async () => {
    const data = await getCategories()
    console.log('DATA: ', data)
    setCategories(data?.categories)
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
        <div className={styles.childTwo}>
          <table className={styles.tableStyles}>
            <thead>
              <th className={styles.theadStyles}>Sr#</th>
              <th className={styles.theadStyles}>Name</th>
              <th className={styles.theadStyles}>Color Code</th>
              <th className={styles.theadStyles}>Expense Limit</th>
              <th className={styles.theadStyles}>Currency</th>
              <th className={styles.theadStyles}>Actions</th>
            </thead>
            <tbody style={{}}>
              {categories.map((category, i) => {
                return (
                  <>
                    <tr key={i} style={i % 2 === 0 ? {} : {}}>
                      <td>{i}.</td>
                      <td>{category?.categoryName}</td>
                      <td>{category?.colorCode}</td>
                      <td>
                        {category?.categoryLimit
                          ? category?.categoryLimit
                          : 'infinity'}
                      </td>
                      <td>{category?.currency}</td>
                      <td>
                        <p
                          style={{
                            display: 'flex',
                            gap: '15px',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          <span style={{ color: '#6BCB77', cursor: 'pointer' }}>
                            <FaEdit size={18} />
                          </span>
                          <span
                            style={{ color: '#F15A59', cursor: 'pointer' }}
                            onClick={() => deleteCategories(category?._id)}
                          >
                            <MdDelete size={20} />
                          </span>
                        </p>
                      </td>
                    </tr>
                  </>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
