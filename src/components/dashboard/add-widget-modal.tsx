"use client";

import { useEffect, useState } from "react";
import {
  BarChart3,
  Boxes,
  Check,
  LineChart,
  MonitorSmartphone,
  PieChart,
  Truck,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { widgetTemplates, type WidgetTemplate } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type AddWidgetModalProps = {
  open: boolean;
  onClose: () => void;
};

const iconMap = {
  devices: MonitorSmartphone,
  orders: BarChart3,
  trend: LineChart,
  segments: PieChart,
  inventory: Boxes,
  delivery: Truck,
} as const;

export function AddWidgetModal({ open, onClose }: AddWidgetModalProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const selectOne = async (widget: WidgetTemplate) => {
    if (!selected.includes(widget.id)) {
      setSelected((prev) => [...prev, widget.id]);
    }
    setSaving(true);
    try {
      await fetch("/api/widgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          widgetKey: widget.id,
          title: widget.title,
          description: widget.description,
          tag: widget.tag,
          icon: widget.icon,
        }),
      });
      setToast(`تمت إضافة «${widget.title}» إلى لوحة التحكم`);
      window.setTimeout(() => setToast(null), 2200);
    } catch {
      setToast("تم تحديد الودجت محلياً");
      window.setTimeout(() => setToast(null), 2200);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="إغلاق"
            className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-widget-title"
            initial={{ x: "110%", opacity: 0.6 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "110%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed inset-y-3 left-3 z-[70] flex w-[min(100%-1.5rem,440px)] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h2 id="add-widget-title" className="text-lg font-bold text-slate-900">
                  إضافة ودجت
                </h2>
                <p className="mt-0.5 text-xs text-slate-500">
                  اختر قوالب جاهزة لتخصيص لوحة التحكم
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50"
                aria-label="إغلاق النافذة"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {widgetTemplates.map((widget, index) => {
                const Icon = iconMap[widget.icon];
                const isSelected = selected.includes(widget.id);

                return (
                  <motion.div
                    key={widget.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className={cn(
                      "rounded-2xl border p-4 transition",
                      isSelected
                        ? "border-blue-200 bg-blue-50/40 shadow-sm"
                        : "border-slate-200 bg-white hover:border-slate-300",
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 text-blue-600 shadow-inner">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-slate-900">{widget.title}</h3>
                            <p className="mt-1 text-xs leading-5 text-slate-500">
                              {widget.description}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between gap-2">
                          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                            #{widget.tag}
                          </span>
                          <button
                            type="button"
                            disabled={saving}
                            onClick={() => void selectOne(widget)}
                            className={cn(
                              "inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition",
                              isSelected
                                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                                : "bg-blue-600 text-white hover:bg-blue-700",
                            )}
                          >
                            {isSelected ? (
                              <>
                                <Check className="h-3.5 w-3.5" />
                                تم الاختيار
                              </>
                            ) : (
                              "اختيار"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="border-t border-slate-100 px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-slate-500">
                  {selected.length > 0
                    ? `${selected.length.toLocaleString("ar-SA")} ودجت محدد`
                    : "لم يتم اختيار ودجت بعد"}
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                  >
                    إغلاق
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      selected.forEach((id) => {
                        const widget = widgetTemplates.find((w) => w.id === id);
                        if (widget) void selectOne(widget);
                      });
                      onClose();
                    }}
                    disabled={!selected.length}
                    className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    إضافة المحدد
                  </button>
                </div>
              </div>
            </div>
          </motion.aside>

          <AnimatePresence>
            {toast && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                className="fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-xl"
              >
                {toast}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
