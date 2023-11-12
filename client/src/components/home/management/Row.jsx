import { FaEdit } from 'react-icons/fa'
import useCategories from '../../../hooks/useCategory'
import { MdDelete } from 'react-icons/md'
import { toast } from 'react-hot-toast'
import { useContext } from 'react'
import { AllContext } from '../../../states/ContextProvider'

export default function Row ({ category, i }) {
  const { setEditCategory, setShowModal, setModalType } = useContext(AllContext)




  return (
    <>
      <tr key={i} style={i % 2 === 0 ? {} : {}}>
        <td>{i}.</td>
        <td>
          {category?.categoryId
            ? category?.categoryId?.categoryName
            : category?.categoryName}
        </td>
        <td>
          {category?.categoryId
            ? category?.categoryId?.colorCode
            : category?.colorCode}
        </td>
        <td>
          {category?.monthlyLimit ? (
            category.monthlyLimit
          ) : (
            <p style={{ color: 'red', fontSize: '0.80rem' }}>set Limit</p>
          )}
        </td>
        <td>
          {category?.currency ? (
            category.currency
          ) : (
            <p style={{ color: 'red', fontSize: '0.80rem' }}>set currency</p>
          )}
        </td>

        <td>
          <p
            style={{
              display: 'flex',
              gap: '15px',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <span
              style={{ color: '#6BCB77', cursor: 'pointer' }}
              onClick={() => {
                setEditCategory(category)
                setShowModal(true)
                setModalType('EDIT_CATEGORY')
              }}
            >
              <FaEdit size={18} />
            </span>
          </p>
        </td>
      </tr>
    </>
  )
}
