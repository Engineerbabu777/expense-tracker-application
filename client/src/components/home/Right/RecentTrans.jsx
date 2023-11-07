import '../../../styles/Homepage/Right/RightSideMain.css'
import '../../../styles/Homepage/Right/TableStyles.css'
import Row from '../Transactions/ModalBodys/components/Row'
export default function Table ({data}) {
  return (
    <>
      <section className='table-container-parent'>
        {/* BOX THAT CONTAINS TABLE */}
        {/* TABLE */}
        <table className='table-home-page'>
          <thead className='table-header'>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Type</th>
            <th>Date</th>
          </thead>
          <tbody className='table-body'>
            {data?.map((t, i) => (
              <>
                <Row t={t} i={i} />
              </>
            ))}
          </tbody>
        </table>
      </section>
    </>
  )
}
