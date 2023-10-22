import { createContext, useState } from 'react'

export const AllContext = createContext(null)

export default function AllContextProvider ({ children }) {
  // MODAL STATES!
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('')

  return (
    <>
      <AllContext.Provider
        value={{ showModal, setShowModal, setModalType, modalType }}
      >
        {children}
      </AllContext.Provider>
    </>
  )
}
