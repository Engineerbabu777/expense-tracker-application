import Input from '../../components/auth/Input'
import { useEffect, useState } from 'react'
import Header from '../../components/auth/Header'
import AuthContainer from '../../components/auth/Container'
import TopHeadings from '../../components/auth/TopHeadings'
import SideImageComponent from '../../components/auth/SideImageComponent'
import Button from '../../components/auth/Button'
import MainBodyContainer from '../../components/auth/MainBodyContainer'
import FormContainer from '../../components/auth/FormContainer'
import { useLocation } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

export default function ResetPasswordPage () {
  const location = useLocation()
  // HANDLE STATES!
  const [details, setDetails] = useState({
    password: '',
    confirm: '',
    error: '',
    success: ''
  })
  const [isUserOk, setIsUserOk] = useState(false)

  const getTokenCheckUser = () => {
    try {
      if (location?.pathname?.split('/')[2]) {
        const token = location.pathname.split('/')[2]

        // MAKE A GET REQUEST!
        fetch(
          'http://localhost:4444/api/auth/page/newPassword?token=' + token,
          {
            method: 'GET'
          }
        ).then(response =>
          response.json().then(data => {
            if (data.error) {
              setIsUserOk(false)
            }
            if (data.success) {
              setIsUserOk(true)
            }
          })
        )
      }
    } catch (error) {
      console.log('ERROR GETTING TOKEN: ', error.message)
    }
  }

  useEffect(() => {
    getTokenCheckUser()
  }, [])

  // ONCHANGE STATE! (WILL PUSH TO UTILS)
  const onChangeStateHandler = event => {
    setDetails({
      ...details,
      success: '',
      error: '',
      [event.target.name]: event.target.value // CHANGING TARGETING VALUE !
    })
  }

  const handleChangePassword = () => {
    if (!details.password || !details.confirm) {
      setDetails({ ...details, error: 'Fill all fields' })
      return
    }

    if (details.password !== details.confirm) {
      setDetails({ ...details, error: 'Passwords do not match' })
      return
    }

    try {
      const { id } = jwt_decode(location?.pathname?.split('/')[2])

      fetch('http://localhost:4444/api/auth/newPassword', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json'
        },
        body: JSON.stringify({ password: details.password, userId: id })
      }).then(response =>
        response.json().then(data => {
          if (data.error) {
            setDetails({ ...details, error: data.message, success: '' })
          }
          if (data?.success) {
            setDetails({ ...details, success: data.message, error: '' })
          }
        })
      )
    } catch (error) {
      console.log('EMAIL ERROR: ', error?.message)
    }
  }

  return (
    <>
      <AuthContainer>
        <Header link={'register'} title={'Sign up'} />

        <MainBodyContainer>
          <FormContainer>
            <TopHeadings
              heading1={isUserOk ? 'Reset Your Password' : 'InValid Token'}
            />

            {isUserOk && (
              <>
                <Input
                  placeholder={'Enter Your New Password'}
                  value={details.password}
                  onChange={onChangeStateHandler}
                  name={'password'}
                  type={'password'}
                />

                <Input
                  placeholder={'Confirm New Password'}
                  value={details.confirm}
                  onChange={onChangeStateHandler}
                  name={'confirm'}
                  type={'password'}
                />

                {/* EMAIL SENT TEXT! */}
                {details.success && (
                  <p style={{ fontSize: 13, color: 'green' }}>
                    {details.success}
                  </p>
                )}
                {/* EMAIL NOT FOUND! */}
                {details.error && (
                  <p style={{ fontSize: 13, color: 'red' }}>{details.error}</p>
                )}

                <Button onClick={handleChangePassword}>Reset Password</Button>
              </>
            )}
          </FormContainer>
          <SideImageComponent />
        </MainBodyContainer>
      </AuthContainer>
    </>
  )
}
