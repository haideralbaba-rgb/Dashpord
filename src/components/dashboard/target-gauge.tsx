"use client";

import { MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { dashboardSummary } from "@/lib/mock-data";

export function TargetGauge() {
  const progress = dashboardSummary.targetProgress;
  // Semi-circle gauge: 240deg arc from 210deg
  const circumference = 2 * Math.PI * 70;
  const arcLength = circumference * (240 / 360);
  const filled = arcLength * (progress / 100);

  return (
    <article className="saas-card p-4 md:p-5">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">نسبة تحقيق الهدف اليومي</h3>
        <button
          type="button"
          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-50 hover:text-slate-600"
          aria-label="المزيد"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      <div className="relative mx-auto mt-2 flex h-[170px] w-full max-w-[220px] items-center justify-center">
        <svg viewBox="0 0 180 140" className="h-full w-full overflow-visible">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6EE7B7" />
              <stop offset="50%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>

          {/* Background ticks */}
          {Array.from({ length: 28 }).map((_, i) => {
            const angle = 210 + (i / 27) * 240;
            const rad = (angle * Math.PI) / 180;
            const inner = 58;
            const outer = 78;
            const x1 = 90 + inner * Math.cos(rad);
            const y1 = 90 + inner * Math.sin(rad);
            const x2 = 90 + outer * Math.cos(rad);
            const y2 = 90 + outer * Math.sin(rad);
            const active = i / 27 <= progress / 100;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={active ? "#10B981" : "#E2E8F0"}
                strokeWidth={3.5}
                strokeLinecap="round"
              />
            );
          })}

          {/* Smooth arc underlay */}
          <path
            d="M 29.4 125 A 70 70 0 1 1 150.6 125"
            fill="none"
            stroke="#F1F5F9"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <motion.path
            d="M 29.4 125 A 70 70 0 1 1 150.6 125"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${filled} ${arcLength}`}
            initial={{ strokeDasharray: `0 ${arcLength}` }}
            animate={{ strokeDasharray: `${filled} ${arcLength}` }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
          <motion.p
            className="text-4xl font-bold text-slate-900"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            {progress.toLocaleString("ar-SA")}%
          </motion.p>
          <p className="mt-1 max-w-[140px] text-center text-[11px] leading-4 text-slate-400">
            {dashboardSummary.targetLabel}
          </p>
        </div>
      </div>

      <div className="mt-1 flex justify-center">
        <button
          type="button"
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50"
        >
          عرض التفاصيل
        </button>
      </div>
    </article>
  );
}
