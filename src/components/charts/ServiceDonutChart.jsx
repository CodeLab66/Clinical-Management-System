import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { chartPalette } from "@/constants/theme";

const colors = [chartPalette.primary, chartPalette.info, chartPalette.success, chartPalette.warning, chartPalette.muted];

export function ServiceDonutChart({ data = [], nameKey = "name", valueKey = "value" }) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey={valueKey} nameKey={nameKey} innerRadius={58} outerRadius={90} paddingAngle={4}>
            {data.map((entry, index) => <Cell key={entry[nameKey] || index} fill={colors[index % colors.length]} />)}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: 18, border: "1px solid rgba(255,255,255,0.55)" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
