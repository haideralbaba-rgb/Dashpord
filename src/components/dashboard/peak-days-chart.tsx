"use client";

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { MoreHorizontal } from "lucide-react";
import { peakDays } from "@/lib/mock-data";
import { formatNumber } from "@/lib/utils";

function PeakTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: (typeof peakDays)[number] }>;
}) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-lg">
      <p className="font-semibold text-slate-800">{point.day}</p>
      <p className="text-slate-500">{formatNumber(point.value)} طلب</p>
    </div>
  );
}

export function PeakDaysChart() {
  const max = Math.max(...peakDays.map((d) => d.value));

  return (
    <article className="saas-card p-4 md:p-5">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">أوقات الذروة</h3>
          <p className="mt-0.5 text-xs text-slate-400">أكثر الأيام نشاطاً خلال الأسبوع</p>
        </div>
        <button
          type="button"
          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-50 hover:text-slate-600"
          aria-label="المزيد"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      <div className="mb-1 text-center">
        <p className="text-2xl font-bold text-slate-900">{formatNumber(max)}</p>
      </div>

      <div className="h-[160px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={peakDays} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#94A3B8", fontSize: 11 }}
            />
            <YAxis hide />
            <Tooltip content={<PeakTooltip />} cursor={{ fill: "rgba(37,99,235,0.06)" }} />
            <Bar dataKey="value" radius={[8, 8, 8, 8]} maxBarSize={28}>
              {peakDays.map((entry) => (
                <Cell
                  key={entry.day}
                  fill={entry.highlight ? "#2563EB" : "#E2E8F0"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
