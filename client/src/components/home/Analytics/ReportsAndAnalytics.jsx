// import { PieChart } from 'recharts'
import styles from '../../../styles/Homepage/Transactions/Transactions.module.css'
import PieChart from './components/PieChart/PiChart'
import BarChartMiddle from './MiddleCharts/MIddleChartLine'


export default function ReportsAndAnalytics ({}) {
  return (
    <>
      {/* OUTER PARENT CONTAINER! */}
      <div
        style={{
          color: 'white',
          margin: '2% 2% 1% 1%',
          width: '100%',
          height: '100%',
          overflow: 'auto'
        }}
      >
        {/* INNER PARENT CONTAINER MAIN! */}
        <div style={{ width: '100%' }}>
          {/* HEADING-OPTIONS! */}
          <div style={{ display: 'flex' }}>
            {/* HEADING! */}
            <h2 style={{ flex: 1 }}>Reports & Analytics</h2>

            {/* OPTIONS! */}
            <div style={{ display: 'flex', gap: 5, paddingRight: '5%' }}>
              {/* OPTION ITEM */}
              <div className={styles.filterContainer}>
                <div className={styles.currentFilter}>
                  {' '}
                  Monthly&nbsp;Analytics
                  {/* */}
                </div>
              </div>

              {/* OPTION ITEM */}
              <div className={styles.filterContainer}>
                <div className={styles.inActiveFilter}>
                  {' '}
                  Weekly&nbsp;Analytics
                  {/* */}
                </div>
              </div>

              {/* OPTION ITEM */}
              <div className={styles.filterContainer}>
                <div className={styles.inActiveFilter}>
                  {' '}
                  Last&nbsp;(15D)&nbsp;Analytics
                  {/* */}
                </div>
              </div>
            </div>
          </div>

          
          {/* CONTAINER TWO! */}
          <div
            style={{
              paddingRight: '2vw',
              display: 'flex',
              gap: 4,
              marginTop: '2%',
              flexDirection: 'column'
            }}
          >
            <p style={{ color: '#898989', fontWeight: '700' }}>
              Expenses/Income Bar Chart - Daily
            </p>

            <div style={{ flex: 1, minHeight: '300px' }}>
              <BarChartMiddle />
            </div>
          </div>

          {/* CONTAINER THREE! */}
          {/* <div
            style={{
              paddingRight: '2vw',
              display: 'flex',
              gap: 4,
              marginTop: '2%',
              flexDirection: 'column',
              marginBottom: '8%'
            }}
          >
            <p style={{ color: '#898989', fontWeight: '700' }}>
              Expenses Pie Chart - Monthly
            </p>

            <div
              style={{
                flex: 1,
                minHeight: '300px',
                // border: '1px solid yellow',
              }}
            >
              <PieChart />

            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}
