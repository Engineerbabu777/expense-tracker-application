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
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useCookies } from 'react-cookie'

export default function Register () {
  const navigate = useNavigate()
  const [cookies, setCookie] = useCookies(['@authTokenExpense'])

  // HANDLE STATES!
  const [loginState, setLoginState] = useState({
    email: '',
    password: '',
    success: '',
    error: '',
    loading:false,
  })

  // ONCHANGE STATE! (WILL PUSH TO UTILS)
  const onChangeStateHandler = event => {
    setLoginState({
      ...loginState, // SPREADING PREVIOUS STATE !
      success: '',
      error: '',
      [event.target.name]: event.target.value // CHANGING TARGETING VALUE !
    })
  }

  // HANDLE LOGIN!
  const handleLoginUser = () => {
    try {
      // CHECK IF STATES ARE NOT EMPTY!
      if (!loginState.email || !loginState.password) {
        toast.error('Please fill all fields')
        return
      }

    setLoginState({...loginState, loading: true})

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
            setCookie('authTokenExpense', data.token)
            toast.success('Login Successful!')
            navigate('/')
          }
          if (data?.error) {
            setLoginState({ ...loginState, error: data?.message })
          }
        })
      })
    } catch (error) {
      toast.error(`Login error: ${error.message}`)
      console.log('LOGIN ERROR- >', error?.message)
    }
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
              disabled={loginState.loading}
            />
            <Input
              onChange={onChangeStateHandler}
              placeholder={'Enter Your Password'}
              value={loginState.password}
              name={'password'}
              type={'password'}
              disabled={loginState.loading}
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

            {/* NOTE ERROR STATE */}
            {loginState?.error && (
              <p style={{ fontSize: 13, color: 'red' }}>{loginState?.error}</p>
            )}

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
