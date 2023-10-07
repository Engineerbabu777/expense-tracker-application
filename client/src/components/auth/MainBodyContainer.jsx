
import '../../styles/auth/AuthBodyContainerStyles.css';

export default function MainBodyContainer ({ children }) {
  return (
    <>
      <div className='auth-body-container'>
        <>{children[0]}</>

        <>{children[1]}</>
      </div>
    </>
  )
}
