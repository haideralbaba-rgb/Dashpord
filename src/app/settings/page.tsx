"use client";

import { Settings } from "lucide-react";
import { PlaceholderPage } from "@/components/dashboard/placeholder-page";

export default function SettingsPage() {
  return (
    <PlaceholderPage
      title="الإعدادات"
      description="خصّص الفرع، المستخدمين، التنبيهات، والتكاملات مع أنظمة الدفع والتوصيل."
      icon={Settings}
    />
  );
}
