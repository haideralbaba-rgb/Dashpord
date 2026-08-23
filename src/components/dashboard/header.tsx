"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bell,
  CalendarDays,
  ChevronDown,
  Download,
  Menu,
  Moon,
  Plus,
  Search,
  Sun,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { dashboardSummary } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type HeaderProps = {
  onAddWidget: () => void;
  onMenuClick: () => void;
};

const dateOptions = [
  "١ يناير ٢٠٢٦ - ١ فبراير ٢٠٢٦",
  "١ ديسمبر ٢٠٢٥ - ١ يناير ٢٠٢٦",
  "١ نوفمبر ٢٠٢٥ - ١ ديسمبر ٢٠٢٥",
];

const filterOptions = ["آخر ٣٠ يوم", "آخر ٧ أيام", "هذا الشهر", "هذا الربع"];

export function Header({ onAddWidget, onMenuClick }: HeaderProps) {
  const [dark, setDark] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dashboardSummary.dateRange);
  const [selectedFilter, setSelectedFilter] = useState(dashboardSummary.quickFilter);
  const [exported, setExported] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setDateOpen(false);
        setFilterOpen(false);
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const handleExport = () => {
    setExported(true);
    window.setTimeout(() => setExported(false), 1800);
  };

  return (
    <header
      ref={rootRef}
      className="sticky top-0 z-30 border-b border-slate-200/80 bg-[#F8FAFC]/90 backdrop-blur-xl"
    >
      <div className="flex flex-col gap-3 px-4 py-3 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm lg:hidden"
            aria-label="فتح القائمة"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="ابحث عن صنف، فاتورة، أو عميل... (⌘K)"
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white pr-10 pl-4 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={() => setDark((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50"
              aria-label="تبديل المظهر"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <button
              type="button"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50"
              aria-label="الإشعارات"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute left-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setProfileOpen((v) => !v);
                  setDateOpen(false);
                  setFilterOpen(false);
                }}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white py-1.5 pr-1.5 pl-3 shadow-sm transition hover:bg-slate-50"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-sm font-bold text-white">
                  ع
                </div>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute left-0 mt-2 w-52 overflow-hidden rounded-2xl border border-slate-200 bg-white py-2 shadow-xl"
                  >
                    <div className="border-b border-slate-100 px-4 py-3">
                      <p className="text-sm font-semibold text-slate-900">علي المعلم</p>
                      <p className="text-xs text-slate-500">مدير الفرع الرئيسي</p>
                    </div>
                    <button
                      type="button"
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
                    >
                      <User className="h-4 w-4" />
                      الملف الشخصي
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-slate-900 md:text-2xl">لوحة التحكم</h1>
            <p className="mt-0.5 text-xs text-slate-500 md:text-sm">
              نظرة شاملة على أداء المطعم والمبيعات والطلبات
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setDateOpen((v) => !v);
                  setFilterOpen(false);
                  setProfileOpen(false);
                }}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 sm:text-sm"
              >
                <CalendarDays className="h-4 w-4 text-slate-400" />
                <span className="max-w-[180px] truncate sm:max-w-none">{selectedDate}</span>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>
              <AnimatePresence>
                {dateOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute left-0 z-20 mt-2 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white py-2 shadow-xl"
                  >
                    {dateOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setSelectedDate(option);
                          setDateOpen(false);
                        }}
                        className={cn(
                          "block w-full px-4 py-2.5 text-right text-sm transition hover:bg-slate-50",
                          option === selectedDate ? "bg-blue-50 font-semibold text-blue-700" : "text-slate-600",
                        )}
                      >
                        {option}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setFilterOpen((v) => !v);
                  setDateOpen(false);
                  setProfileOpen(false);
                }}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 sm:text-sm"
              >
                {selectedFilter}
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>
              <AnimatePresence>
                {filterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute left-0 z-20 mt-2 w-44 overflow-hidden rounded-2xl border border-slate-200 bg-white py-2 shadow-xl"
                  >
                    {filterOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setSelectedFilter(option);
                          setFilterOpen(false);
                        }}
                        className={cn(
                          "block w-full px-4 py-2.5 text-right text-sm transition hover:bg-slate-50",
                          option === selectedFilter
                            ? "bg-blue-50 font-semibold text-blue-700"
                            : "text-slate-600",
                        )}
                      >
                        {option}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={onAddWidget}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:text-sm"
            >
              <Plus className="h-4 w-4" />
              إضافة ودجت
            </motion.button>

            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={handleExport}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-blue-600 px-3 text-xs font-semibold text-white shadow-md shadow-blue-600/25 transition hover:bg-blue-700 sm:text-sm"
            >
              <Download className="h-4 w-4" />
              {exported ? "تم التصدير ✓" : "تصدير البيانات"}
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
}
