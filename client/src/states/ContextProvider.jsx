import { createContext, useState } from 'react'

export const AllContext = createContext(null)

export default function AllContextProvider ({ children }) {
  // MODAL STATES!
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [allCategories, setAllCategories] = useState([])
  const [editCategory, setEditCategory] = useState(null)

  console.log(showModal,modalType)


  return (
    <>
      <AllContext.Provider
        value={{
          showModal,
          setShowModal,
          setModalType,
          modalType,
          allCategories,
          setAllCategories,
          editCategory,
          setEditCategory
        }}
      >
        {children}
      </AllContext.Provider>
    </>
  )
}
