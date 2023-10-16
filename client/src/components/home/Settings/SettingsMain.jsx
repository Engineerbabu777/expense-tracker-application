import { BiEdit } from 'react-icons/bi'
import { BsFillImageFill } from 'react-icons/bs'

export default function SettingsMain () {
  return (
    <>
      {/* WILL BE IN TWO PARTS! (COLUMNS UPPER FOR USER SETTINGS AND LOWER FOR ACCOUNT SETTINGS!) */}
      <section
        style={{
          margin: '2% 2% 0% 1%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* TWO PARTS! */}

        <>
          {/* USER SETTINGS! */}
          <div style={{}}>
            {/* !!SECTION HEADINGS! */}
            <h2
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              User Settings
              <span
                style={{
                  backgroundColor: '#272829',
                  color: '#898989',
                  width: 30,
                  height: 30,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 15,
                  cursor: 'pointer'
                }}
              >
                <BiEdit size={20} />
              </span>
            </h2>

            {/* SETTINGS! */}
            <div
              style={{
                marginTop: '20px',
                display: 'flex',
                gap: 60,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* IMAGE */}
              <div
                style={{
                  width: '200px',
                  height: '200px',
                  backgroundColor: '#64EE',
                  borderRadius: 100,
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <img
                  src={
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/800px-Elon_Musk_Royal_Society_%28crop2%29.jpg'
                  }
                  alt='profile'
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'fill'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '30%',
                    width: '100%',
                    textAlign: 'center',
                    backgroundColor: '#272829',
                    opacity: 0.75,
                    cursor: 'pointer'
                  }}
                >
                  <label
                    htmlFor='image'
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <BsFillImageFill size={24} color={'#898989'} />
                  </label>
                  <input type='file' name='image' id='image' hidden />
                </div>
              </div>
              <div
                className=''
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  gap: 15
                }}
              >
                {/* NAME! */}

                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <label
                    for='name'
                    style={{
                      display: 'flex',
                      gap: 10,
                      alignItems: 'center',
                      fontWeight: '600',
                      fontSize: '1.2rem'
                    }}
                  >
                    Display Name
                  </label>
                  <input
                    placeholder='Your Name'
                    name='name'
                    value='John Doe'
                    id='name'
                    style={{
                      flex: 1,
                      padding: '9px 17px',
                      borderRadius: 10,
                      outline: 'none',
                      border: 'none',
                      backgroundColor: '#272829',
                      color: '#898989'
                    }}
                  />
                </div>

                {/* #898989 */}
                {/* #272829 */}

                {/* EMAIL! */}

                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <label
                    for='name'
                    style={{
                      display: 'flex',
                      gap: 10,
                      alignItems: 'center',
                      fontWeight: '600',
                      fontSize: '1.2rem'
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    placeholder='Your Email'
                    name='email'
                    value='jhondoe0067@gmail.com'
                    style={{
                      flex: 1,
                      padding: '9px 17px',
                      borderRadius: 10,
                      outline: 'none',
                      border: 'none',
                      backgroundColor: '#272829',
                      color: '#898989'
                    }}
                  />
                </div>

                {/* PASSWORD!(NOT DISPLAY) */}

                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <label
                    for='password'
                    style={{
                      display: 'flex',
                      gap: 10,
                      alignItems: 'center',
                      fontWeight: '600',
                      fontSize: '1.2rem'
                    }}
                  >
                    Account Password
                  </label>
                  <input
                    placeholder='Your Password'
                    name='password'
                    value='--- - --- -- --- - --- --'
                    style={{
                      flex: 1,
                      padding: '9px 17px',
                      borderRadius: 10,
                      outline: 'none',
                      border: 'none',
                      backgroundColor: '#272829',
                      color: '#898989'
                    }}
                  />
                </div>
                {/* UPDATE SAVE BUTTON! */}
                <button
                  type='button'
                  style={{
                    height: '32px',
                    fontWeight: '900',
                    background: 'linear-gradient(to right, #6E38E0, #FF5F36)',
                    outline: 'none',
                    border: '1px solid #272829',
                    borderRadius: '10px',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                >
                  Save Profile
                </button>
                <p
                  style={{
                    fontWeight: '.85rem',
                    marginTop: -8,
                    color: '#898989'
                  }}
                >
                  <span style={{ color: 'white', paddingRight: '3px' }}>
                    Note :
                  </span>{' '}
                  Before saving/updating info also enter your password.
                </p>
              </div>
            </div>
          </div>

          {/* ACCOUNT SETTINGS! */}
          <div
            style={{
              marginTop: '20px',
              borderTop: '1px solid #898989',
              paddingTop: '10px'
            }}
          >
            {/* HEADING SECTION */}
            <h2 style={{}}>Account Settings</h2>
            <div
              style={{
                marginTop: '20px',
                display: 'flex',
                gap: 60,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* IMAGE */}
              <div
                style={{
                  width: '200px',
                  height: '200px',
                  backgroundColor: '#272829',
                  borderRadius: 100,
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <img
                  src={'/settings.png'}
                  alt='profile'
                  style={{
                    width: '90%',
                    height: '90%'
                    // objectFit: 'fill'
                  }}
                />
              </div>

              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10
                }}
              >
                {/* DEACTIVATE ACCOUNT!! */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 5
                  }}
                >
                  <div
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <label
                      for='password'
                      style={{
                        display: 'flex',
                        gap: 10,
                        alignItems: 'center',
                        fontWeight: '600',
                        fontSize: '1.2rem',
                        flex:1,

                      }}
                    >
                      De-Activate Account ?
                    </label>
                    <button
                      style={{
                        flex: 1,
                        height: '32px',
                        backgroundColor: '#FF5F36',
                        color: 'white',
                        border: 'none',
                        outline: 'none',
                        borderRadius: 5,
                        fontWeight: '700',
                        opacity: 0.6,
                        
                      }}
                    >
                      DEACTIVATE NOW
                    </button>
                  </div>
                  <p
                    style={{
                      fontWeight: '.85rem',
                      // marginTop: -8,
                      color: '#898989'
                    }}
                  >
                    <span style={{ color: 'white', paddingRight: '3px' }}>
                      Note :
                    </span>{' '}
                    After clicking you will get an email of deactivating account
                    & can activate account with in 30 days.
                  </p>
                </div>

                {/* DELETE ALL DATA! */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 5
                  }}
                >
                  <div
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <label
                      for='password'
                      style={{
                        display: 'flex',
                        gap: 10,
                        alignItems: 'center',
                        fontWeight: '600',
                        fontSize: '1.2rem',
                        flex:1,

                      }}
                    >
                      Delete all account data ?
                    </label>
                    <button
                      style={{
                        flex: 1,
                        height: '32px',
                        backgroundColor: '#952323',
                        color: 'white',
                        border: 'none',
                        outline: 'none',
                        borderRadius: 5,
                        fontWeight: '700',
                        opacity: 0.6
                      }}
                    >
                      DELETE ALL DATA
                    </button>
                  </div>
                  <p
                    style={{
                      fontWeight: '.85rem',
                      // marginTop: -8,
                      color: '#898989'
                    }}
                  >
                    <span style={{ color: 'white', paddingRight: '3px' }}>
                      Note :
                    </span>{' '}
                    All data records will be deleted from our database and you
                    won't be able to access it again.
                  </p>
                </div>

                {/* DELETE ACCOUNT! */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10
                  }}
                >
                  <div
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <label
                      for='password'
                      style={{
                        display: 'flex',
                        gap: 10,
                        alignItems: 'center',
                        fontWeight: '600',
                        fontSize: '1.2rem',
                        flex:1,
                      }}
                    >
                      Delete Account ?
                    </label>
                    <button
                      style={{
                        flex: 1,
                        height: '32px',
                        backgroundColor: '#D80032',
                        color: 'white',
                        border: 'none',
                        outline: 'none',
                        borderRadius: 5,
                        fontWeight: '700',
                        opacity: 0.8
                      }}
                    >
                      DELETE ACCOUNT
                    </button>
                  </div>
                  <p
                    style={{
                      fontWeight: '.85rem',
                      // marginTop: -8,
                      color: '#898989'
                    }}
                  >
                    <span style={{ color: 'white', paddingRight: '3px' }}>
                      Note :
                    </span>{' '}
                    All of your account and data will be deleted.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      </section>
    </>
  )
}
