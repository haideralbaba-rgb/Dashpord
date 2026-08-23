"use client";

import {
  Eye,
  MousePointerClick,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { Sparkline } from "@/components/ui/sparkline";
import { kpiCards, type KpiCard } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const iconMap = {
  sales: Eye,
  orders: Users,
  avg: MousePointerClick,
  profit: ShoppingBag,
} as const;

const colorMap = {
  sales: { iconBg: "bg-blue-50", icon: "text-blue-600", spark: "#2563EB" },
  orders: { iconBg: "bg-violet-50", icon: "text-violet-600", spark: "#8B5CF6" },
  avg: { iconBg: "bg-amber-50", icon: "text-amber-600", spark: "#F59E0B" },
  profit: { iconBg: "bg-emerald-50", icon: "text-emerald-600", spark: "#10B981" },
} as const;

function KpiCardItem({ card, index }: { card: KpiCard; index: number }) {
  const Icon = iconMap[card.icon];
  const colors = colorMap[card.icon];
  const positive = card.change >= 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      className="saas-card saas-card-hover flex flex-col justify-between p-4 md:p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{card.title}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900 md:text-[28px]">
            {card.value}
          </p>
        </div>
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-2xl",
            colors.iconBg,
          )}
        >
          <Icon className={cn("h-5 w-5", colors.icon)} />
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-3">
        <div>
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold",
              positive ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-600",
            )}
          >
            <TrendingUp className={cn("h-3.5 w-3.5", !positive && "rotate-180")} />
            {positive ? "+" : ""}
            {card.change.toLocaleString("ar-SA")}%
          </span>
          <p className="mt-2 text-[11px] leading-4 text-slate-400">{card.previousLabel}</p>
        </div>
        <Sparkline data={card.sparkline} color={colors.spark} />
      </div>
    </motion.article>
  );
}

export function KpiCards() {
  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {kpiCards.map((card, index) => (
        <KpiCardItem key={card.id} card={card} index={index} />
      ))}
    </section>
  );
}
