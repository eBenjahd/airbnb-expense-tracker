import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
  } from "recharts";
  import { useExpenseSummaryByCategory } from "../../../hooks/useExpenseSummaryByCategory";
  
  export default function ExpenseByCategoryChart() {
    const { data, isLoading, error } = useExpenseSummaryByCategory();
  
    // Transformar los datos para el gráfico
    const formattedData = data
      ? data.map((item) => ({
          category: item.category__category_name,
          amount: item.total,
        }))
      : [];
  
    if (isLoading) return <p> Cargando datos...</p>;
    if (error) return <p> Error al cargar los datos</p>;
  
    return (
        <div
        style={{
          width: "100%",
          height: "300px", 
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "16px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>
          Gastos por categoría
        </h2>
      
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={formattedData}
            layout="vertical"
            margin={{ top: 10, right: 20, left: 60, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
            <XAxis type="number" />
            <YAxis type="category" dataKey="category" width={100} />
            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.05)" }}
              formatter={(value: number) => [`S/ ${value.toFixed(2)}`, "Monto"]}
            />
            <Bar
              dataKey="amount"
              fill="#3B82F6"
              radius={[4, 4, 4, 4]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }