"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { AddWidgetModal } from "@/components/dashboard/add-widget-modal";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type PlaceholderPageProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export function PlaceholderPage({ title, description, icon: Icon }: PlaceholderPageProps) {
  const [widgetOpen, setWidgetOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          onAddWidget={() => setWidgetOpen(true)}
          onMenuClick={() => setMobileOpen(true)}
        />
        <main className="flex flex-1 items-center justify-center px-4 py-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="saas-card w-full max-w-lg p-8 text-center"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <Icon className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
            <p className="mt-2 text-sm leading-7 text-slate-500">{description}</p>
            <p className="mt-4 text-xs text-slate-400">
              هذه الصفحة جزء من نظام إدارة المطعم — عد إلى لوحة التحكم لمتابعة الأداء الحي.
            </p>
          </motion.div>
        </main>
      </div>
      <AddWidgetModal open={widgetOpen} onClose={() => setWidgetOpen(false)} />
    </div>
  );
}
