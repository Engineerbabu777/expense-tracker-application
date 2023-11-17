import { BiSolidFileExport } from 'react-icons/bi'
import { FaBusinessTime, FaShieldVirus } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import { TbReportAnalytics } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import SingleComponent from '../../home/Left/shared/SingleOption'
import { RiDashboardFill } from 'react-icons/ri'
import { AiOutlineTransaction } from 'react-icons/ai'
import { SiExpensify } from 'react-icons/si'
import { useContext } from 'react'
import { AllContext } from '../../../states/ContextProvider'

export default function MenuList ({}) {
  const { setShowModal } = useContext(AllContext)

  return (
    <>
      <Link
        onClick={() => setShowModal(false)}
        className={`option-box ${
          window?.location?.pathname === '/' ? ' color ' : '  '
        }  `}
        to={'/'}
      >
        {/* ICON! */}
        <RiDashboardFill />

        {/* TEXT! */}
        <p>Dashboard</p>
      </Link>

      <SingleComponent
        onClick={() => setShowModal(false)}
        Icon={AiOutlineTransaction}
        Name={'Transactions'}
        pathname={'transactions'}
      />

      <SingleComponent
        onClick={() => setShowModal(false)}
        Icon={SiExpensify}
        Name={'Expense Categories'}
        pathname={'categories'}
      />

      <Link
        onClick={() => setShowModal(false)}
        className={` option-box ${
          window?.location?.pathname?.includes('/management') ? ' color ' : ''
        } `}
        to={'/management'}
      >
        {/* ICON! */}
        <FaBusinessTime />

        {/* TEXT! */}
        <p>Budget Management</p>
      </Link>

      <Link
        onClick={() => setShowModal(false)}
        className={` option-box ${
          window?.location?.pathname?.includes('/reports') ? ' color ' : ''
        } `}
        to={'/reports'}
      >
        {/* ICON! */}
        <TbReportAnalytics />

        {/* TEXT! */}
        <p>Reports & Analytics</p>
      </Link>

      <Link
        onClick={() => setShowModal(false)}
        className={` option-box ${
          window?.location?.pathname?.includes('/export') ? ' color ' : ''
        } `}
        to={'/export'}
      >
        {/* ICON! */}
        <BiSolidFileExport />

        {/* TEXT! */}
        <p>Export Data</p>
      </Link>

      <Link
        onClick={() => setShowModal(false)}
        className={` option-box ${
          window?.location?.pathname?.includes('/privacy') ? ' color ' : ''
        } `}
        to={'/privacy'}
      >
        {/* ICON! */}
        <FaShieldVirus />

        {/* TEXT! */}
        <p>Privacy & Policy</p>
      </Link>

      <Link
        onClick={() => setShowModal(false)}
        className={` option-box ${
          window?.location?.pathname?.includes('/settings') ? ' color ' : ''
        } `}
        to={'/settings'}
      >
        {/* ICON! */}
        <IoMdSettings />

        {/* TEXT! */}
        <p>Settings</p>
      </Link>
    </>
  )
}
