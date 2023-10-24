import PulseLoader from 'react-spinners/PulseLoader'

export default function Loading ({}) {
  return (
    <>
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <PulseLoader color='rgb(110, 56, 224)' size={42} />
      </div>
    </>
  )
}
