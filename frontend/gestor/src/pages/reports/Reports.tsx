import ExpenseByMonthChart from "../dashboard/components/ExpenseByMonthChart"
import ExpenseByCategoryChart from "../dashboard/components/ExpenseByCategoryChart"
import Transactions from "../dashboard/components/Transactions"
import { useState } from "react"

function Reports() {

  const now = new Date()

  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth() + 1)

  const [from, setFrom] = useState(`${year}-01`)
  const [to, setTo] = useState(`${year}-12`)

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [y, m] = e.target.value.split("-")
    setYear(Number(y))
    setMonth(Number(m))
  }

  return (
    <main>
      <h1>Reports</h1>

      <input
        type="month"
        onChange={handleMonthChange}
        defaultValue={`${year}-${String(month).padStart(2, "0")}`}
      />

      <ExpenseByCategoryChart year={year} month={month} />

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <label>
          Start date:
          <input
            type="month"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </label>

        <label>
          End date:
          <input
            type="month"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </label>
      </div>
      <ExpenseByMonthChart from={from} to={to}/>
      <Transactions />
    </main>
  )
}

export default Reports
