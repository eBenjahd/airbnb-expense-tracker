import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { cardStyles } from './styles/styles';
import {COLORS }from './styles/colors';
import { useSummaryCategorybyMonth } from "../../../hooks/useSummaryCategorybyMonth";

// MAKE IT MORE REACT WAY LATER

export default function ExpenseByCategoryChart() {

  const { data, isLoading, error } = useSummaryCategorybyMonth();

  const chartData = data
    ? data.map((item) => ({
        name: item.category__category_name,
        value: item.total,
      }))
    : [];

  const totalSpent = chartData.reduce(
    (acc, item) => acc + item.value,
    0
  );

  if (isLoading) return <p>Cargando datos...</p>;
  if (error) return <p>Error al cargar los datos</p>;

  return (
    <section style={cardStyles.card}>
      <h3 style={cardStyles.title}>Budgets</h3>

      <div style={cardStyles.content}>
        {/* DONUT */}
        <div style={cardStyles.chartWrapper}>
          <div style={cardStyles.centerText}>
            <div style={cardStyles.amount}>
              S/ {totalSpent.toFixed(0)}
            </div>
            <div style={cardStyles.subtitle}>Total spent</div>
          </div>

          <ResponsiveContainer width={240} height={240}>
            <PieChart>
              {/* 🔹 ANILLO INTERNO (mismo color, más adentro) */}
              <Pie
                data={chartData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={64}
                outerRadius={78}
                stroke="none"
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={`inner-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    opacity={0.7}
                  />
                ))}
              </Pie>

              {/* 🔹 ANILLO EXTERNO (principal) */}
              <Pie
                data={chartData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={78}
                outerRadius={98}
                stroke="none"
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={`outer-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* LISTA DE CATEGORÍAS */}
        <div style={cardStyles.legend}>
          {chartData.map((item, index) => (
            <div key={item.name} style={cardStyles.legendItem}>
              <span
                style={{
                  ...cardStyles.colorDot,
                  backgroundColor:
                    COLORS[index % COLORS.length],
                }}
              />
              <span style={cardStyles.legendName}>{item.name}</span>
              <span style={cardStyles.legendValue}>
                S/ {item.value.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}