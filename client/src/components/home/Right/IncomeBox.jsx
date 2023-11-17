import { PiArrowLineUpRightBold, PiCurrencyInrBold } from 'react-icons/pi'
import { MdCalendarMonth } from 'react-icons/md'
import { FaDollarSign, FaLiraSign, FaRupeeSign as PakistaniRupees } from 'react-icons/fa6'

import '../../../styles/Homepage/Right/BoxStyles.css'
import '../../../styles/Homepage/Right/SharedStyles.css'
import getCompleteDate from '../../../utils/getCompleteDate'
import { AllContext } from '../../../states/ContextProvider'
import { useContext } from 'react'

export default function IncomeBox ({ isLoading, incomes }) {

  const {filterType} = useContext(AllContext);

  const returnIcon = ()  => {
    if(filterType === 'pkr') return PakistaniRupees;
    if(filterType === 'dollar') return FaDollarSign;
    if(filterType === 'lira') return FaLiraSign;
    if(filterType === 'inr') return PiCurrencyInrBold;
  }

  const Icon = returnIcon();

  return (
    <>
      <div className='income-box boxStyles'>
        <div className='income-inside-color-box inside-color-box' />

        {/* TOP(ICON + NAME + LINK ARROW) */}
        <div className='inside-box-top-portion'>
          <div className='image-name-container'>
            {/* IMAGE! */}
            <img src={'/income.png'} className='image-styles' alt={'income'} />

            {/* NAME! */}
            <h2 style={{ fontSize: '1.30rem' }}>Income</h2>
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
          <h3 style={{ fontSize: '0.90rem' }}>{getCompleteDate().month+","+ getCompleteDate().year}</h3>
        </div>

        {/* BOTTOM */}
        <div className='inside-box-bottom-portion'>
          {/* AMOUNT! */}
          <p className='amount-box'>
            <p className='amount-styles'>{incomes}</p>
            <Icon size={18} color={'#838383'} />
          </p>

          {/* TODAY! */}
          <p
            style={{
              fontSize: '0.75rem',
              color: '#00B85E',
              textAlign: 'center'
            }}
          >
            Today's Income 10k+
          </p>
        </div>
      </div>
    </>
  )
}
