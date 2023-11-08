import TextInputBox from './TextInputBox'
import '../../../styles/Homepage/settings/UserRightSide.css'
import useUser from '../../../hooks/useUser'
import { useContext, useEffect } from 'react'
import { AllContext } from '../../../states/ContextProvider'
import { useCookies } from 'react-cookie'
export default function UserRightSide ({ onChangeHandler, name,email,password, disabled,onSubmitHandler }) {
  const { updateUser, getCurrentUser } = useUser()
  const { currentUser, loadingUser } = useContext(AllContext)
  // GET CURRENT USER FROM CONTEXT !!
  const [cookies] = useCookies(['@authTokenExpense'])


  console.log(currentUser)

  return (
    <>
      <div className='parent-container'>
        {/* NAME! */}
        <TextInputBox
          label={'Display Name'}
          type='text'
          name='name'
          placeholder={'Your Display Name'}
          onChange={onChangeHandler}
          value={name}
          disabled={disabled}
        />

        {/* EMAIL! */}
        <TextInputBox
          label={'Email Address'}
          type='email'
          name='email'
          placeholder={'Your Email Address'}
          onChange={onChangeHandler}
          value={email}
          disabled={disabled}
        />

        {/* PASSWORD!(NOT DISPLAY) */}
        <TextInputBox
          label={'Account Password'}
          type='password'
          name='password'
          placeholder={'Your Account Password'}
          onChange={onChangeHandler}
          value={password}
          disabled={disabled}
        />

        {/* UPDATE SAVE BUTTON! */}
        <button type='button' className='button-styles' onClick={onSubmitHandler}>
          Save Profile
        </button>
        <p className='note-styles-container'>
          <span className='note-styles-container-text'>Note :</span> Before
          saving/updating info also enter your password.
        </p>
      </div>
    </>
  )
}
