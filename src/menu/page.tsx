"use client";

import { UtensilsCrossed } from "lucide-react";
import { PlaceholderPage } from "@/components/dashboard/placeholder-page";

export default function MenuPage() {
  return (
    <PlaceholderPage
      title="المنيو والأصناف"
      description="أدر قائمة الوجبات والأسعار والصور والتوافر عبر جميع فروع المطعم."
      icon={UtensilsCrossed}
    />
  );
}
