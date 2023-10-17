
import '../../../../styles/Homepage/settings/shared/Button.css'


export default function Button({ buttonText, type }) {


  return (
    <>
      <button className={`
      all-styles
      ${type === 'DEACTIVATE' && "deactivate-account-styles"}
      ${type === 'DELETE' && "delete-button-styles"}
      ${type === 'DATA' && "delete-data-styles"}
      `}>{buttonText}</button>
    </>
  )
}
