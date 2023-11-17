import { useContext, useState } from 'react'
import { AllContext } from '../../../states/ContextProvider'
import useBudget from '../../../hooks/useBudget'
import '../../../styles/Homepage/management/modalBody.css'

export default function MOdalBodyForBudget ({}) {
  const { setShowModal, modalType } = useContext(AllContext)
  const { createNewBudget, creatingBudget } = useBudget()

  const [status, setStatus] = useState({
    error: '',
    success: ''
  })

  // STATE!
  const [newBudget, setNewBudget] = useState({
    date: null
  })

  // INPUT CHANGE HANDLERS!
  const onInputChange = event => {
    setNewBudget({ ...newBudget, [event.target.name]: event.target.value })
  }

  // ON-SUBMIT HANDLER FUNCTION!
  const onSubmitHandler = async () => {
    // CALL THE FUNCTION FROM HOOK!
    const response =
      modalType === 'NEW_BUDGET' ? await createNewBudget(newBudget.date) : null
    console.log('text', response)
    if (response?.success) {
      setStatus({
        error: '',
        success: response?.message
      })

      setTimeout(() => {
        setShowModal(false)
      }, 300)
    }
    if (response?.error) {
      setStatus({
        success: '',
        error: response.message
      })
    }
  }

  return (
    <>
      {/* WILL CHANGE LATER FOR ALL! */}
      {/* HEADING! */}
      <header className='HEADER'>
        {modalType === 'NEW_BUDGET' ? 'Add New ' : 'Edit '}
        Budget
      </header>

      {/* SELECT DATE! */}
      <div className='select-date'>
        <label htmlFor='date' style={{ color: '#8e8e8e', fontWeight: '600' }}>
          Select Budget (Date/Month) :{' '}
        </label>
        <input
          id='date'
          type='date'
          name='date'
          className='input'
          placeholder='CREATE NEW BUDGET'
          onChange={onInputChange}
          value={newBudget.date}
        />
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
          className='footer-button-close'
          type='button'
          onClick={() => setShowModal(false)}
        >
          CLOSE
        </button>

        {/* BUTTON SAVE! */}
        <button
          type='button'
          className='footer-button-save'
          onClick={onSubmitHandler}
        >
          {creatingBudget
            ? 'CREATING...'
            : modalType === 'NEW_BUDGET'
            ? 'CREATE'
            : 'UPDATE'}
        </button>
      </footer>
    </>
  )
}
