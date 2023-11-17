import BarChartMiddle from './MiddleCharts/MIddleChartLine'
import '../../../styles/Homepage/Analytics/main.css';

export default function ReportsAndAnalytics ({}) {
  return (
    <>
      {/* OUTER PARENT CONTAINER! */}
      <div
        className='outer-parent'
      >
        {/* INNER PARENT CONTAINER MAIN! */}
        <div style={{ width: '100%' }}>
          {/* HEADING-OPTIONS! */}
          <div className='parent-upper-headings'>
            {/* HEADING! */}
            {/* <Headings Heading={'Reports & Analytics'} /> */}
            <h2 className='HEADING_STYLES'>Reports & Analytics</h2>

            {/* OPTIONS! */}
            <div className='parent-upper-headings-right'>
              {/* OPTION ITEM */}
              <div className={"BOX"}>
                {/* <div className={styles.currentFilter}> */}
                  {' '}
                  Monthly&nbsp;Analytics
                  {/* */}
                {/* </div> */}
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

        </div>
      </div>
    </>
  )
}
