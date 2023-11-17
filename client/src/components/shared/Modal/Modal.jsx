import { useContext } from 'react'
import { AllContext } from '../../../states/ContextProvider'
import NewCategoryModalBody from '../../home/Categories/ModalBody'
import ModalBodyForBudget from '../../home/management/ModalBody'
import ChooseModalBody from '../../home/Transactions/ModalBodys/ChooseModalBody'
import IncomeModalBody from '../../home/Transactions/ModalBodys/IncomeModalBody'
import ExpenseModalBody from '../../home/Transactions/ModalBodys/ExpenseModelBody'
import SearchModalBody from '../../search/SearchModalBody'
import '../../../styles/shared/Modal.css'
import SmallScreenMenu from '../Menu/Menu'

export default function Modal ({}) {
  const { showModal, modalType } = useContext(AllContext)

  return (
    <>
      {showModal && (
        <>
          <div
            //  className="outer-area"
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 100000
            }}
          >
            <div
              // className='outer-area-opacity'
              style={{
                position: 'absolute',
                inset: 0,
                background: '#272829',
                opacity: 0.6
              }}
            />

            <div
              style={{
                width: modalType === 'SEARCH' ? '80%' : '400px',
                backgroundColor: '#151515',
                borderRadius: '10px',
                zIndex: 1000000
              }}
              // className='modal-box'
            >
              {/* MODAL BODY FOR CATEGORIES! !! */}
              {['NEW_CATEGORY', 'EDIT_CATEGORY'].includes(modalType) && (
                <NewCategoryModalBody />
              )}

              {/* MODAL BODY FOR BUDGET! */}
              {['NEW_BUDGET', 'EDIT_BUDGET'].includes(modalType) && (
                <ModalBodyForBudget />
              )}

              {['CHOOSE_OPTION'].includes(modalType) && <ChooseModalBody />}

              {['NEW_INCOME', 'INCOME'].includes(modalType) && (
                <IncomeModalBody />
              )}

              {['NEW_EXPENSE', 'EXPENSE'].includes(modalType) && (
                <ExpenseModalBody />
              )}

              {modalType === 'SEARCH' && <SearchModalBody />}

              {modalType === 'MENU' && <SmallScreenMenu />}
            </div>
          </div>
        </>
      )}
    </>
  )
}
