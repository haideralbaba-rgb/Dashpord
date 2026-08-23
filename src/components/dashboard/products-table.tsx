"use client";

import { MoreHorizontal, Star } from "lucide-react";
import { motion } from "framer-motion";
import { bestSellers } from "@/lib/mock-data";
import { formatNumber } from "@/lib/utils";

export function ProductsTable() {
  return (
    <article className="saas-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 md:px-5">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 md:text-base">
            الأصناف الأكثر مبيعاً
          </h3>
          <p className="mt-0.5 text-xs text-slate-400">أداء الوجبات خلال الفترة المحددة</p>
        </div>
        <button
          type="button"
          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-50 hover:text-slate-600"
          aria-label="المزيد"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70 text-xs font-semibold text-slate-500">
              <th className="px-4 py-3 text-right md:px-5">معرّف الصنف</th>
              <th className="px-4 py-3 text-right">اسم الوجبة</th>
              <th className="px-4 py-3 text-right">الكمية المباعة</th>
              <th className="px-4 py-3 text-right">الإيرادات</th>
              <th className="px-4 py-3 text-right md:px-5">التقييم</th>
            </tr>
          </thead>
          <tbody>
            {bestSellers.map((item, index) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                className="border-b border-slate-50 transition hover:bg-slate-50/80"
              >
                <td className="px-4 py-3 font-medium text-slate-500 md:px-5">
                  {item.code}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 text-xl shadow-inner">
                      {item.emoji}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{item.name}</p>
                      <p className="text-[11px] text-slate-400">متوفر في جميع الفروع</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-700">
                  {formatNumber(item.sold)}{" "}
                  <span className="text-slate-400">مباع</span>
                </td>
                <td className="px-4 py-3 font-semibold text-emerald-600">
                  {formatNumber(item.revenue)} ر.س
                </td>
                <td className="px-4 py-3 md:px-5">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {item.rating.toLocaleString("ar-SA", {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
