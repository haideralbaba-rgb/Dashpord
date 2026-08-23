"use client";

import { FormEvent, useState } from "react";
import {
  Expand,
  Loader2,
  Mic,
  Paperclip,
  SendHorizontal,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { aiSuggestions, dashboardSummary } from "@/lib/mock-data";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

const cannedAnswers: Record<string, string> = {
  "تحليل المبيعات":
    "مبيعات اليوم أعلى بنسبة ١٢٪ عن متوسط الأسبوع. شاورما الدبل تقود الإيرادات، ويُفضَّل تعزيز عروض التوصيل مساء الثلاثاء.",
  "كشف النواقص":
    "هناك ٣ أصناف دون حد الأمان: خبز الصاج، صوص الثوم، وبطاطس التجميد. أنصح بإعادة الطلب خلال ٢٤ ساعة.",
  "توقعات الذروة":
    "الذروة المتوقعة اليوم بين ٧–٩ مساءً. جهّز فريق الصالة بموظف إضافي وفعّل مطبخ التوصيل مبكراً.",
  "تقرير الهدر":
    "هدر الخضروات انخفض ٨٪ هذا الأسبوع. أعلى هدر في السلطة الموسمية — قلّل التحضير المسبق بنسبة ١٥٪.",
};

export function AiAssistant() {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "مرحباً! أنا أبو علي، مساعدك الذكي لإدارة المطعم. اسألني عن المبيعات، المخزون، أو توقعات الذروة.",
    },
  ]);

  const ask = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      text: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);
    setQuery("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed }),
      });
      const data = (await res.json()) as { answer?: string };
      const answer =
        data.answer ||
        cannedAnswers[trimmed] ||
        "تم تحليل بيانات الفرع. الأداء العام ممتاز — ركّز على تعزيز طلبات التوصيل في أوقات الذروة.";

      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          text: answer,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          text:
            cannedAnswers[trimmed] ||
            "تعذّر الاتصال مؤقتاً، لكن من آخر البيانات: الثلاثاء هو يوم الذروة وإجمالي الأرباح في اتجاه صاعد.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    void ask(query);
  };

  return (
    <article className="saas-card relative flex h-full min-h-[320px] flex-col overflow-hidden p-4 md:p-5">
      <div className="ai-dot-grid pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative z-10 mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              {dashboardSummary.aiName}
            </h3>
            <p className="text-[11px] text-slate-400">مدعوم بالذكاء الاصطناعي</p>
          </div>
        </div>
        <button
          type="button"
          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white/80 hover:text-slate-600"
          aria-label="توسيع"
        >
          <Expand className="h-4 w-4" />
        </button>
      </div>

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-center py-2">
          <motion.div
            className="ai-orb relative h-28 w-28 rounded-full md:h-32 md:w-32"
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 0 12px rgba(37,99,235,0.08), 0 0 40px rgba(37,99,235,0.35)",
                "0 0 0 18px rgba(37,99,235,0.12), 0 0 55px rgba(37,99,235,0.45)",
                "0 0 0 12px rgba(37,99,235,0.08), 0 0 40px rgba(37,99,235,0.35)",
              ],
            }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="absolute inset-[18%] rounded-full bg-gradient-to-br from-white/50 to-transparent" />
          </motion.div>

          <div className="mt-4 max-h-24 w-full space-y-2 overflow-y-auto px-1">
            <AnimatePresence initial={false}>
              {messages.slice(-2).map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={
                    msg.role === "user"
                      ? "mr-auto max-w-[90%] rounded-2xl bg-blue-600 px-3 py-2 text-xs text-white"
                      : "ml-auto max-w-[90%] rounded-2xl border border-slate-200 bg-white/90 px-3 py-2 text-xs text-slate-600 shadow-sm"
                  }
                >
                  {msg.text}
                </motion.div>
              ))}
            </AnimatePresence>
            {loading && (
              <div className="ml-auto flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                أبو علي يفكر...
              </div>
            )}
          </div>
        </div>

        <AnimatePresence>
          {(focused || query) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-3 overflow-hidden"
            >
              <div className="flex flex-wrap gap-2">
                {aiSuggestions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => void ask(item.label)}
                    className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[11px] font-medium text-blue-700 transition hover:bg-blue-100"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form
          onSubmit={onSubmit}
          className="relative z-10 flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1.5 shadow-sm"
        >
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-50 hover:text-slate-600"
            aria-label="إرفاق"
          >
            <Paperclip className="h-4 w-4" />
          </button>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="اسأل أبو علي أي شيء..."
            className="h-9 min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
          />
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-50 hover:text-slate-600"
            aria-label="تسجيل صوتي"
          >
            <Mic className="h-4 w-4" />
          </button>
          <motion.button
            type="submit"
            whileTap={{ scale: 0.94 }}
            disabled={loading}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white shadow-md shadow-blue-600/30 transition hover:bg-blue-700 disabled:opacity-60"
            aria-label="إرسال"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <SendHorizontal className="h-4 w-4 rotate-180" />
            )}
          </motion.button>
        </form>
      </div>
    </article>
  );
}
