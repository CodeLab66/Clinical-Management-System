import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { chartPalette } from "@/constants/theme";

export function BranchBarChart({ data = [], xKey = "name", yKey = "value" }) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey={xKey} stroke="#8A8A8A" tickLine={false} axisLine={false} />
          <YAxis stroke="#8A8A8A" tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ borderRadius: 18, border: "1px solid rgba(255,255,255,0.55)" }} />
          <Bar dataKey={yKey} fill={chartPalette.primary} radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
