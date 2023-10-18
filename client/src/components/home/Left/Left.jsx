import '../../../styles/Homepage/Left/LeftSideBar.css'

import { RiDashboardFill } from 'react-icons/ri'
import { AiOutlineTransaction } from 'react-icons/ai'
import { SiExpensify } from 'react-icons/si'
import { FaBusinessTime } from 'react-icons/fa'
import { TbReportAnalytics } from 'react-icons/tb'
import { BiSolidFileExport } from 'react-icons/bi'
import { FaShieldVirus } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import { Link } from 'react-router-dom'
import SingleComponent from './shared/SingleOption'

export default function LeftSide ({}) {
  return (
    <>
      <section className='sidebar-container'>
        {/* MAIN CONTENT BOX! */}
        <div className='main-content-box'>
          {/* CHILD (LIST) */}

          <Link
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
            Icon={AiOutlineTransaction}
            Name={'Transactions'}
            pathname={'transactions'}
          />

          <SingleComponent
            Icon={SiExpensify}
            Name={'Expense Categories'}
            pathname={'categories'}
          />

          <Link
            className={` option-box ${
              window?.location?.pathname?.includes('/management')
                ? ' color '
                : ''
            } `}
            to={'/management'}
          >
            {/* ICON! */}
            <FaBusinessTime />

            {/* TEXT! */}
            <p>Budget Management</p>
          </Link>

          <Link
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
        </div>
      </section>
    </>
  )
}
