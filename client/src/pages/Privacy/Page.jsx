import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/shared/Header/Header'
import HomeLayout from '../../components/home/Layout'
import LeftSide from '../../components/home/Left/Left'
import RightSide from '../../components/home/Right/Right'
import Headings from '../../components/home/Right/Headings'

export default function PrivacyPage () {
  const [cookies] = useCookies([])
  const navigate = useNavigate()

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies['@authTokenExpense']) {
        navigate('/login')
      } else {
        // MAKE A REQUEST AND GET USER!
      }
    }
    verifyCookie()
  }, [cookies, navigate])

  return (
    <>
      <div
        style={{
          backgroundColor: '#151515',
          height: '100%',
          width: '100%',
          fontFamily: 'Urbanist',
          overflow: 'hidden'
        }}
      >
        {/* HEADER FOR ALL PAGES! */}
        <Header />

        {/* LAYOUT! */}
        <HomeLayout>
          {/* LEFT SIDE BAR! */}
          <LeftSide />

          {/* RIGHT SIDE BAR(TRANSACTION TABLE)! */}
          <>
            <Headings Heading={'Privacy Policy'} />

            <div style={{ marginTop: '20px' }}>
              <p
                style={{
                  lineHeight: '30px',
                  letterSpacing: '1px',
                  wordSpacing: '1px'
                }}
              >
                Thank you for choosing <b>ExpendiGenius Expense Tracker</b>.
                This privacy policy outlines how we collect, use, and protect
                your personal information. By using our service, you agree to
                the terms described herein.
              </p>
              <p
                style={{
                  marginTop: '7px',
                  lineHeight: '30px',
                  letterSpacing: '1px',
                  wordSpacing: '1px'
                }}
              >
                We collect user-provided information during account
                registration, including your name and email. Additional data may
                be gathered as you use features like expense tracking.
                Automatically collected information, such as IP addresses and
                device details, helps us improve your experience through cookies
                and similar technologies.
              </p>
              <p
                style={{
                  marginTop: '7px',

                  lineHeight: '30px',
                  letterSpacing: '1px',
                  wordSpacing: '1px'
                }}
              >
                Your information is used for providing and enhancing the
                service, sending important updates, and conducting analytics to
                improve our offerings. We do not sell your personal information,
                but may share it with trusted third-party service providers or
                when legally required.
              </p>

              <p
                style={{
                  marginTop: '7px',

                  lineHeight: '30px',
                  letterSpacing: '1px',
                  wordSpacing: '1px'
                }}
              >
                You have the choice to review and update your account
                information and communication preferences. We prioritize the
                security of your information and employ measures to prevent
                unauthorized access.
              </p>

              <p
                style={{
                  marginTop: '7px',

                  lineHeight: '30px',
                  letterSpacing: '1px',
                  wordSpacing: '1px'
                }}
              >
                Changes to this policy will be communicated through updates on
                our platform. For any questions, please contact us at {" "}
                <b>projectbase999@gmail.com</b>. Thank you for trusting
                ExpendiGenius.
              </p>
            </div>
          </>
        </HomeLayout>
      </div>
    </>
  )
}
