"use client";

import { BarChart3 } from "lucide-react";
import { PlaceholderPage } from "@/components/dashboard/placeholder-page";

export default function AnalyticsPage() {
  return (
    <PlaceholderPage
      title="التحليلات والتقارير"
      description="تقارير متقدمة عن المبيعات، الهدر، أوقات الذروة، وأداء الفروع."
      icon={BarChart3}
    />
  );
}
