import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export default function HomePage () {

  const [cookies] = useCookies([])
  const navigate = useNavigate()

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.authTokenExpense) {
        navigate('/login')
      }
    }
    verifyCookie()
  }, [cookies, navigate])



  return <div>Home page</div>
}
