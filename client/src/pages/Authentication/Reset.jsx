import Input from '../../components/auth/Input'
import { useState } from 'react'
import Header from '../../components/auth/Header'
import AuthContainer from '../../components/auth/Container'
import TopHeadings from '../../components/auth/TopHeadings'
import SideImageComponent from '../../components/auth/SideImageComponent'
import Button from '../../components/auth/Button'
import BottomNote from '../../components/auth/BottomNote'
import MainBodyContainer from '../../components/auth/MainBodyContainer'
import FormContainer from '../../components/auth/FormContainer'

export default function Register () {
  // HANDLE STATES!
  const [loginState, setLoginState] = useState({
    email: '',
    error: '',
    success: ''
  })

  // ONCHANGE STATE! (WILL PUSH TO UTILS)
  const onChangeStateHandler = event => {
    setLoginState({
      success: '',
      error: '',
      [event.target.name]: event.target.value // CHANGING TARGETING VALUE !
    })
  }

  const handleReset = () => {
    console.log('RESETTING...')
    console.log(loginState.email)
    try {
      fetch('http://localhost:4444/api/auth/resetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json'
        },
        body: JSON.stringify({ email: loginState.email })
      }).then(response =>
        response.json().then(data => {
          if (data.error) {
            setLoginState({ ...loginState, error: data.message, success: '' })
          }
          if (data?.success) {
            setLoginState({ ...loginState, success: data.message, error: '' })
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
              heading1={'Reset Password'}
              heading2={'Are you sure you have already account?'}
              heading3={
                'Enter your email and we will send you instructions, how to reset your password'
              }
            />

            <Input
              placeholder={'Enter Your Email'}
              value={loginState.email}
              onChange={onChangeStateHandler}
              name={'email'}
              type={'email'}
            />

            {/* EMAIL SENT TEXT! */}
            {loginState.success && (
              <p style={{ fontSize: 13, color: 'green' }}>
                Email has been sent. check out your email
              </p>
            )}
            {/* EMAIL NOT FOUND! */}
            {loginState.error && (
              <p style={{ fontSize: 13, color: 'red' }}>
                Email not found, try correct one
              </p>
            )}

            <Button onClick={handleReset}>Submit Reset Request</Button>

            <BottomNote
              note={"Ohh! Don't have an account?"}
              linkButton={'Sign Up'}
              link={'register'}
            />
          </FormContainer>
          <SideImageComponent />
        </MainBodyContainer>
      </AuthContainer>
    </>
  )
}
