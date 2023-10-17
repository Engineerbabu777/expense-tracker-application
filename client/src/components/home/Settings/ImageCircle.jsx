import { BsFillImageFill } from 'react-icons/bs'
import '../../../styles/Homepage/settings/shared/ImageCircle.css'

export default function ImageCircle ({ type = 'noEdit', imageSource, onClick }) {
  return (
    <>
      <div className={'outer-box '+(type==='noEdit' && ' none')}>
        <img
          className='image-sty'
          src={imageSource}
          alt='profile'
          style={{
            width: type === 'edit' ? '100%' : '90%',
            height: type === 'edit' ? '100%' : '90%',
            objectFit: 'fill'
          }}
        />
        {type === 'edit' && (
          <div className='edit-image-styles'>
            <label htmlFor='image' className='styles-label'>
              <BsFillImageFill size={24} color={'#898989'} />
            </label>
            <input type='file' name='image' id='image' hidden />
          </div>
        )}
      </div>
    </>
  )
}
