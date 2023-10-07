import { Link } from 'react-router-dom'

export default function BottomNote ({linkButton,note,link}) {
  return (
    <>
      <div
        style={{
          display: 'flex',
          gap: '5px',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          marginTop: '10px'
        }}
      >
        <p>{note}</p>
        <Link
          to={'/'+link}
          style={{
            fontWeight: '700',
            textDecoration: 'none',
            color: 'black'
          }}
        >
          {linkButton}
        </Link>
      </div>
    </>
  )
}
