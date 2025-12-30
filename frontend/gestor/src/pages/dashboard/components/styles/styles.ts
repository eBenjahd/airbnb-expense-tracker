import { type CSSProperties } from "react";

export const cardStyles: Record<string, CSSProperties> = {
  card: {
    background: "#fff",
    borderRadius: 16,
    padding: 20,
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    width: "100%",
  },
  title: { marginBottom: 16, fontWeight: 600 },
  content: { display: "flex", gap: 24, alignItems: "center" },
  chartWrapper: { position: "relative", width: 240, height: 240 },
  centerText: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    zIndex: 10,
  },
  amount: { fontSize: 32, fontWeight: 700 },
  subtitle: { fontSize: 13, color: "#6B7280" },
  legend: { display: "flex", flexDirection: "column", gap: 12, minWidth: 180 },
  legendItem: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 },
  colorDot: { width: 10, height: 10, borderRadius: "50%" },
  legendName: { flex: 1, fontSize: 14, color: "#374151" },
  legendValue: { fontSize: 14, fontWeight: 500 },
};