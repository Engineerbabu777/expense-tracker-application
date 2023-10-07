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
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import jwt_decode from 'jwt-decode'
import { AuthContext } from '../../states/Auth'

export default function Register () {

  const {loadingState} = useContext(AuthContext)
  // HANDLE STATES!
  const [loginState, setLoginState] = useState({
    email: '',
    password: ''
  })

  // ONCHANGE STATE! (WILL PUSH TO UTILS)
  const onChangeStateHandler = event => {
    setLoginState({
      ...loginState, // SPREADING PREVIOUS STATE !
      [event.target.name]: event.target.value // CHANGING TARGETING VALUE !
    })
  }

  // HANDLE LOGIN!
  const handleLoginUser = () => {
    try {
      fetch('http://localhost:4444/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json'
        },
        body: JSON.stringify({
          email: loginState.email,
          password: loginState.password
        })
      }).then(response => {
        response.json().then(data => {
          // CHECK IF TOKEN EXISTS!
          if (data?.token) {
            localStorage.setItem('@authTokenExpense', data.token)
          }

          // const decodedData = jwt_decode(data?.token)

        })
      })
    } catch (error) {
      toast.error(`Login error: ${error.message}`)
      console.log('LOGIN ERROR- >', error?.message)
    }
  }

  if(loadingState){
    return 'loading...'
  }

  return (
    <>
      <AuthContainer>
        <Header link={'register'} title={'Sign up'} />

        <MainBodyContainer>
          <FormContainer>
            <TopHeadings
              heading1={'Sign in'}
              heading2={'Hey, Enter your details to login to your account'}
            />

            <Input
              placeholder={'Enter Your Email'}
              value={loginState.email}
              onChange={onChangeStateHandler}
              name={'email'}
              type={'email'}
            />
            <Input
              onChange={onChangeStateHandler}
              placeholder={'Enter Your Password'}
              value={loginState.password}
              name={'password'}
              type={'password'}
            />

            <Link
              to='/resetPassword'
              style={{
                width: '100%',
                textAlign: 'end',
                fontSize: '12px',
                color: '#AED6B3'
              }}
            >
              Forgot Password?
            </Link>

            <Button onClick={handleLoginUser}>Log In</Button>

            <BottomNote
              note={"Don't have an account?"}
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
