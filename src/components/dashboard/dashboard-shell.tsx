"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { KpiCards } from "@/components/dashboard/kpi-cards";
import { ProfitChart } from "@/components/dashboard/profit-chart";
import { PeakDaysChart } from "@/components/dashboard/peak-days-chart";
import { TargetGauge } from "@/components/dashboard/target-gauge";
import { AiAssistant } from "@/components/dashboard/ai-assistant";
import { ProductsTable } from "@/components/dashboard/products-table";
import { AddWidgetModal } from "@/components/dashboard/add-widget-modal";
import {
  BarChart3,
  LayoutDashboard,
  Settings,
  ShoppingBag,
  UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const mobileNav = [
  { href: "/", label: "الرئيسية", icon: LayoutDashboard },
  { href: "/orders", label: "الطلبات", icon: ShoppingBag },
  { href: "/menu", label: "المنيو", icon: UtensilsCrossed },
  { href: "/analytics", label: "التحليلات", icon: BarChart3 },
  { href: "/settings", label: "إعدادات", icon: Settings },
];

export function DashboardShell() {
  const [widgetOpen, setWidgetOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          onAddWidget={() => setWidgetOpen(true)}
          onMenuClick={() => setMobileOpen(true)}
        />

        <main className="flex-1 space-y-4 px-4 py-4 pb-24 lg:px-6 lg:pb-6">
          <KpiCards />

          <section className="grid grid-cols-1 gap-4 xl:grid-cols-12">
            <div className="xl:col-span-8">
              <ProfitChart />
            </div>

            <div className="flex flex-col gap-4 xl:col-span-4">
              <PeakDaysChart />
              <TargetGauge />
            </div>
          </section>

          <section className="grid grid-cols-1 gap-4 xl:grid-cols-12">
            <div className="xl:col-span-8">
              <ProductsTable />
            </div>
            <div className="xl:col-span-4">
              <AiAssistant />
            </div>
          </section>
        </main>
      </div>

      <nav className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-2 py-2 backdrop-blur lg:hidden">
        <ul className="grid grid-cols-5 gap-1">
          {mobileNav.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href || (item.href === "/" && pathname === "/");
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] font-medium transition",
                    active ? "bg-blue-50 text-blue-700" : "text-slate-500",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <AddWidgetModal open={widgetOpen} onClose={() => setWidgetOpen(false)} />
    </div>
  );
}
