import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "معلم الشاورما | لوحة تحكم إدارة المطاعم",
  description:
    "منصة SaaS عربية لإدارة المطاعم: المبيعات، الطلبات الحية، المخزون، والتحليلات الذكية.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
