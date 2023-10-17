import TextInputBox from './TextInputBox'
import '../../../styles/Homepage/settings/UserRightSide.css'
export default function UserRightSide ({ onChangeHandler, user }) {
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
          value={user.name}
        />

        {/* EMAIL! */}
        <TextInputBox
          label={'Email Address'}
          type='email'
          name='email'
          placeholder={'Your Email Address'}
          onChange={onChangeHandler}
          value={user.email}
        />

        {/* PASSWORD!(NOT DISPLAY) */}
        <TextInputBox
          label={'Account Password'}
          type='password'
          name='password'
          placeholder={'Your Account Password'}
          onChange={onChangeHandler}
          value={user.password}
        />

        {/* UPDATE SAVE BUTTON! */}
        <button type='button' className='button-styles'>
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
