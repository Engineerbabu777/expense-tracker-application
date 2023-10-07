export default function TopHeadings ({ heading1, heading2, heading3 }) {
  return (
    <>
      {/* HEADING! */}
      <h1
        style={{
          fontSize: '22px',
          fontWeight: '700',
          textAlign: 'center'
        }}
      >
        {heading1}
      </h1>

      {/* SMALL TEXT! */}
      <h2
        style={{
          fontSize: '14px',
          textAlign: 'center',
          marginBottom: '10px',
          fontWeight: '500',
          width: '240px'
        }}
      >
        {heading2}
      </h2>

      {/*  */}
      {heading3 && (
        <>
          <h2
            style={{
              fontSize: '14px',
              textAlign: 'center',
              marginBottom: '10px',
              fontWeight: '500',
            }}
          >
            {heading3}
          </h2>
        </>
      )}
    </>
  )
}
