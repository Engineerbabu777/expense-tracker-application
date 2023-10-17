import Button from './shared/Button'
import '../../../styles/Homepage/settings/shared/AccountBoxes.css';

export default function AccountTextButtons ({
  heading,
  note,
  buttonText,
  buttonHandler,
  type
}) {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
          borderTop: type !== 'DEACTIVATE' && '1px solid #898989',
          paddingTop: type !== 'DEACTIVATE' && '10px',
        }}
      >
        <div className="label-button-container">
          <label
           className='label-styles'
          >
            {heading}
          </label>
          <Button buttonText={buttonText} type={type} />
        </div>
        <p
         className='para-styles'
        >
          <span className='note-styles'>Note :</span>{' '}
          {note}
        </p>
      </div>
    </>
  )
}
