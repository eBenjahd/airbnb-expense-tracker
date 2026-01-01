import Summary from './components/Summary'
import ExpenseByCategoryChart from './components/ExpenseByCategoryChart'
import Transactions from './components/Transactions'
import ExpenseByMonthChart from './components/ExpenseByMonthChart'

function Dashboard() {

    const now = new Date()

    const year = now.getFullYear()

    const currentMonth = now.getMonth() + 1 
    const previousMonth = currentMonth === 1 ? 11 : currentMonth - 1
    const fromYear = currentMonth === 1 ? year - 1 : year

    const from = `${fromYear}-${String(previousMonth).padStart(2, '0')}`
    const to = `${year}-${String(currentMonth).padStart(2, '0')}`

  return (
    <main>

      <h1> Dashboard </h1>

      <Summary />

      <ExpenseByCategoryChart year={year} month={currentMonth} />

      <Transactions />

      <ExpenseByMonthChart from={from} to={to}/>
    </main>
  )
}

export default Dashboard
