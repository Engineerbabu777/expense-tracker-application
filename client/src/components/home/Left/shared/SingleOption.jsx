import { Link } from 'react-router-dom'
import '../../../../styles/Homepage/Left/LeftSideBar.css'


export default function SingleComponent ({ pathname, Icon, Name }) {
  return (
    <>
      <Link
        className={` option-box ${
          window?.location?.pathname?.includes('/' + pathname) ? ' color ' : ''
        } `}
        to={'/' + pathname}
      >
        {/* ICON! */}
        <Icon />
        {/* TEXT! */}
        <p>{Name}</p>
      </Link>
    </>
  )
}
