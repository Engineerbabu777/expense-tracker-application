import { BiEdit } from 'react-icons/bi'
import Headings from '../Right/Headings'
import { useContext } from 'react'
import { AllContext } from '../../../states/ContextProvider'
import Modal from '../../shared/Modal/Modal'

export default function BudgetMain ({}) {
  const { setShowModal, setModalType } = useContext(AllContext)

  return (
    <>
      <Modal />
      {/* MAIN RIGHT SIDE! */}
      <div
        style={{
          margin: '2% 2% 0 1%',
          width: '98%',
          height: '100%',
          overflow: 'auto'
        }}
      >
        {/* PARENT CONTAINER */}

        <div style={{}}>
          <div
            style={{
              fontSize: '.75rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div style={{ marginTop: '-2%', flex: 1 }}>
              <Headings Heading={'Budget Management'} />
            </div>

            <div style={{}}>
              <div
                style={{
                  fontSize: '1rem',
                  display: 'flex',
                  cursor: 'pointer'
                }}
              >
                {/* ICON! */}
                <div
                  style={{
                    backgroundColor: 'rgb(110, 56, 224)',
                    padding: '4px'
                  }}
                >
                  <BiEdit size={20} color={'white'} />
                </div>
                {/* TEXT! */}
                <p
                  style={{
                    backgroundColor: 'rgba(110, 56, 224,0.8)',
                    padding: '5px',
                    color: 'white',
                    fontWeight: '600'
                  }}
                  onClick={() => {
                    setShowModal(true)
                    setModalType('NEW_BUDGET')
                  }}
                >
                  Create&nbsp;New&nbsp;Budget
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
