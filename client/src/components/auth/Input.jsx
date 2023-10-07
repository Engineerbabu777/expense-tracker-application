import '../../styles/auth/InputStyles.css'

export default function Input ({ placeholder, onChange, value, name, type }) {
  return (
    <>
      <input
        placeholder={placeholder}
        className='input-styles' // USING STYLES FILE!
        name={name}
        value={value}
        onChange={onChange}
        type={type}
      />
      {/* ERROR MESSAGE! */}
      {/* <p style={{textAlign:'start',width:'100%',color:'red',fontSize:'0.8rem'}}>**email is already present</p> */}
    </>
  )
}
