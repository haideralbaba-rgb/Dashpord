import { NextResponse } from "next/server";
import { db } from "@/db";
import { aiQueries } from "@/db/schema";

export const dynamic = "force-dynamic";

const responses: Array<{ match: RegExp; answer: string }> = [
  {
    match: /مبيعات|تحليل المبيعات|sales/i,
    answer:
      "مبيعات اليوم أعلى بنسبة ١٢٪ عن متوسط الأسبوع. شاورما الدبل تقود الإيرادات، ويُفضَّل تعزيز عروض التوصيل مساء الثلاثاء.",
  },
  {
    match: /نواقص|مخزون|inventory/i,
    answer:
      "هناك ٣ أصناف دون حد الأمان: خبز الصاج، صوص الثوم، وبطاطس التجميد. أنصح بإعادة الطلب خلال ٢٤ ساعة.",
  },
  {
    match: /ذروة|peak|توقع/i,
    answer:
      "الذروة المتوقعة اليوم بين ٧–٩ مساءً. جهّز فريق الصالة بموظف إضافي وفعّل مطبخ التوصيل مبكراً.",
  },
  {
    match: /هدر|waste/i,
    answer:
      "هدر الخضروات انخفض ٨٪ هذا الأسبوع. أعلى هدر في السلطة الموسمية — قلّل التحضير المسبق بنسبة ١٥٪.",
  },
  {
    match: /ربح|أرباح|profit/i,
    answer:
      "صافي الربح لهذا الشهر وصل إلى ٤٤٦.٧ ألف ر.س بارتفاع ٢٤.٤٪. هامش الصالة أفضل من التوصيل بمقدار ٣.٢ نقطة.",
  },
];

function buildAnswer(question: string) {
  const found = responses.find((item) => item.match.test(question));
  if (found) return found.answer;
  return "راجعت مؤشرات الفرع: الأداء العام ممتاز. الثلاثاء يوم الذروة، ومتوسط الفاتورة يحتاج حملة إضافة جانبية لرفع القيمة.";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { question?: string };
    const question = body.question?.trim();

    if (!question) {
      return NextResponse.json({ error: "السؤال مطلوب" }, { status: 400 });
    }

    const answer = buildAnswer(question);

    try {
      await db.insert(aiQueries).values({ question, answer });
    } catch (error) {
      console.error("AI log insert failed", error);
    }

    // Simulate thoughtful delay feel without blocking too long
    await new Promise((resolve) => setTimeout(resolve, 350));

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("POST /api/ai", error);
    return NextResponse.json({
      answer:
        "تعذّر حفظ الاستعلام، لكن من آخر البيانات: الأرباح في اتجاه صاعد وذروة الثلاثاء ما زالت الأقوى.",
    });
  }
}
