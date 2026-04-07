"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { TimeSeriesPoint } from "@/lib/ga4";

interface Props {
  data: TimeSeriesPoint[];
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-navy-900 border border-navy-600 px-3 py-2 text-xs font-sans">
      <p className="text-gray-400 mb-1 uppercase tracking-widest">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: <span className="font-semibold text-white">{p.value.toLocaleString()}</span>
        </p>
      ))}
    </div>
  );
};

export default function PageViewsChart({ data }: Props) {
  if (data.length === 0) {
    return (
      <p className="font-sans text-sm text-gray-500 py-10 text-center">
        No data yet.
      </p>
    );
  }

  // Show every ~5th label to avoid crowding
  const tickInterval = Math.max(1, Math.floor(data.length / 6));

  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e3060" />
        <XAxis
          dataKey="date"
          tick={{ fill: "#6b7280", fontSize: 11, fontFamily: "var(--font-source-sans)" }}
          tickLine={false}
          axisLine={false}
          interval={tickInterval}
        />
        <YAxis
          tick={{ fill: "#6b7280", fontSize: 11, fontFamily: "var(--font-source-sans)" }}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{
            fontSize: 11,
            fontFamily: "var(--font-source-sans)",
            color: "#9ca3af",
            paddingTop: 8,
          }}
        />
        <Line
          type="monotone"
          dataKey="views"
          name="Page Views"
          stroke="#F0C400"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: "#F0C400" }}
        />
        <Line
          type="monotone"
          dataKey="sessions"
          name="Sessions"
          stroke="#60a5fa"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: "#60a5fa" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
