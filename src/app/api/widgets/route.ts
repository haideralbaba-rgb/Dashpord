import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { dashboardWidgets } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const widgets = await db.select().from(dashboardWidgets).orderBy(dashboardWidgets.id);
    return NextResponse.json({ widgets });
  } catch (error) {
    console.error("GET /api/widgets", error);
    return NextResponse.json({ widgets: [] });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      widgetKey?: string;
      title?: string;
      description?: string;
      tag?: string;
      icon?: string;
    };

    if (!body.widgetKey || !body.title) {
      return NextResponse.json({ error: "بيانات غير مكتملة" }, { status: 400 });
    }

    const existing = await db
      .select()
      .from(dashboardWidgets)
      .where(eq(dashboardWidgets.widgetKey, body.widgetKey))
      .limit(1);

    if (existing.length) {
      return NextResponse.json({ widget: existing[0], created: false });
    }

    const [widget] = await db
      .insert(dashboardWidgets)
      .values({
        widgetKey: body.widgetKey,
        title: body.title,
        description: body.description ?? "",
        tag: body.tag ?? "عام",
        icon: body.icon ?? "orders",
        isActive: 1,
      })
      .returning();

    return NextResponse.json({ widget, created: true });
  } catch (error) {
    console.error("POST /api/widgets", error);
    return NextResponse.json(
      {
        widget: {
          widgetKey: "local",
          title: "ودجت محلي",
        },
        created: false,
        offline: true,
      },
      { status: 200 },
    );
  }
}
