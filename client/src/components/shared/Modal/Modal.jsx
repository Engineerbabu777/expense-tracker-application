import { useContext } from 'react'
import { AllContext } from '../../../states/ContextProvider'
import './style.css'
import NewCategoryModalBody from '../../home/Categories/ModalBody'
import ModalBodyForBudget from '../../home/management/ModalBody'

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
              {/* MODAL BODY FOR CATEGORIES! !! */}
              {['NEW_CATEGORY', 'EDIT_CATEGORY'].includes(modalType) && (
                <NewCategoryModalBody />
              )}

              {/* MODAL BODY FOR BUDGET! */}
              {['NEW_BUDGET', 'EDIT_BUDGET'].includes(modalType) && (
                <ModalBodyForBudget />
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}
