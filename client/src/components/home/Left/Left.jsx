import '../../../styles/Homepage/Left/LeftSideBar.css'

import { RiDashboardFill } from 'react-icons/ri'
import { AiOutlineTransaction } from 'react-icons/ai'
import { SiExpensify } from 'react-icons/si'
import { FaBusinessTime } from 'react-icons/fa'
import { TbReportAnalytics } from 'react-icons/tb'
import { BiSolidFileExport } from 'react-icons/bi'
import { FaShieldVirus } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'

export default function LeftSide ({}) {
  return (
    <>
      <section className='sidebar-container'>
        {/* MAIN CONTENT BOX! */}
        <div className='main-content-box'>
          {/* CHILD (LIST) */}
          <div className='option-box color'>
            {/* ICON! */}
            <RiDashboardFill />

            {/* TEXT! */}
            <p>Dashboard</p>
          </div>

          <div className='option-box'>
            {/* ICON! */}
            <AiOutlineTransaction />

            {/* TEXT! */}
            <p>Transactions</p>
          </div>

          <div className='option-box'>
            {/* ICON! */}
            <SiExpensify />

            {/* TEXT! */}
            <p>Expense Categories</p>
          </div>

          <div className='option-box'>
            {/* ICON! */}
            <FaBusinessTime />

            {/* TEXT! */}
            <p>Budget Management</p>
          </div>

          <div className='option-box'>
            {/* ICON! */}
            <TbReportAnalytics />

            {/* TEXT! */}
            <p>Reports & Analytics</p>
          </div>

          <div className='option-box'>
            {/* ICON! */}
            <BiSolidFileExport />

            {/* TEXT! */}
            <p>Export Data</p>
          </div>

          <div className='option-box'>
            {/* ICON! */}
            <FaShieldVirus />

            {/* TEXT! */}
            <p>Privacy & Policy</p>
          </div>

          <div className='option-box'>
            {/* ICON! */}
            <IoMdSettings />

            {/* TEXT! */}
            <p>Settings</p>
          </div>
        </div>
      </section>
    </>
  )
}
