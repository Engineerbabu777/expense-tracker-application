import { useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import UserRightSide from './UserRightSide'
import ImageCircle from './ImageCircle'
import AccountTextButtons from './AccountTextButtons'
import SettingsSectionContainer from './shared/SettingsSectionContainer'
import '../../../styles/Homepage/settings/Main.css'

export default function SettingsMain () {
  const [user, setUser] = useState({
    name: 'Elon Musk',
    email: 'elonmuskx99@gmail.com',
    password: '--- -- --- - ---',
    image: ''
  })

  const [isEditMode, setIsEditMode] = useState('')

  // ONCHANGE HANDLER !!
  const onChangeHandler = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  }

  const onSubmitHandler = () => {
    // CHECK IF PASSWORD IS NOT AVAILABLE!
    // MATCH THE PASSWORD OF USER!
    // ELSE CHECK FOR VALIDATIONS!
    // MAKE A API REQUEST AND SAVE/UPDATE THE NEW DATA!
  }

  // DELETE ACCOUNT HANDLER!
  const onDeleteAccount = () => {}
  // DELETE DATA HANDLER!
  const onDeleteDataHandler = () => {}
  // DEACTIVATE HANDLER FUNCTION!
  const onDeActivateAccount = () => {}

  // TOMORROW TODOS!
  // MAKE REUSEABLE COMPONENTS !
  // BUTTONS! BELLOW THREE!
  // INPUTS ABOVE!
  // THE FILE SHORTER BY DIVIDING BOTH SECTIONS INTO DIFFER FILES!
  // MAKE TRANSACTIONS PAGE RESPONSIVE!
  // MAKE ACCOUNT PAGE RESPONSIVE!

  return (
    <>
      {/* WILL BE IN TWO PARTS! (COLUMNS UPPER FOR USER SETTINGS AND LOWER FOR ACCOUNT SETTINGS!) */}
      <section className='main-side-styles'>
        {/* TWO PARTS! */}

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
              <span className='edit-styles-button'>
                <BiEdit size={20} />
              </span>
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
                <UserRightSide onChangeHandler={onChangeHandler} user={user} />
              </>
            </SettingsSectionContainer>
          </div>

          {/* ACCOUNT SETTINGS! */}
          <div className='account-container-styles'>
            {/* HEADING SECTION */}
            <h2 className="settings-headings">Account Settings</h2>
            <SettingsSectionContainer>
              <>
                {/* IMAGE */}
                <ImageCircle imageSource={'/settings.png'} />

                <div className='account-buttons-containers'>
                  {/* DEACTIVATE ACCOUNT!! */}
                  <AccountTextButtons
                    heading={'De-Activate Account ?'}
                    note={
                      'After clicking you will get an email of deactivating account & can activate account with in 30 days.'
                    }
                    buttonText={'DEACTIVATE NOW'}
                    type='DEACTIVATE'
                  />

                  {/* DELETE ALL DATA! */}
                  <AccountTextButtons
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
                  />
                </div>
              </>
            </SettingsSectionContainer>
          </div>
        </>
      </section>
    </>
  )
}
