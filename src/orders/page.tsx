"use client";

import { ShoppingBag } from "lucide-react";
import { PlaceholderPage } from "@/components/dashboard/placeholder-page";

export default function OrdersPage() {
  return (
    <PlaceholderPage
      title="الطلبات الحية"
      description="تابع الطلبات الواردة من الصالة والتوصيل والسفري لحظة بلحظة مع تنبيهات التأخير."
      icon={ShoppingBag}
    />
  );
}
