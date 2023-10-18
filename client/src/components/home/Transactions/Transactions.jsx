import { useState } from 'react'
import Headings from '../Right/Headings'

import styles from '../../../styles/Homepage/Transactions/Transactions.module.css'

export default function Transactions () {
  const [showMenu, setShowMenu] = useState(false)
  const [filterType, setFilterType] = useState('All')

  const menu = ['All', 'Income', 'Expense', 'Oldest', 'Latest']

  const changeMenu = type => {
    setFilterType(type) // CHANGING THE FILTER TYPE!
    setShowMenu(!showMenu) // CLOSING THE MENU!
  }

  const generateRows = () => {
    const rows = []
    for (let i = 1; i <= 5; i++) {
      const type = i % 2 === 0 ? 'Income' : 'Expense'
      const category = type === 'Income' ? 'Salary' : 'Groceries'
      rows.push(
        <tr key={i} style={i % 2 === 0 ? {} : {}}>
          <td >Description {i} </td>
          <td style={{}}>${i + ((3 * 90) / i) * i * (i * 90 + i)}.00</td>
          <td style={{}}>{category}</td>

          <td style={{}}>{type}</td>
          <td style={{}}>
            2023-{i + 2}-1{i + 3}
          </td>
        </tr>
      )
    }
    return rows
  }

  return (
    <>
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
          <div className={styles.filterContainer}>
            <p className={styles.filterLabelText}>SHOW&nbsp;MONTH:</p>
            <div className={styles.currentFilter}>
              {' '}
              October,&nbsp;2023
              {/* */}
            </div>
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
        <div className={styles.childTwo}>
          <table className={styles.tableStyles}>
            <thead >
              <th className={styles.theadStyles}>Description</th>
              <th className={styles.theadStyles}>Amount</th>
              <th className={styles.theadStyles}>Category</th>
              <th className={styles.theadStyles}>Type</th>
              <th className={styles.theadStyles}>Date</th>
            </thead>
            <tbody style={{}}>{generateRows()}</tbody>
          </table>
        </div>
      </div>
    </>
  )
}
