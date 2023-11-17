import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import useExpense from '../../../../../hooks/useExpense'
import useIncome from '../../../../../hooks/useIncome'
import Modal from '../../../../shared/Modal/Modal'
import { useContext } from 'react'
import { AllContext } from '../../../../../states/ContextProvider'
import { useLocation, useRoutes } from 'react-router-dom'
import { convertToSpecificCurrency } from '../../../../../utils/exchangeRates'

export default function Row ({ t, i, show = true }) {
  const TRANSACTION_TYPE = t?.categoryId ? 'EXPENSE' : 'INCOME'
  const { deleteExpenseById } = useExpense()
  const { deleteIncomeById } = useIncome()
  const { setEditTrans, setModalType, setShowModal, filterType } = useContext(AllContext)
  const { pathname } = useLocation()
  const showEditDelete = pathname.split('/').includes('transactions')

  const date = new Date(t?.createdAt).getDate()
  const month = new Date(t?.createdAt).getMonth() + 1
  const year = new Date(t?.createdAt).getFullYear()

  const deleteById = () => {
    // CHECK FOR TYPE !!
    if (TRANSACTION_TYPE === 'EXPENSE') {
      deleteExpenseById(t?._id)
    } else {
      deleteIncomeById(t?._id)
    }
  }

  return (
    <>
      {/* <Modal /> */}
      <tr key={i} style={{color:'white'}} >
        <td>
          {t?.categoryId ? (
            <>
              {t?.description.slice(0, 15)}
              {t?.description?.length > 15 && '...'}
            </>
          ) : (
            <>
              {t?.source.slice(0, 15)}
              {t?.source?.length > 15 && '...'}
            </>
          )}
        </td>
        <td>{convertToSpecificCurrency(t?.currency,filterType,t?.money).rate}{" "}{filterType}</td>
        <td>{t?.categoryId ? t?.categoryId?.categoryName : '-'}</td>
        <td>{t?.categoryId ? 'Expense' : 'Income'}</td>
        <td>{date + '-' + month + '-' + year}</td>
        {(showEditDelete && show) && (
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
                  setEditTrans(t)

                  setShowModal(true)
                  setModalType(TRANSACTION_TYPE)
                }}
              >
                <FaEdit size={18} />
              </span>
              <span
                style={{ color: '#F15A59', cursor: 'pointer' }}
                onClick={deleteById}
              >
                <MdDelete size={20} />
              </span>
            </p>
          </td>
        )}
      </tr>
    </>
  )
}
