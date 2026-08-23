"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";
import { Store, Truck, ShoppingBag } from "lucide-react";
import { dashboardSummary, orderTypeMetrics, profitSeries } from "@/lib/mock-data";
import { formatCompact, formatNumber } from "@/lib/utils";

type TooltipPayload = {
  payload: (typeof profitSeries)[number];
};

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
}) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-xl">
      <p className="text-xs font-medium text-slate-500">{point.label} ٢٠٢٦</p>
      <p className="mt-1 text-sm font-bold text-slate-900">
        {formatNumber(point.value)} ر.س
        <span className="mr-1 text-xs font-medium text-emerald-600">هذا الشهر</span>
      </p>
      <p className="mt-0.5 text-xs text-slate-400">
        {formatNumber(point.previous)} ر.س الشهر الماضي
      </p>
    </div>
  );
}

const orderIcons = {
  "dine-in": Store,
  delivery: Truck,
  takeaway: ShoppingBag,
} as const;

export function ProfitChart() {
  const [activeLabel, setActiveLabel] = useState<string | null>("18 يناير");

  const activePoint = useMemo(
    () => profitSeries.find((p) => p.label === activeLabel) ?? profitSeries[9],
    [activeLabel],
  );

  return (
    <article className="saas-card flex h-full flex-col p-4 md:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">إجمالي الأرباح</p>
          <div className="mt-1 flex flex-wrap items-end gap-3">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              {formatCompact(dashboardSummary.totalProfit)} ر.س
            </h2>
            <span className="mb-1 inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
              +{dashboardSummary.profitChange.toLocaleString("ar-SA")}% مقابل الفترة السابقة
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 h-[240px] w-full min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={profitSeries}
            margin={{ top: 10, right: 8, left: 0, bottom: 0 }}
            onMouseMove={(state) => {
              if (state?.activeLabel) {
                setActiveLabel(String(state.activeLabel));
              }
            }}
            onMouseLeave={() => setActiveLabel("18 يناير")}
          >
            <defs>
              <linearGradient id="profitFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#94A3B8", fontSize: 11 }}
              interval="preserveStartEnd"
              minTickGap={24}
            />
            <YAxis
              orientation="right"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#94A3B8", fontSize: 11 }}
              tickFormatter={(v) => formatCompact(Number(v))}
              width={42}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "#94A3B8", strokeDasharray: "4 4" }}
            />
            {activePoint && (
              <ReferenceLine
                x={activePoint.label}
                stroke="#94A3B8"
                strokeDasharray="4 4"
              />
            )}
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3B82F6"
              strokeWidth={2.5}
              fill="url(#profitFill)"
              activeDot={{
                r: 6,
                fill: "#2563EB",
                stroke: "#fff",
                strokeWidth: 3,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 border-t border-slate-100 pt-4 sm:grid-cols-3">
        {orderTypeMetrics.map((metric) => {
          const Icon = orderIcons[metric.id as keyof typeof orderIcons] ?? Store;
          return (
            <div
              key={metric.id}
              className="rounded-2xl border border-slate-100 bg-slate-50/80 px-3 py-3"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-sm"
                    style={{ color: metric.color }}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs text-slate-500">{metric.label}</p>
                    <p className="text-base font-bold text-slate-900">
                      {formatNumber(metric.count)}
                    </p>
                  </div>
                </div>
                <div
                  className="h-1.5 w-12 overflow-hidden rounded-full bg-white"
                  aria-hidden
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min(100, (metric.count / 3000) * 100)}%`,
                      backgroundColor: metric.color,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}
