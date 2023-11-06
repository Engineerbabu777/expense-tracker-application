import { useContext, useState } from 'react'
import { AllContext } from '../../../../states/ContextProvider'
import { useLocation } from 'react-router-dom'
import useIncome from '../../../../hooks/useIncome'

export default function IncomeModalBody ({}) {
  const {
    setShowModal,
    modalType,
    editTrans: transaction
  } = useContext(AllContext)
  const { addNewIncome, updateIncomes } = useIncome()

  const location = useLocation()

  const [status, setStatus] = useState({
    error: '',
    success: ''
  })

  // STATE!
  const [newTransaction, setNewTransaction] = useState({
    amount: transaction?.money || 0,
    source: transaction?.source || '',
    currency: transaction?.currency || '',
    id: transaction?._id || ''
  })

  // INPUT CHANGE HANDLERS!
  const onInputChange = event => {
    setNewTransaction({
      ...newTransaction,
      [event.target.name]: event.target.value
    })
  }

  // ON-SUBMIT HANDLER FUNCTION!
  const onSubmitHandler = async () => {
    console.log(newTransaction)

    // IF TRUE THEN WE WILL EDIT IT!
    if (transaction?._id) {
      updateIncomes(newTransaction)
    } else {
      // IF NO THEN WE WILL CREATE NEW TRANSACTION!!
      addNewIncome(newTransaction)
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
        {modalType === 'NEW_INCOME' ? 'Add New ' : 'Edit '}
        Income Transaction
      </header>

      {/* INPUTS! */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          marginTop: '20px',
          padding: '15px'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}
        >
          <label
            htmlFor='amount'
            style={{ color: '#8e8e8e', fontWeight: '600' }}
          >
            Income Amount:{' '}
          </label>
          <input
            id='amount'
            type='number'
            name='amount'
            style={{
              borderRadius: '3px',
              padding: '8px 10px',
              outline: 'none',
              border: '1px solid gray',
              backgroundColor: '#272829',
              color: 'white'
            }}
            placeholder='Enter your income amount'
            onChange={onInputChange}
            value={newTransaction.amount}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}
        >
          <label htmlFor='name' style={{ color: '#8e8e8e', fontWeight: '600' }}>
            Income Source:{' '}
          </label>
          <textarea
            id='source'
            type='text'
            name='source'
            rows={10}
            style={{
              borderRadius: '3px',
              padding: '8px 10px',
              outline: 'none',
              border: '1px solid gray',
              backgroundColor: '#272829',
              color: 'white',
              resize: 'none'
            }}
            placeholder='Enter your income source'
            onChange={onInputChange}
            value={newTransaction.source}
          />
        </div>

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

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* NAME! */}
              <label htmlFor='dollar'>Dollar</label>

              {/* RADIO! */}
              <input
                id={'dollar'}
                type='radio'
                value={'dollar'}
                onChange={onInputChange}
                checked={newTransaction.currency === 'dollar'}
                name='currency'
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* NAME! */}
              <label htmlFor='pkr'>Pkr</label>

              {/* RADIO! */}
              <input
                id={'pkr'}
                type='radio'
                value={'pkr'}
                onChange={onInputChange}
                checked={newTransaction.currency === 'pkr'}
                name='currency'
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* NAME! */}
              <label htmlFor='dollar'>Inr</label>

              {/* RADIO! */}
              <input
                type='radio'
                value={'inr'}
                checked={newTransaction.currency === 'inr'}
                onChange={onInputChange}
                name='currency'
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* NAME! */}
              <label htmlFor='lira'>Lira</label>

              {/* RADIO! */}
              <input
                type='radio'
                value={'lira'}
                checked={newTransaction.currency === 'lira'}
                onChange={onInputChange}
                name='currency'
              />
            </div>
          </div>
        </div>
        {/* )} */}
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
          {false ? 'SAVING...' : modalType === 'NEW_INCOME' ? 'SAVE' : 'UPDATE'}
        </button>
      </footer>
    </>
  )
}
