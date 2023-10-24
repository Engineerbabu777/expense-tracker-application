import { useContext, useState } from 'react'
import { AllContext } from '../../../states/ContextProvider'
import useCategories from '../../../hooks/useCategory'

export default function NewCategoryModalBody ({}) {
  const { setShowModal, editCategory, modalType } = useContext(AllContext)
  const { addCategory, loadingState, setLoadingState, updateCategory } =
    useCategories()

  const [status, setStatus] = useState({
    error: '',
    success: ''
  })

  // STATE!
  const [newCategory, setNewCategory] = useState({
    name: editCategory ? editCategory?.categoryName : '',
    code: editCategory ? editCategory?.colorCode : '',
    limit: editCategory ? editCategory?.categoryLimit : '',
    currency: editCategory ? editCategory?.currency : '',
    id: editCategory?._id
  })

  // INPUT CHANGE HANDLERS!
  const onInputChange = event => {
    setNewCategory({ ...newCategory, [event.target.name]: event.target.value })
  }

  // ON-SUBMIT HANDLER FUNCTION!
  const onSubmitHandler = async () => {
    // CALL THE FUNCTION FROM HOOK!
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
        {modalType === 'NEW_CATEGORY' ? 'Add New ' : 'Edit '}
        Expense Category
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
          <label htmlFor='name' style={{ color: '#8e8e8e', fontWeight: '600' }}>
            Category Name:{' '}
          </label>
          <input
            id='name'
            type='text'
            name='name'
            style={{
              borderRadius: '3px',
              padding: '8px 10px',
              outline: 'none',
              border: '1px solid gray',
              backgroundColor: '#272829',
              color: 'white'
            }}
            placeholder='New Expense Category Name'
            onChange={onInputChange}
            value={newCategory.name}
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}
        >
          <label htmlFor='code' style={{ color: '#8e8e8e', fontWeight: '600' }}>
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
                border: newCategory.code === '#786AA3' && '2px solid lightGreen'
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
                border: newCategory.code === '#7AABB3' && '2px solid lightGreen'
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
                border: newCategory.code === '#789EE3' && '2px solid lightGreen'
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

            <div
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: '#786',
                borderRadius: '30px'
              }}
              onClick={() => setNewCategory({ ...newCategory, code: '#786' })}
            />

            <div
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: '#AAA',
                borderRadius: '30px'
              }}
              onClick={() => setNewCategory({ ...newCategory, code: '#AAA' })}
            />
            <div
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: '#CCC136',
                borderRadius: '30px'
              }}
              onClick={() =>
                setNewCategory({ ...newCategory, code: '#CCC136' })
              }
            />
            <div
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: '#786EEE',
                borderRadius: '30px'
              }}
              onClick={() =>
                setNewCategory({ ...newCategory, code: '#786EEE' })
              }
            />
          </div>
        </div>

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
            style={{
              borderRadius: '3px',
              padding: '8px 10px',
              outline: 'none',
              border: '1px solid gray',
              backgroundColor: '#272829',
              color: 'white'
            }}
            placeholder='New Expense Monthly Limit'
            onChange={onInputChange}
            value={newCategory.limit}
          />
          <div
            style={{
              display: 'flex',
              gap: '2px',
              color: '#898989',
              fontSize: '0.85rem',
              fontWeight: '600'
            }}
          >
            <span>Note: </span>
            <p>If not limit set then it will be infinity.</p>
          </div>
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
              // justifyContent: 'space-',
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
                checked={newCategory.currency === 'dollar'}
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
                checked={newCategory.currency === 'pkr'}
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
                checked={newCategory.currency === 'inr'}
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
                checked={newCategory.currency === 'lira'}
                onChange={onInputChange}
                name='currency'
              />
            </div>
          </div>
        </div>
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
