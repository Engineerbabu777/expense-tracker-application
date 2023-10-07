import { GoArrowUpRight } from 'react-icons/go'
import { TbWorld } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import '../../styles/auth/HeaderStyles.css'

export default function Header ({ link, title }) {
  return (
    <>
      <header className='header'>
        {/* HEADER SECTION 1 */}
        <section className='login-logo'>Logo here</section>

        {/* HEADER SECTION 2 */}
        <section className='header-section-2'>
          {/* WORLD! */}
          <TbWorld
            style={{ width: '20px', height: '20px', color: '#000000' }}
          />

          {/* SIGNUP BUTTON! */}
          <Link to={'/' + link} className='header-sign-up-btn'>
            {title}
          </Link>

          {/* DEVELOPER INFO! */}
          <button className='about-btn'>
            About
            <GoArrowUpRight
              style={{ width: '18px', height: '18px', color: '#000000' }}
            />
          </button>
        </section>
      </header>
    </>
  )
}
