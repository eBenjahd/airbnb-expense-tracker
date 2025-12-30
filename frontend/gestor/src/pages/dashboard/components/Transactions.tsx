import { useExpenseSummaryByCategory } from "../../../hooks/useExpenseSummaryByCategory"
import { formatMonthYear } from '../../../utils/dateFormatter'

function Transactions() {

    const { data, isLoading, error } = useExpenseSummaryByCategory()

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error al cargar los datos</p>;

    const displayData = data?.slice().sort((a, b) => new Date(b.period!).getTime() - new Date(a.period!).getTime())
    .slice(0, 5);

  return (
    <section>
        <h2>Transactions</h2>
      {displayData && displayData.map((spend, index) => (
        <div key={index}>
            <p>{formatMonthYear(spend.period!)}</p>
            <p>{spend.category__category_name}</p>
            <p>{spend.total}</p>
        </div>
      ))}
    </section>
  )
}

export default Transactions
