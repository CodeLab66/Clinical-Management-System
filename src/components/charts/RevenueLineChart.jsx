import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { chartPalette } from "@/constants/theme";

export function RevenueLineChart({ data = [], xKey = "name", yKey = "value" }) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey={xKey} stroke="#8A8A8A" tickLine={false} axisLine={false} />
          <YAxis stroke="#8A8A8A" tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ borderRadius: 18, border: "1px solid rgba(255,255,255,0.55)" }} />
          <Line type="monotone" dataKey={yKey} stroke={chartPalette.primary} strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
