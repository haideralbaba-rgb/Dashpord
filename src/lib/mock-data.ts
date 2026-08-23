export type KpiCard = {
  id: string;
  title: string;
  value: string;
  change: number;
  previousLabel: string;
  icon: "sales" | "orders" | "avg" | "profit";
  sparkline: number[];
};

export type ProfitPoint = {
  date: string;
  label: string;
  value: number;
  previous: number;
};

export type PeakDay = {
  day: string;
  value: number;
  highlight?: boolean;
};

export type OrderTypeMetric = {
  id: string;
  label: string;
  count: number;
  color: string;
};

export type BestSeller = {
  id: string;
  code: string;
  name: string;
  image: string;
  emoji: string;
  sold: number;
  revenue: number;
  rating: number;
};

export type WidgetTemplate = {
  id: string;
  title: string;
  description: string;
  tag: string;
  icon: "devices" | "orders" | "trend" | "segments" | "inventory" | "delivery";
};

export type AiSuggestion = {
  id: string;
  label: string;
};

export const kpiCards: KpiCard[] = [
  {
    id: "sales",
    title: "إجمالي المبيعات",
    value: "١٦,٤٣١",
    change: 15.5,
    previousLabel: "مقارنة بـ ١٤,٦٥٣ الفترة السابقة",
    icon: "sales",
    sparkline: [42, 48, 45, 52, 58, 55, 62, 70, 68, 75, 80, 78],
  },
  {
    id: "orders",
    title: "عدد الطلبات",
    value: "٦,٢٢٥",
    change: 8.4,
    previousLabel: "مقارنة بـ ٥,٧٣٢ الفترة السابقة",
    icon: "orders",
    sparkline: [30, 35, 33, 40, 42, 48, 45, 50, 55, 52, 58, 60],
  },
  {
    id: "avg",
    title: "متوسط قيمة الفاتورة",
    value: "٨٢ ر.س",
    change: -10.5,
    previousLabel: "مقارنة بـ ٩٢ ر.س الفترة السابقة",
    icon: "avg",
    sparkline: [90, 88, 85, 82, 80, 78, 75, 72, 70, 68, 65, 62],
  },
  {
    id: "profit",
    title: "صافي الأرباح اليومية",
    value: "١,٢٢٤",
    change: 4.4,
    previousLabel: "مقارنة بـ ١,١٨٦ الفترة السابقة",
    icon: "profit",
    sparkline: [40, 42, 45, 44, 48, 50, 52, 55, 54, 58, 60, 62],
  },
];

export const profitSeries: ProfitPoint[] = [
  { date: "2026-01-01", label: "1 يناير", value: 5200, previous: 4100 },
  { date: "2026-01-03", label: "3 يناير", value: 5800, previous: 4300 },
  { date: "2026-01-05", label: "5 يناير", value: 5400, previous: 4500 },
  { date: "2026-01-07", label: "7 يناير", value: 6200, previous: 4800 },
  { date: "2026-01-09", label: "9 يناير", value: 7100, previous: 5000 },
  { date: "2026-01-11", label: "11 يناير", value: 6800, previous: 5200 },
  { date: "2026-01-13", label: "13 يناير", value: 7500, previous: 5400 },
  { date: "2026-01-15", label: "15 يناير", value: 8200, previous: 5600 },
  { date: "2026-01-17", label: "17 يناير", value: 9100, previous: 5800 },
  { date: "2026-01-18", label: "18 يناير", value: 12324, previous: 5563 },
  { date: "2026-01-20", label: "20 يناير", value: 9800, previous: 6000 },
  { date: "2026-01-22", label: "22 يناير", value: 10500, previous: 6200 },
  { date: "2026-01-24", label: "24 يناير", value: 11200, previous: 6400 },
  { date: "2026-01-26", label: "26 يناير", value: 10800, previous: 6600 },
  { date: "2026-01-28", label: "28 يناير", value: 11800, previous: 6800 },
  { date: "2026-01-30", label: "30 يناير", value: 12500, previous: 7000 },
];

export const peakDays: PeakDay[] = [
  { day: "الأحد", value: 4200 },
  { day: "الإثنين", value: 3800 },
  { day: "الثلاثاء", value: 8162, highlight: true },
  { day: "الأربعاء", value: 4500 },
  { day: "الخميس", value: 3900 },
  { day: "الجمعة", value: 5100 },
  { day: "السبت", value: 5600 },
];

export const orderTypeMetrics: OrderTypeMetric[] = [
  { id: "dine-in", label: "طلبات الصالة", count: 2884, color: "#2563EB" },
  { id: "delivery", label: "طلبات التوصيل", count: 1432, color: "#10B981" },
  { id: "takeaway", label: "السفري", count: 562, color: "#F59E0B" },
];

export const bestSellers: BestSeller[] = [
  {
    id: "1",
    code: "#٨٣٠٠٩",
    name: "وجبة شاورما دبل لحم",
    image: "/images/dishes/shawarma.jpg",
    emoji: "🥙",
    sold: 2310,
    revenue: 124839,
    rating: 5.0,
  },
  {
    id: "2",
    code: "#٨٣٠٠١",
    name: "بروستد ٤ قطع حار",
    image: "/images/dishes/broasted.jpg",
    emoji: "🍗",
    sold: 1230,
    revenue: 92662,
    rating: 4.8,
  },
  {
    id: "3",
    code: "#٨٣٠٠٤",
    name: "برجر لحم كلاسيك",
    image: "/images/dishes/burger.jpg",
    emoji: "🍔",
    sold: 812,
    revenue: 74048,
    rating: 4.7,
  },
  {
    id: "4",
    code: "#٨٣٠٠٢",
    name: "صينية مشاوي مشكلة",
    image: "/images/dishes/mixed-grill.jpg",
    emoji: "🥩",
    sold: 645,
    revenue: 62820,
    rating: 4.5,
  },
  {
    id: "5",
    code: "#٨٣٠٠٥",
    name: "بطاطس مقلية كبيرة",
    image: "/images/dishes/fries.jpg",
    emoji: "🍟",
    sold: 572,
    revenue: 48724,
    rating: 4.5,
  },
];

export const widgetTemplates: WidgetTemplate[] = [
  {
    id: "inventory-gaps",
    title: "نواقص المخزون",
    description: "تابع الأصناف منخفضة المخزون وتنبيهات إعادة الطلب لحظياً.",
    tag: "مخزون",
    icon: "inventory",
  },
  {
    id: "delivery-perf",
    title: "أداء التوصيل",
    description: "راقب زمن التوصيل، نسبة التأخير، وتقييم السائقين.",
    tag: "عمليات",
    icon: "delivery",
  },
  {
    id: "device-analytics",
    title: "تحليلات الأجهزة",
    description: "تعرّف كيف يصل العملاء عبر الجوال، الحاسوب، والتابلت.",
    tag: "جمهور",
    icon: "devices",
  },
  {
    id: "orders-performance",
    title: "أداء الطلبات",
    description: "راقب حجم الطلبات وحالة التنفيذ والمبيعات في الوقت الفعلي.",
    tag: "عمليات",
    icon: "orders",
  },
  {
    id: "trend-analysis",
    title: "تحليل الاتجاهات",
    description: "قسّم العملاء حسب السلوك والتركيبة السكانية للتسويق المستهدف.",
    tag: "استراتيجية",
    icon: "trend",
  },
  {
    id: "customer-segments",
    title: "شرائح العملاء",
    description: "جمّع العملاء حسب الولاء وتكرار الطلب والقيمة.",
    tag: "عملاء",
    icon: "segments",
  },
];

export const aiSuggestions: AiSuggestion[] = [
  { id: "1", label: "تحليل المبيعات" },
  { id: "2", label: "كشف النواقص" },
  { id: "3", label: "توقعات الذروة" },
  { id: "4", label: "تقرير الهدر" },
];

export const navItems = [
  { id: "dashboard", label: "لوحة التحكم", href: "/", badge: null },
  { id: "orders", label: "الطلبات الحية", href: "/orders", badge: 46 },
  { id: "menu", label: "المنيو والأصناف", href: "/menu", badge: null },
  { id: "inventory", label: "المخزون والعملاء", href: "/inventory", badge: null },
  { id: "analytics", label: "التحليلات والتقارير", href: "/analytics", badge: null },
  { id: "settings", label: "الإعدادات", href: "/settings", badge: null },
] as const;

export const dashboardSummary = {
  totalProfit: 446700,
  profitChange: 24.4,
  targetProgress: 68,
  targetLabel: "على طريق تحقيق هدف اليوم",
  dateRange: "١ يناير ٢٠٢٦ - ١ فبراير ٢٠٢٦",
  quickFilter: "آخر ٣٠ يوم",
  brandName: "معلم الشاورما",
  brandSubtitle: "SaaS",
  aiName: "المساعد الذكي أبو علي",
};
