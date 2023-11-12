import { useContext } from 'react'
import { AllContext } from '../../../states/ContextProvider'
import NewCategoryModalBody from '../../home/Categories/ModalBody'
import ModalBodyForBudget from '../../home/management/ModalBody'
import ChooseModalBody from '../../home/Transactions/ModalBodys/ChooseModalBody'
import IncomeModalBody from '../../home/Transactions/ModalBodys/IncomeModalBody'
import ExpenseModalBody from '../../home/Transactions/ModalBodys/ExpenseModelBody'
import SearchModalBody from '../../search/SearchModalBody'
import '../../../styles/shared/Modal.css';


export default function Modal ({}) {
  const { showModal, modalType } = useContext(AllContext)

  return (
    <>
      {showModal && (
        <>
          <div
           className="outer-area"
          >
            <div
              className="outer-area-opacity"
            />

            <div
              style={{
                width: modalType === 'SEARCH' ? '80%' : '400px'
              }}
              className='modal-box'
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
            </div>
          </div>
        </>
      )}
    </>
  )
}
