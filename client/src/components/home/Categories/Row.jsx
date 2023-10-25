import { FaEdit } from 'react-icons/fa'
import useCategories from '../../../hooks/useCategory'
import { MdDelete } from 'react-icons/md'
import { toast } from 'react-hot-toast'
import { useContext } from 'react'
import { AllContext } from '../../../states/ContextProvider'

export default function Row ({ category, i }) {
  const { deleteCategories } = useCategories()
  const { setEditCategory, setShowModal, setModalType } = useContext(AllContext)

  // DELETING CATEGORY !!
  const deleteCategoryById = async id => {
    const { success, error, message } = await deleteCategories(id)
    if (success) {
      toast.success('Success!')
    }
    if (error) {
      toast.error(message)
    }
  }

  return (
    <>
      <tr key={i} style={i % 2 === 0 ? {} : {}}>
        <td>{i}.</td>
        <td>{category?.categoryName}</td>
        <td>{category?.colorCode}</td>
        <td>
          {category?.categoryLimit ? category?.categoryLimit : 'infinity'}
        </td>
        <td>{category?.currency}</td>
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
            <span
              style={{ color: '#F15A59', cursor: 'pointer' }}
              onClick={() => deleteCategoryById(category?._id)}
            >
              <MdDelete size={20} />
            </span>
          </p>
        </td>
      </tr>
    </>
  )
}
