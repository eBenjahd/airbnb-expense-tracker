import { useExpenseSummaryByMonth } from "../../../hooks/useExpenseSummaryByMonth"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { formatMonthYear } from "../../../utils/dateFormatter"

export interface Props {
  from?: string
  to?: string
}

export interface MonthlyExpenseSummary {
  month: string
  total: number
}

function fillMissingMonths(data: MonthlyExpenseSummary[], from: string, to: string) : MonthlyExpenseSummary[] {
  const map = new Map<string, number>(
    data.map(d => [d.month.slice(0, 7), d.total])
  )

  const result = []

  let [startY, startM] = from.split('-').map(Number)
  let [endY, endM] = to.split('-').map(Number)

  while (startY < endY || (startY === endY && startM <= endM)) {
    const key = `${startY}-${String(startM).padStart(2, '0')}`

    result.push({
      month: key,
      total: map.get(key) ?? 0
    })

    startM++
    if (startM === 13) {
      startM = 1
      startY++
    }
  }

  return result
}

function ExpenseByMonthChart({from, to}: Props) {

    const {data, isLoading, error} = useExpenseSummaryByMonth({from, to})

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error al cargar los datos</p>;


    const FilledData = fillMissingMonths(data ?? [],from!, to!)
    const formattedData = FilledData?.map(item => ({
        month: formatMonthYear(item.month),
        total: item.total,
    }));

  return (
    <section>
        <h2>Expense over time</h2>

        <div style={{width : '100%'}}>
            <LineChart
            style= {{ width: '100%', maxHeight: '70vh', aspectRatio: 1.618 }}
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
