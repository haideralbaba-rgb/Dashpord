"use client";

import { Boxes } from "lucide-react";
import { PlaceholderPage } from "@/components/dashboard/placeholder-page";

export default function InventoryPage() {
  return (
    <PlaceholderPage
      title="المخزون والعملاء"
      description="راقب مستويات المخزون، نقاط إعادة الطلب، وقاعدة عملاء الولاء في مكان واحد."
      icon={Boxes}
    />
  );
}
