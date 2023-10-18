
import '../../../styles/Homepage/settings/shared/TextInputBox.css';

export default function TextInputBox ({
  type,
  text,
  label,
  placeholder,
  name,
  value,
  onChange,
  disabled=true,
}) {
  return (
    <>
      <div className='main-container'>
        <label for='name' className='label-style'>
          {label}
        </label>
        <input
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          value={value}
          type={type}
          id={name}
          className='input-styles'
          disabled
        />
      </div>
    </>
  )
}
