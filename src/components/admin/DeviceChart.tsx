"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import type { DeviceBreakdown } from "@/lib/ga4";

interface Props {
  data: DeviceBreakdown[];
}

const COLORS = ["#F0C400", "#60a5fa", "#34d399", "#f87171"];

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { name: string; value: number }[];
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-navy-900 border border-navy-600 px-3 py-2 text-xs font-sans">
      <p className="text-gray-400 uppercase tracking-widest mb-1">{payload[0].name}</p>
      <p className="text-white font-semibold">{payload[0].value.toLocaleString()} sessions</p>
    </div>
  );
};

export default function DeviceChart({ data }: Props) {
  if (data.length === 0) {
    return (
      <p className="font-sans text-sm text-gray-500 py-10 text-center">
        No data yet.
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          dataKey="sessions"
          nameKey="device"
          cx="50%"
          cy="45%"
          innerRadius={55}
          outerRadius={85}
          strokeWidth={0}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{
            fontSize: 11,
            fontFamily: "var(--font-source-sans)",
            color: "#9ca3af",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
