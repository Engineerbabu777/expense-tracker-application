import Input from '../../components/auth/Input'
import { useContext, useState } from 'react'
import Header from '../../components/auth/Header'
import AuthContainer from '../../components/auth/Container'
import TopHeadings from '../../components/auth/TopHeadings'
import SideImageComponent from '../../components/auth/SideImageComponent'
import Button from '../../components/auth/Button'
import BottomNote from '../../components/auth/BottomNote'
import MainBodyContainer from '../../components/auth/MainBodyContainer'
import FormContainer from '../../components/auth/FormContainer'
import { authValidation } from '../../utils/authValidations'
import toast from 'react-hot-toast'

export default function Register () {
  // HANDLE STATES!
  const [registerState, setRegisterState] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    error:'',
    success:'',
    loading: false,
  })

  // ONCHANGE STATE! (WILL PUSH TO UTILS)
  const onChangeStateHandler = event => {
    setRegisterState({ success:'',error:'',
      ...registerState, // SPREADING PREVIOUS STATE !
      [event.target.name]: event.target.value // CHANGING TARGETING VALUE !
    })
  }

  // HANDLE SUBMIT!
  const handleSubmit = event => {
    try {
      const validator = authValidation(
        registerState.name,
        registerState.email,
        registerState.password,
        registerState.confirmPassword
      );


      // PROCEEDED IF VALIDATOR IS OK!
      // MAKE A REQUEST!
      fetch('http://localhost:4444/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json'
        },
        body: JSON.stringify(registerState)
      }).then(response => response.json().then(data => {
        if(data?.success){
          console.log(data)

          setRegisterState({...registerState,success:data.message});
        }
        if(data?.error){
          console.log(data)
          setRegisterState({...registerState,error:data.message});
        }
      }))
    } catch (error) {
      toast.error(`${error.message}`)
      console.log('ERROR-> ', error.message)
    }
  }

  return (
    <>
      <AuthContainer>
        <Header link={'login'} title={'Log in'} />

        <MainBodyContainer>
          <FormContainer>
            <TopHeadings
              heading1={'Sign Up'}
              heading2={'Hey, Enter your details to create your new account'}
            />

            <Input
              placeholder={'Enter Your Full Name'}
              onChange={onChangeStateHandler}
              value={registerState.name}
              name={'name'}
              type={'text'}
              disabled={registerState.loading}
            />
            <Input
              placeholder={'Enter Your Email'}
              value={registerState.email}
              onChange={onChangeStateHandler}
              name={'email'}
              type={'email'}
              disabled={registerState.loading}

            />
            <Input
              onChange={onChangeStateHandler}
              placeholder={'Enter Your Password'}
              value={registerState.password}
              name={'password'}
              type={'password'}
              disabled={registerState.loading}

            />
            <Input
              placeholder={'Enter Your Confirm Password'}
              value={registerState.confirmPassword}
              onChange={onChangeStateHandler}
              name={'confirmPassword'}
              type={'password'}
              disabled={registerState.loading}

            />

             {/* EMAIL SENT TEXT! */}
             {registerState?.success && (
              <p style={{ fontSize: 13, color: 'green' }}>
                {registerState?.success}
              </p>
            )}
            {/* EMAIL NOT FOUND! */}
            {registerState?.error && (
              <p style={{ fontSize: 13, color: 'red' }}>
                {registerState?.error}
              </p>
            )}

            <Button onClick={handleSubmit}>Sign Up</Button>

            <BottomNote
              note={'Already have an account?'}
              linkButton={'Sign in'}
              link={'login'}
            />
          </FormContainer>
          <SideImageComponent />
        </MainBodyContainer>
      </AuthContainer>
    </>
  )
}
