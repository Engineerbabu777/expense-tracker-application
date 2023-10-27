import { useContext, useState } from 'react'
import { AllContext } from '../../../states/ContextProvider'
import useCategories from '../../../hooks/useCategory'
import useBudget from '../../../hooks/useBudget'

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
      },300);
    }
    if (response?.error) {
      // setLoadingState(false)
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
      <header
        style={{
          fontSize: '1.2rem',
          fontWeight: '700',
          color: 'white',
          textAlign: 'center',
          padding: '15px',
          borderBottom: '1px solid #272829'
        }}
      >
        {modalType === 'NEW_BUDGET' ? 'Add New ' : 'Edit '}
        Budget
      </header>

      {/* SELECT DATE! */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          margin: '15px'
        }}
      >
        <label htmlFor='date' style={{ color: '#8e8e8e', fontWeight: '600' }}>
          Select Budget (Date/Month) :{' '}
        </label>
        <input
          id='date'
          type='date'
          name='date'
          style={{
            borderRadius: '3px',
            padding: '8px 10px',
            outline: 'none',
            border: '1px solid gray',
            backgroundColor: '#272829',
            color: 'white'
          }}
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
      <footer
        style={{
          borderTop: '1px solid #272829',
          padding: '15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
          gap: '10px',
          marginTop: '20px'
        }}
      >
        {/* BUTTON CLOSE! */}
        <button
          style={{
            backgroundColor: '#333333',
            padding: '10px',
            outline: 'none',
            border: 'none',
            width: '100px',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
          type='button'
          onClick={() => setShowModal(false)}
        >
          CLOSE
        </button>
        {/* BUTTON SAVE! */}

        <button
          type='button'
          style={{
            backgroundColor: '#6E38E0',
            padding: '10px',
            outline: 'none',
            border: 'none',
            width: '100px',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
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
