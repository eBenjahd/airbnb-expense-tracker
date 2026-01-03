import ExpenseByMonthChart from "../dashboard/components/ExpenseByMonthChart"
import ExpenseByCategoryChart from "../dashboard/components/ExpenseByCategoryChart"
import Transactions from "../dashboard/components/Transactions"
import { useState } from "react"


export interface DateFilters {
  year: number
  month: number
  from: string // YYYY-MM
  to: string   // YYYY-MM
}

function Reports() {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1

  const [filters, setFilters] = useState<DateFilters>({
    year: currentYear,
    month: currentMonth,
    from: `${currentYear-1}-${String(currentMonth).padStart(2,'0')}`,
    to: `${currentYear}-${String(currentMonth).padStart(2,'0')}`,
  })

  return (
    <main>
      <h1>Reports</h1>

      <div style={{ display: "flex", gap: "1rem" }}>
        <div>
        <span>From: </span>
        <input
          type="month"
          value={filters.from}
          onChange={e =>
            setFilters(prev => ({ ...prev, from: e.target.value }))
          }
        />
        </div>
        <div>
          <span> to: </span>
          <input
            type="month"
            value={filters.to}
            onChange={e =>
              setFilters(prev => ({ ...prev, to: e.target.value }))
            }
          />
        </div>
      </div>
      <ExpenseByMonthChart
        from={filters.from}
        to={filters.to}
      />

      <input
        type="month"
        value={`${filters.year}-${String(filters.month).padStart(2, '0')}`}
        onChange={(e) => {
          const [y, m] = e.target.value.split('-').map(Number)
          setFilters(prev => ({
            ...prev,
            year: y,
            month: m,
          }))
        }}
      />

      <ExpenseByCategoryChart
        year={filters.year}
        month={filters.month}
      />

      <Transactions
        year={filters.year}
        month={filters.month}
        pageSize={10}
      />
    </main>
  )
}

export default Reports
