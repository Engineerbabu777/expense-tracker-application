import { useContext, useState } from 'react'
import { AllContext } from '../../../states/ContextProvider'
import useCategories from '../../../hooks/useCategory'
import { useLocation } from 'react-router-dom'
import useBudget from '../../../hooks/useBudget'
import '../../../styles/Homepage/Categories/ModalBody.css'

export default function NewCategoryModalBody ({}) {
  const { setShowModal, editCategory, modalType } = useContext(AllContext)
  const { addCategory, loadingState, setLoadingState, updateCategory } =
    useCategories()
  const { editMonthlyBudgetCategory } = useBudget()

  const location = useLocation()
  const isBudget = location.pathname.includes('/management')

  const [status, setStatus] = useState({
    error: '',
    success: ''
  })

  // STATE!
  const [newCategory, setNewCategory] = useState({
    name: editCategory?.categoryId
      ? editCategory?.categoryId?.categoryName
      : editCategory?.categoryName
      ? editCategory.categoryName
      : '',
    code: editCategory?.categoryId
      ? editCategory?.categoryId?.colorCode
      : editCategory?.colorCode
      ? editCategory.colorCode
      : '',
    limit: editCategory?.monthlyLimit ? editCategory?.monthlyLimit : '',
    currency: editCategory ? editCategory?.currency : '',
    id: editCategory?.categoryId
      ? editCategory?.categoryId?._id
      : editCategory?._id
  })

  // INPUT CHANGE HANDLERS!
  const onInputChange = event => {
    setNewCategory({ ...newCategory, [event.target.name]: event.target.value })
  }

  // ON-SUBMIT HANDLER FUNCTION!
  const onSubmitHandler = async () => {
    // CALL THE FUNCTION FROM HOOK!
    if (isBudget) {
      // FOR BUDGET LIMIT CURRENCY!
      const response = await editMonthlyBudgetCategory(newCategory)
      console.log('BUDGET LIMIT:', response)
      if (response?.success) {
        setStatus({
          error: '',
          success: response?.message
        })
      }
      if (response?.error) {
        setLoadingState(false)
        setStatus({
          success: '',
          error: response.message
        })
      }
    } else {
      // FOR CATEGORIES!
      const response =
        modalType === 'NEW_CATEGORY'
          ? await addCategory(newCategory)
          : await updateCategory(newCategory)

      console.log('text', response)
      if (response?.success) {
        setStatus({
          error: '',
          success: response?.message
        })
      }
      if (response?.error) {
        setLoadingState(false)
        setStatus({
          success: '',
          error: response.message
        })
      }
    }
  }

  return (
    <>
      {/* WILL CHANGE LATER FOR ALL! */}
      {/* HEADING! */}
      <header className='header'>
        {modalType === 'NEW_CATEGORY' ? 'Add New ' : 'Edit '}
        Expense Category
      </header>

      {/* INPUTS! */}
      <div className='inputs-container'>
        {!isBudget && (
          <div className='budget-available-container'>
            <label
              htmlFor='name'
              style={{ color: '#8e8e8e', fontWeight: '600' }}
            >
              Category Name:{' '}
            </label>
            <input
              id='name'
              type='text'
              name='name'
              className='input-one'
              placeholder='New Expense Category Name'
              onChange={onInputChange}
              value={newCategory.name}
            />
          </div>
        )}
        {!isBudget && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}
          >
            <label
              htmlFor='code'
              style={{ color: '#8e8e8e', fontWeight: '600' }}
            >
              Color Code:{' '}
            </label>

            <div
              style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#786AA3',
                  borderRadius: '30px',
                  border:
                    newCategory.code === '#786AA3' && '2px solid lightGreen'
                }}
                onClick={() =>
                  setNewCategory({ ...newCategory, code: '#786AA3' })
                }
              />

              <div
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#7AABB3',
                  borderRadius: '30px',
                  border:
                    newCategory.code === '#7AABB3' && '2px solid lightGreen'
                }}
                onClick={() =>
                  setNewCategory({ ...newCategory, code: '#7AABB3' })
                }
              />

              <div
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#789EE3',
                  borderRadius: '30px',
                  border:
                    newCategory.code === '#789EE3' && '2px solid lightGreen'
                }}
                onClick={() =>
                  setNewCategory({ ...newCategory, code: '#789EE3' })
                }
              />

              <div
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#599AB4',
                  borderRadius: '30px'
                }}
                onClick={() =>
                  setNewCategory({ ...newCategory, code: '#599AB4' })
                }
              />
            </div>
          </div>
        )}
        {isBudget && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}
          >
            <label
              htmlFor='limit'
              style={{ color: '#8e8e8e', fontWeight: '600' }}
            >
              Expense Monthly Limit:{' '}
            </label>
            <input
              id='limit'
              type='number'
              name='limit'
              className='input-two'
              placeholder='New Expense Monthly Limit'
              onChange={onInputChange}
              value={newCategory.limit}
            />
            <div className='note-styles'>
              <span>Note: </span>
              <p>If not limit set then it will be infinity.</p>
            </div>
          </div>
        )}

        {isBudget && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}
          >
            <label style={{ color: '#8e8e8e', fontWeight: '600' }}>
              Currency:{' '}
            </label>

            {/* CURRENCY PARENT! */}
            <div className='currency-main-parent'>
              {/* CURRENCY DOLLAR */}
              <div className='currency-box'>
                {/* NAME! */}
                <label htmlFor='dollar'>Dollar</label>

                {/* RADIO! */}
                <input
                  id={'dollar'}
                  type='radio'
                  value={'dollar'}
                  onChange={onInputChange}
                  checked={newCategory.currency === 'dollar'}
                  name='currency'
                />
              </div>
              {/* CURRENCY PKR! */}
              <div className='currency-box'>
                {/* NAME! */}
                <label htmlFor='pkr'>Pkr</label>

                {/* RADIO! */}
                <input
                  id={'pkr'}
                  type='radio'
                  value={'pkr'}
                  onChange={onInputChange}
                  checked={newCategory.currency === 'pkr'}
                  name='currency'
                />
              </div>

              <div className='currency-box'>
                {/* NAME! */}
                <label htmlFor='dollar'>Inr</label>

                {/* RADIO! */}
                <input
                  type='radio'
                  value={'inr'}
                  checked={newCategory.currency === 'inr'}
                  onChange={onInputChange}
                  name='currency'
                />
              </div>

              <div className='currency-box'>
                {/* NAME! */}
                <label htmlFor='lira'>Lira</label>

                {/* RADIO! */}
                <input
                  type='radio'
                  value={'lira'}
                  checked={newCategory.currency === 'lira'}
                  onChange={onInputChange}
                  name='currency'
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {status.error && (
        <p style={{ color: 'red', textAlign: 'center' }}>{status.error}</p>
      )}
      {status.success && (
        <p style={{ color: 'green', textAlign: 'center' }}>{status.success}</p>
      )}

      {/* FOOTER! */}
      <footer className='footer'>
        {/* BUTTON CLOSE! */}
        <button
          className='button button-close'
          type='button'
          onClick={() => setShowModal(false)}
        >
          CLOSE
        </button>
        {/* BUTTON SAVE! */}

        <button
          type='button'
          className='button button-save'
          onClick={onSubmitHandler}
        >
          {loadingState
            ? 'SAVING...'
            : modalType === 'NEW_CATEGORY'
            ? 'SAVE'
            : 'UPDATE'}
        </button>
      </footer>
    </>
  )
}
