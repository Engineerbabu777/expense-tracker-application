import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/shared/Header/Header'

export default function HomePage () {
  const [cookies] = useCookies([])
  const navigate = useNavigate()

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.authTokenExpense) {
        navigate('/login')
      } else {
        // MAKE A REQUEST AND GET USER!
      }
    }
    verifyCookie()
  }, [cookies, navigate])

  return (
    <>
      <div style={{backgroundColor:'#151515',height:'100vh',width:'100%',fontFamily:'Urbanist'}}>
        {/* HEADER FOR ALL PAGES! */}
        <Header />

        {/* LAYOUT! */}
      </div>
    </>
  )
}
