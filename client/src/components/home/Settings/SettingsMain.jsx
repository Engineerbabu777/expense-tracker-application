import { useContext, useEffect, useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import UserRightSide from './UserRightSide'
import ImageCircle from './ImageCircle'
import AccountTextButtons from './AccountTextButtons'
import SettingsSectionContainer from './shared/SettingsSectionContainer'
import '../../../styles/Homepage/settings/Main.css'
import { GiCancel } from 'react-icons/gi'
import useUser from '../../../hooks/useUser'
import { AllContext } from '../../../states/ContextProvider'
import { useCookies } from 'react-cookie'

export default function SettingsMain () {
  const {
    updateUser,
    getCurrentUser,
    deleteUserData,
    deleteUserAccount,
    deActivateUserAccount
  } = useUser()
  const { currentUser, loadingUser } = useContext(AllContext)
  // FOR HANDLING EDIT MODE!
  const [isEditMode, setIsEditMode] = useState(false)
  const [cookies] = useCookies() // MANAGING COOKIES!

  // GET DATA IF TOKEN IS AVAILABLE!
  useEffect(() => {
    const verifyCookie = async () => {
      if (cookies['@authTokenExpense']) {
        await getCurrentUser()
      }
    }
    verifyCookie()
  }, [cookies])

  // WHEN DATA GOT FETCHED CHANGES THE STATES!
  useEffect(() => {
    if (currentUser) {
      setUser({
        name: currentUser?.name,
        email: currentUser?.email,
        password: '---',
        image: currentUser?.image
      })
    }
  }, [loadingUser, currentUser?.email])

  // HANDLING THE INPUT STATES!!
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '---',
    image: ''
  })

  // ONCHANGE HANDLER !!
  const onChangeHandler = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  }

  // RESET TO DEFAULT!
  const onCancelHandler = () => {
    setUser({
      name: currentUser?.name,
      email: currentUser?.email,
      image: currentUser?.image
    })
  }

  // HANDLE USER UPDATE!
  const onSubmitHandler = async () => {
    await updateUser(user)
  }

  // DELETE ACCOUNT HANDLER!
  const onDeleteAccount = () => {}
  // DELETE DATA HANDLER!
  const onDeleteDataHandler = () => {}
  // DEACTIVATE HANDLER FUNCTION!
  const onDeActivateAccount = () => {}

  return (
    <>
      {/* WILL BE IN TWO PARTS! (COLUMNS UPPER FOR USER SETTINGS AND LOWER FOR ACCOUNT SETTINGS!) */}
      <section className='main-side-styles'>
        {/* TWO PARTS! */}

        {!loadingUser && (
          <>
            {/* USER SETTINGS! */}
            <div className='main-user-settings-styles'>
              {/* !!SECTION HEADINGS! */}
              <h2
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
                className='settings-headings'
              >
                User Settings
                {/* OPEN EDIT MODE */}
                {!isEditMode && (
                  <span
                    className={'edit-styles-button-mode-on'}
                    onClick={() => setIsEditMode(!isEditMode)}
                  >
                    <BiEdit size={20} />
                  </span>
                )}
                {/* CANCEL! */}
                {isEditMode && (
                  <span
                    className={'cancel-styles-button'}
                    onClick={() => {
                      onCancelHandler()
                      setIsEditMode(!isEditMode)
                    }}
                  >
                    <GiCancel size={20} />
                  </span>
                )}
              </h2>

              {/* SETTINGS CONTAINER! */}
              <SettingsSectionContainer>
                <>
                  {/* IMAGE - CIRCLE */}
                  <ImageCircle
                    imageSource={
                      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/800px-Elon_Musk_Royal_Society_%28crop2%29.jpg'
                    }
                    type='edit'
                  />
                  {/* PARENT RIGHT OF USER SETTINGS */}
                  <UserRightSide
                    onChangeHandler={onChangeHandler}
                    name={user?.name}
                    email={user?.email}
                    password={user?.password}
                    disabled={!isEditMode}
                    onSubmitHandler={onSubmitHandler}
                  />
                </>
              </SettingsSectionContainer>
            </div>

            {/* ACCOUNT SETTINGS! */}
            <div className='account-container-styles'>
              {/* HEADING SECTION */}
              <h2 className='settings-headings'>Account Settings</h2>
              <SettingsSectionContainer>
                <>
                  {/* IMAGE */}
                  <ImageCircle imageSource={'/settings.png'} />

                  <div className='account-buttons-containers'>
                    {/* DEACTIVATE ACCOUNT!! */}
                    <AccountTextButtons
                      heading={'De-Activate Account ?'}
                      onClick={async () => {
                        await deActivateUserAccount()
                      }}
                      note={
                        'After clicking you will get an email of deactivating account & can activate account with in 30 days.'
                      }
                      buttonText={'DEACTIVATE NOW'}
                      type='DEACTIVATE'
                    />

                    {/* DELETE ALL DATA! */}
                    <AccountTextButtons
                      onClick={async () => {
                        await deleteUserData()
                      }}
                      heading={'Delete all account data ?'}
                      note={
                        "All data records will be deleted from our database and you won't be able to access it again."
                      }
                      buttonText={'DELETE ALL DATA'}
                      type='DATA'
                    />

                    {/* DELETE ACCOUNT! */}
                    <AccountTextButtons
                      heading={'Delete Account ?'}
                      note={'All of your account and data will be deleted.'}
                      buttonText={'DELETE ACCOUNT'}
                      type='DELETE'
                      onClick={async () => {
                        await deleteUserAccount()
                      }}
                    />
                  </div>
                </>
              </SettingsSectionContainer>
            </div>
          </>
        )}
      </section>
    </>
  )
}
