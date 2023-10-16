import { useState } from 'react'
import Headings from '../Right/Headings'

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
    for (let i = 1; i <= 7; i++) {
      const type = i % 2 === 0 ? 'Income' : 'Expense'
      const category = type === 'Income' ? 'Salary' : 'Groceries'
      rows.push(
        <tr key={i} style={i % 2 === 0 ? {} : {}}>
          <td style={{}}>Description {i}</td>
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
      <div
        style={{
          display: 'flex',
          height: '100vh',
          flexDirection: 'column',
          paddingRight: '2%',
          marginLeft: '1%'
        }}
      >
        {/* CHILD CONTAINER ONE OF PARENT CONTAINER FOR HEADING */}
        <div
          style={{
            height: 'fit-content',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: '2%'
          }}
        >
          {' '}
          {/* WILL SET HEADING MORE LATER!*/}
          <div style={{ marginTop: '-2%', width: 'fit-content', flex: 1 }}>
            <Headings Heading={'Transactions Details'} />
          </div>
          {/* FILTER OPTIONS */}
          <div
            style={{
              display: 'flex',
              gap: '15px',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '3%'
            }}
          >
            <p style={{ fontWeight: 'semibold', fontSize: '14px' }}>
              FILTER BY:
            </p>
            <div
              style={{
                backgroundColor: 'white',
                color: '#272829',
                padding: '4px 16px',
                borderRadius: 30,
                fontSize: '15px',
                position: 'relative',
                cursor: 'pointer'
              }}
              onClick={() => setShowMenu(!showMenu)}
            >
              {filterType}
              {showMenu && (
                <div
                  style={{
                    position: 'absolute',
                    width: '140px',
                    background: 'white',
                    right: '0',
                    top: '34px',
                    color: '#898989',
                    borderRadius: 15,
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '5px 15px',
                    flexDirection: 'column',
                    alignItems: 'center',
                    overflow: 'hidden',
                    textAlign: 'center',
                    opacity: 0.95,
                    boxShadow: '1px 1px 4px white'
                  }}
                >
                  {menu.map((item, ind) => (
                    <p
                      onClick={() => changeMenu(item)}
                      style={{
                        color: filterType === item && 'white',
                        width: '100%',
                        textAlign: 'center',
                        padding: '10px',
                        borderRadius: 5,

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

        {/* CHILD CONTAINER TWO OF PARENT CONTAINER FOR TABLE */}
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            marginTop: '2%',
            marginBottom: '8%'
          }}
        >
          <table
            style={{
              backgroundColor: 'rgba(89, 89, 89, 0.17)',
              width: '100%',
              padding: '1%',
              borderRadius: '10px'
            }}
          >
            <thead style={{}}>
              <th>Description</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Type</th>
              <th>Date</th>
            </thead>
            <tbody style={{}}>{generateRows()}</tbody>
          </table>
        </div>
      </div>
    </>
  )
}
