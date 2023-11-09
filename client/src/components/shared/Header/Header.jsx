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

          {/* NAME! */}
          {/* HIDDEN FROM (< 675px) */}

          <h1>ExpendiGenius</h1>
        </section>

        <div className='right-side-container-header'>
          {/* SEARCH INPUT! */}
          <div
            style={{
              position: 'relative',
              backgroundColor: '#272829',
              borderRadius: '15px',
              padding: '3px 15px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              height: '25px'
            }}
          >
            {/* ICON! */}
            <BsSearch style={{ color: '#898989' }} />
            {/* INPUT! */}
            <input
              onClick={() => {
                setShowModal(true)
                setModalType('SEARCH')
              }}
              type={'text'}
              style={{
                background: 'inherit',
                color: 'white',
                outline: 'none',
                border: 'none',
                width: '100%'
              }}
              placeholder='Search for recent transactions, expenses, incomes'
            />
          </div>

          {/* LAST ICONS! */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* HIDDEN FROM (< 675px) */}
            <div
              style={{
                backgroundColor: '#3C4048',
                height: 30,
                width: 30,
                borderRadius: 30,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FiSettings style={{ fontSize: 20, color: '#898989' }} />
            </div>

            <div
              style={{
                backgroundColor: '#3C4048',
                height: 30,
                width: 30,
                borderRadius: 30,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
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

            <div
              style={{
                backgroundColor: '#3C4048',
                height: 30,
                width: 30,
                borderRadius: 30,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
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
