import Headings from '../Right/Headings'
import { BiEdit } from 'react-icons/bi'
import styles from '../../../styles/Homepage/Transactions/Transactions.module.css'
import { useContext } from 'react'
import { AllContext } from '../../../states/ContextProvider'
import Modal from '../../shared/Modal/Modal'

export default function CategoriesRight () {
  

    const {setShowModal, showModal,setModalType} = useContext(AllContext);
    
    const generateRows = () => {
    const rows = []
    for (let i = 1; i <= 5; i++) {
      rows.push(
        <tr key={i} style={i % 2 === 0 ? {} : {}}>
          <td>{i}.</td>
          <td>Bills</td>
          <td>#678971</td>
          <td>45,000</td>
          <td>(E-D)</td>
        </tr>
      )
    }
    return rows
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
                  cursor: 'pointer',
                  
                }}
              >
                {/* ICON! */}
                <div style={{ backgroundColor: 'rgb(110, 56, 224)', padding: '4px' }}>
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

                  onClick={() => {setShowModal(!showModal);setModalType('NEW_CATEGORY')}}
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
              <th className={styles.theadStyles}>Actions</th>
            </thead>
            <tbody style={{}}>{generateRows()}</tbody>
          </table>
        </div>
      </div>
    </>
  )
}
