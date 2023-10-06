import { GoArrowUpRight } from 'react-icons/go'
import { TbWorld } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import '../../styles/Authentication/Login/Main.css'
import {FaLocationArrow} from 'react-icons/fa';


export default function ResetPassword () {
  return (
    <>
      <div
        style={{
          width: '100vw',
          height: '100vh',
          backgroundColor: '#f5f2eb',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {/* HEADER! */}

        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            borderBottom: '2px solid black',
            height: '52px',
            width: '100vw',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 5px'
          }}
        >
          <div className='login-logo'>Logo here</div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginRight: '10px',
              justifyContent: 'end',
              gap: '15px'
            }}
          >
            {/* WORLD! */}
            <TbWorld
              style={{ width: '20px', height: '20px', color: '#000000' }}
            />

            {/* SIGNUP BUTTON! */}
            <Link
              to='/register'
              className='header-sign-up-btn'
              style={{
                backgroundColor: 'inherit',
                fontSize: '16px',
                padding: '5px 12px',
                borderRadius: '5px',
                cursor: 'pointer',
                border: '1px solid #f5f2eb',
                textDecoration: 'none',
                color: 'black',
                fontWeight: '600'
              }}
            >
              Sign up
            </Link>

            {/* DEVELOPER INFO! */}
            <button
              style={{
                backgroundColor: '#aed6b3',
                padding: '5px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                border: 'none',
                borderRadius: '5px',
                fontSize: '14px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              About
              <GoArrowUpRight
                style={{ width: '18px', height: '18px', color: '#000000' }}
              />
            </button>
          </div>
        </div>

        {/* MAIN! */}
        <div className='login-container'>
          <div className='login-form-container'>
            {/* HEADING! */}
            <h1
              style={{
                fontSize: '22px',
                fontWeight: '700',
                textAlign: 'center'
              }}
            >
              Reset Password
            </h1>

            {/* SMALL TEXT! */}
            <h2
              style={{
                fontSize: '14px',
                textAlign: 'center',
                marginBottom: '10px',
                fontWeight: '500',
                width: '240px'
              }}
            >
              Are you sure you are having an account?
            </h2>

            <p
              style={{
                fontSize: '14px',
                textAlign: 'center',
                marginBottom: '10px',
                fontWeight: '500',
              }}
            >
              Enter your email and we will send you instructions, how to reset
              your password
            </p>

            {/* INPUTS! */}
            <input
              placeholder='Enter Your Email'
              style={{
                width: '100%',
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid #5D5D5D',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />

            {/* SIGN IN BUTTON! */}
            <button
              style={{
                backgroundColor: '#AED6B3',
                border: 'none',
                outline: 'none',
                borderRadius: '8px',
                padding: '10px 16px',
                width: '100%',
                color: '#fff',
                fontWeight: '600',
                marginTop: '10px',
                cursor: 'pointer',
                display:'flex',
                alignItems:'center',
                gap:'7px',
                justifyContent:'center',
              }}
            >
              Submit Reset Request
              <FaLocationArrow style={{color:'white',height:'14px',width:"14px"}}/>
            </button>

            {/* REGISTER NOW! */}
            <div
              style={{
                display: 'flex',
                gap: '5px',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                marginTop: '10px'
              }}
            >
              <p>Ohh!! I don't have an account?</p>
              <Link
                to={'/register'}
                style={{
                  fontWeight: '700',
                  textDecoration: 'none',
                  color: 'black'
                }}
              >
                sign up
              </Link>
            </div>
            {/* </div> */}
          </div>
          {/* IMAGE SIDE! */}
          <div className='login-image-box'>
            <img src='/auth.png' alt='img' className='login-image' />
          </div>
        </div>
      </div>
    </>
  )
}
