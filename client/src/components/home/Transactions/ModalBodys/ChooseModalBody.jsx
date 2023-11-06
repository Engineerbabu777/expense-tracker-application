import { useContext } from 'react'

import { AllContext } from '../../../../states/ContextProvider'

export default function ChooseModalBody ({}) {
  const { modalType, setModalType } = useContext(AllContext)

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
        {modalType === 'CHOOSE_OPTION' && 'Choose Transaction Type'}
      </header>

      <button
        style={{
          width: '90%',
          margin: '30px auto 15px',
          display: 'flex',
          padding: '10px',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#272829',
          border: 'none',
          outline: 'none',
          color: '#898989',
          borderRadius: '10px',
          fontWeight: '600'
        }}
        onClick={() => setModalType('NEW_INCOME')}
      >
        Income Transaction
      </button>

      <button
        style={{
          width: '90%',
          margin: '15px auto 30px',
          display: 'flex',
          padding: '10px',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#272829',
          border: 'none',
          outline: 'none',
          color: '#898989',
          borderRadius: '10px',
          fontWeight: '600'
        }}
        onClick={() => setModalType('NEW_EXPENSE')}
      >
        Expense Transaction
      </button>
    </>
  )
}
