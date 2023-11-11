import '../../../styles/Homepage/Right/RightSideMain.css'
import { PiArrowLineUpRightBold } from 'react-icons/pi'
import { MdCalendarMonth } from 'react-icons/md'
import { FaRupeeSign as PakistaniRupees } from 'react-icons/fa6'

import '../../../styles/Homepage/Right/BoxStyles.css'
import '../../../styles/Homepage/Right/SharedStyles.css'
import getCompleteDate from '../../../utils/getCompleteDate'

export default function SavingBox ({ savings }) {
  return (
    <>
      <div className='saving-box boxStyles'>
        <div className='inside-color-box saving-inside-color-box' />

        {/* TOP(ICON + NAME + LINK ARROW) */}
        <div className='inside-box-top-portion'>
          <div className='image-name-container'>
            {/* IMAGE! */}
            <img src={'/savings.png'} className='image-styles' alt={'income'} />

            {/* NAME! */}
            <h2 style={{ fontSize: '1.30rem' }}>Savings</h2>
          </div>

          {/* LINK! */}
          <div className='link-circle-styles'>
            <PiArrowLineUpRightBold size={22} color={'white'} />
          </div>
        </div>

        {/* MIDDLE! */}
        <div className='middle-button-styles'>
          {/* ICON! */}
          <MdCalendarMonth size={22} />

          {/* MONTH NAME! */}
          <h3 style={{ fontSize: '0.90rem' }}>
            {getCompleteDate().month + ',' + getCompleteDate().year}
          </h3>
        </div>

        {/* BOTTOM */}
        <div className='inside-box-bottom-portion'>
          {/* AMOUNT! */}
          <p className='amount-box'>
            <p className='amount-styles'>{savings}</p>
            <PakistaniRupees size={18} color={'#838383'} />
          </p>

          {/* TODAY! */}
          <p
            style={{
              fontSize: '0.75rem',
              color: 'skyBlue',
              textAlign: 'center'
            }}
          >
            Today's Savings 10k+
          </p>
        </div>
      </div>
    </>
  )
}
