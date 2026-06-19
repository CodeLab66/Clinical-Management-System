import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { chartPalette } from "@/constants/theme";

export function ActivityAreaChart({ data = [], xKey = "name", yKey = "value" }) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="activityFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chartPalette.primary} stopOpacity={0.35} />
              <stop offset="95%" stopColor={chartPalette.primary} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <XAxis dataKey={xKey} stroke="#8A8A8A" tickLine={false} axisLine={false} />
          <YAxis stroke="#8A8A8A" tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ borderRadius: 18, border: "1px solid rgba(255,255,255,0.55)" }} />
          <Area type="monotone" dataKey={yKey} stroke={chartPalette.primary} fill="url(#activityFill)" strokeWidth={3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
