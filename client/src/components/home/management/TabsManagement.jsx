import { Link, useLocation } from 'react-router-dom'

export default function TabsManagement ({}) {
  const location = useLocation()

  const index = location?.pathname?.split('/')[2]

  const styles = {
    padding: '5px',
    borderBottom: '2px solid rgb(110, 56, 224)',
    flex: 1,
    textAlign: 'center',
    color: '#65e',
    fontWeight: '700',
    letterSpacing: '1.5px',
    fontSize: '1.05rem',
    textDecoration: 'none'
  }

  const unActive = {
    padding: '5px',
    borderBottom: '2px solid black',
    flex: 1,
    textAlign: 'center',
    color: '#65e',
    fontWeight: '500',
    letterSpacing: '1.5px',
    fontSize: '1.05rem',
    textDecoration: 'none'
  }
  return (
    <>
      <div style={{ marginTop: '2%' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginRight: '1%',
            gap: '1%'
          }}
        >
          <Link
            style={index === 'income' ? styles : unActive}
            to={'/management/income'}
          >
            Income Transaction
          </Link>

          <Link
            style={index === 'expense' ? styles : unActive}
            to={'/management/expense'}
          >
            Expense Transaction
          </Link>

          <Link
            style={index === 'budget' ? styles : unActive}
            to={'/management/budget'}
          >
            Manage Budget
          </Link>
        </div>
      </div>
    </>
  )
}
