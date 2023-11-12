import '../../../styles/Homepage/Header/main.css'
import { FaGripfire } from 'react-icons/fa'
import { BsSearch } from 'react-icons/bs'
import { FiSettings } from 'react-icons/fi'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { useContext } from 'react'
import { AllContext } from '../../../states/ContextProvider'
import Modal from '../Modal/Modal'
export default function Header ({}) {
  const { setShowModal, setModalType } = useContext(AllContext)

  return (
    <>
      <Modal />
      <header className='main-header-tag'>
        {/* LOGO! */}
        <section className='logo-box'>
          {/* ICON */}
          <FaGripfire style={{ color: '#FF5f36', fontSize: 32 }} />
          {/* HIDDEN FROM (< 675px) */}
          <h1>ExpendiGenius</h1>
        </section>

        <div className='right-side-container-header'>
          {/* SEARCH INPUT! */}
          <div className='search-input-parent'>
            {/* ICON! */}
            <BsSearch style={{ color: '#898989' }} />
            {/* INPUT! */}
            <input
              onClick={() => {
                setShowModal(true)
                setModalType('SEARCH')
              }}
              type={'text'}
              className='search-input'
              placeholder='Search for recent transactions, expenses, incomes'
            />
          </div>

          {/* LAST ICONS! */}
          <div className='last-icons-parent'>
            {/* HIDDEN FROM (< 675px) */}
            {/* ICON ONE! */}
            <div className='each-icons-box'>
              <FiSettings style={{ fontSize: 20, color: '#898989' }} />
            </div>
            {/* ICON-2 */}
            <div className='each-icons-box'>
              {/* DOT */}
              <div
                style={{
                  backgroundColor: 'green',
                  height: 8,
                  width: 8,
                  position: 'absolute',
                  borderRadius: 30,
                  right: 6,
                  top: 6
                }}
              />
              <IoIosNotificationsOutline
                style={{ fontSize: 20, color: '#898989' }}
              />
            </div>
            {/* ICON_3 */}
            <div className='each-icons-box'>
              <img
                src={
                  'http://www.clker.com/cliparts/P/n/9/v/6/W/boy-with-hat-cartoon-th.png'
                }
                style={{ width: '75%', height: '75%' }}
                alt={'header-img'}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
