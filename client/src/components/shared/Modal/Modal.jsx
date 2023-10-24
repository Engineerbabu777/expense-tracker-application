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
                opacity: 0.3
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
              {['NEW_CATEGORY','EDIT_CATEGORY'].includes(modalType) && (
                <NewCategoryModalBody />
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}
