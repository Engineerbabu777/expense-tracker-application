import '../../../styles/Homepage/Left/LeftSideBar.css'
import MenuList from '../../shared/MenuList/MenuList'

export default function LeftSide ({}) {
  return (
    <>
      <section className='sidebar-container'>
        {/* MAIN CONTENT BOX! */}
        <div className='main-content-box'>
          {/* CHILD (LIST) */}
          <MenuList />
        </div>
      </section>
    </>
  )
}
