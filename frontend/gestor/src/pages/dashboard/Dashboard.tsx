import Summary from './components/Summary'
import ExpenseByCategoryChart from './components/ExpenseByCategoryChart'
import Transactions from './components/Transactions'
import ExpenseByMonthChart from './components/ExpenseByMonthChart'

function Dashboard() {
  return (
    <main>

      <h1> Dashboard </h1>

      <Summary />

      <ExpenseByCategoryChart />

      <Transactions />

      <ExpenseByMonthChart />
    </main>
  )
}

export default Dashboard
