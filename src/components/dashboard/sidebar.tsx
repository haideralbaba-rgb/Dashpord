"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  UtensilsCrossed,
  Boxes,
  BarChart3,
  Settings,
  Sparkles,
  Crown,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { dashboardSummary, navItems } from "@/lib/mock-data";

const icons = {
  dashboard: LayoutDashboard,
  orders: ShoppingBag,
  menu: UtensilsCrossed,
  inventory: Boxes,
  analytics: BarChart3,
  settings: Settings,
} as const;

type SidebarProps = {
  mobileOpen?: boolean;
  onClose?: () => void;
};

export function Sidebar({ mobileOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="إغلاق القائمة"
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-[2px] lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-[280px] flex-col border-l border-slate-200 bg-white px-4 py-5 transition-transform duration-300 lg:static lg:z-0 lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0",
        )}
      >
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/25">
            <UtensilsCrossed className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-base font-bold text-slate-900">
              {dashboardSummary.brandName}
            </p>
            <p className="text-xs text-slate-500">{dashboardSummary.brandSubtitle} · إدارة المطاعم</p>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => {
            const Icon = icons[item.id];
            const active = pathname === item.href || (item.id === "dashboard" && pathname === "/");

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-y-2 right-0 w-1 rounded-full bg-blue-600"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon
                  className={cn(
                    "h-[18px] w-[18px] shrink-0",
                    active ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600",
                  )}
                />
                <span className="flex-1">{item.label}</span>
                {item.badge != null && (
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-4 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 p-4 text-white shadow-lg">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
            <Crown className="h-5 w-5 text-amber-300" />
          </div>
          <p className="text-sm font-bold">الترقية للباقة الاحترافية</p>
          <p className="mt-1 text-xs leading-5 text-slate-300">
            افتح التحليلات المتقدمة، تنبيهات المخزون الذكية، وتقارير الهدر اللحظية.
          </p>
          <button
            type="button"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-blue-500 to-indigo-500 px-3 py-2.5 text-sm font-semibold shadow-md shadow-blue-900/30 transition hover:brightness-110"
          >
            <Sparkles className="h-4 w-4" />
            ترقية الآن
          </button>
        </div>
      </aside>
    </>
  );
}
