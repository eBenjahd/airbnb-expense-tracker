import { useExpenseSummaryDashboard } from "../../../hooks/useExpenseSummaryDashboard";

function Summary() {
  const currentYear = new Date().getFullYear().toString();
  const currentMonth = (new Date().getMonth() + 1).toString();

  const { data, isLoading, error } = useExpenseSummaryDashboard({
    year: currentYear,
    month: currentMonth,
  });

  if (isLoading) return <p>Loading summary...</p>;
  if (error) return <p>Error loading summary</p>;
  if (!data) return <p>No data available</p>;

  return (
    <div>
      <div>
        <p>Total Expenses</p>
        <p>${data.year_total}</p>
      </div>

      <div>
        <p>Expenses This Month</p>
        <p>${data.month_total}</p>
      </div>

      <div>
        <p>Average Expense</p>
        <p>${data.average_expense}</p>
      </div>
    </div>
  );
}

export default Summary;