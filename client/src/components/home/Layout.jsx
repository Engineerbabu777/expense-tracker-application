import '../../styles/Homepage/Layout/Layout.css'

type Props = {
  children: React.ReactNode
}
export default function HomeLayout ({ children }: Props) {
  return (
    <>
      <div className='home-layout-container'>
        {/* QUERIES lg: () xl:() 2xl: */}
        <div className='home-layout-sidebar'>{children[0]}</div>

        <div className='home-layout-main'>{children[1]}</div>
      </div>
    </>
  )
}
