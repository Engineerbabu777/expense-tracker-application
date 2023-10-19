import styles from '../../../styles/Homepage/Transactions/Transactions.module.css'


export default function ReportsAndAnalytics ({}) {
  return (
    <>
       {/* OUTER PARENT CONTAINER! */}
      <div style={{color:"white",margin:'2% 2% 1% 1%',width:'100%' }}>
        {/* INNER PARENT CONTAINER MAIN! */}
        <div style={{width:'100%'}}>
          {/* HEADING-OPTIONS! */}
          <div style={{display:'flex'}}>
            {/* HEADING! */}
            <h2 style={{flex:1}}>Reports & Analytics</h2>


            {/* OPTIONS! */}
            <div style={{display:'flex',gap:5,paddingRight:'5%'}}>
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

          {/* CONTAINER ONE! */}

          {/* CONTAINER TWO! */}

          {/* CONTAINER THREE! */}
        </div>
      </div>
    </>
  )
}
