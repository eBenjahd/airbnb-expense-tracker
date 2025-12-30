import { useExpenseSummaryByMonth } from "../../../hooks/useExpenseSummaryByMonth"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { formatMonthYear } from "../../../utils/dateFormatter"

function ExpenseByMonthChart() {

    const {data, isLoading, error} = useExpenseSummaryByMonth()

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error al cargar los datos</p>;

    const formattedData = data?.map(item => ({
        month: formatMonthYear(item.month),
        total: item.total,
    }));

  return (
    <section>
        <h2>Expense over time</h2>

        <div style={{width : '100%'}}>
            <LineChart
            style= {{ width: '100%', maxWidth: '300px', maxHeight: '70vh', aspectRatio: 1.618 }}
            responsive
            data={formattedData}
            margin={{
              top: 20,
              right: 0,
              left: 0,
              bottom: 0,
            }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis width="auto" />
            <Tooltip />

            <Line
            type="monotone"
            dataKey="total"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            />

            </LineChart>
        </div>
      
    </section>
  )
}

export default ExpenseByMonthChart
