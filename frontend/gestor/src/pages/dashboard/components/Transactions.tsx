import { useState, useMemo } from "react"
import { useExpenseSummaryByCategory } from "../../../hooks/useExpenseSummaryByCategory"
import { formatMonthYear } from "../../../utils/dateFormatter"

export interface Props {
  year?: number
  month?: number
  pageSize?: number
  expandable?: boolean
}

const PAGE_SIZE = 5

function Transactions({ year, month, pageSize = PAGE_SIZE, expandable = true }: Props) {
  const { data = [], isLoading, error } =
    useExpenseSummaryByCategory({ year, month })

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const sortedTransactions = useMemo(() => {
    return [...data].sort(
      (a, b) =>
        new Date(b.period).getTime() -
        new Date(a.period).getTime()
    )
  }, [data])

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error al cargar los datos</p>
  
  const visibleTransactions = sortedTransactions.slice(0, visibleCount)

  const hasMore = visibleCount < sortedTransactions.length
  const hasTransactions = sortedTransactions.length > 0

  return (
    <section>
      <h2>Transactions</h2>

      {hasTransactions ? (
        visibleTransactions.map((spend) => (
          <div
            key={`${spend.period}-${spend.category__category_name}`}
          >
            <p>{formatMonthYear(spend.period)}</p>
            <p>{spend.category__category_name}</p>
            <p>{spend.total}</p>
          </div>
        ))
      ) : (
        <p>No transactions added for this month</p>
      )}

      {expandable && hasMore && (
        <button onClick={() => setVisibleCount(v => v + pageSize)}>
          Show more
        </button>
      )}
    </section>
  )
}

export default Transactions