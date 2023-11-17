import '../../../styles/shared/menu.css'
import { MdClose } from 'react-icons/md'
import MenuList from '../MenuList/MenuList'

export default function SmallScreenMenu ({}) {
  return (
    <>
      <div className='main-parent'>
        <div className='close-icon-area'>
          <MdClose style={{ cursor: 'pointer' }} size={24} />
        </div>

        <div className='menu-options'>
          <MenuList />
        </div>
      </div>
    </>
  )
}
