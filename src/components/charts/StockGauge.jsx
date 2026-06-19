import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { chartPalette } from "@/constants/theme";

export function StockGauge({ value = 0, label = "Stock level" }) {
  const safeValue = Math.min(Math.max(Number(value), 0), 100);
  const tone = safeValue < 25 ? chartPalette.danger : safeValue < 50 ? chartPalette.warning : chartPalette.success;
  const data = [{ name: "value", value: safeValue }, { name: "rest", value: 100 - safeValue }];

  return (
    <div className="relative h-52">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" startAngle={180} endAngle={0} innerRadius={68} outerRadius={92} paddingAngle={2}>
            <Cell fill={tone} />
            <Cell fill={chartPalette.muted} />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-x-0 bottom-6 text-center">
        <p className="font-heading text-3xl font-bold text-text-main">{safeValue}%</p>
        <p className="text-sm text-text-secondary">{label}</p>
      </div>
    </div>
  );
}
