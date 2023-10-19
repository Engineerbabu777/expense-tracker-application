import '../../styles/auth/InputStyles.css'

export default function Input ({ placeholder, onChange, value, name, type }) {
  return (
    <>
      <input
        placeholder={placeholder}
        className='input-style' // USING STYLES FILE!
        name={name}
        value={value}
        onChange={onChange}
        type={type}
      />
      {/* ERROR MESSAGE! */}
    </>
  )
}
