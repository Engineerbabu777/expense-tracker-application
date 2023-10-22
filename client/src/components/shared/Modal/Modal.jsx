import { useContext } from 'react'
import { AllContext } from '../../../states/ContextProvider'
import './style.css'
import NewCategoryModalBody from '../../home/Categories/ModalBody'

export default function Modal ({}) {
  const { showModal, modalType } = useContext(AllContext)

  return (
    <>
      {showModal && (
        <>
          <div
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: '#272829',
                opacity: 0.7
              }}
            />

            <div
              style={{
                backgroundColor: '#151515',
                borderRadius: '10px',
                zIndex: '10',
                width: '400px'
              }}
            >
              {/* IF MODAL TYPE IS NEW CATEGORY !! */}
              {modalType === 'NEW_CATEGORY' && <NewCategoryModalBody />}
            </div>
          </div>
        </>
      )}
    </>
  )
}
