import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { productSales } from "@/db/schema";
import { bestSellers } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(productSales)
      .orderBy(desc(productSales.soldQuantity))
      .limit(20);

    if (!rows.length) {
      return NextResponse.json({ products: bestSellers });
    }

    return NextResponse.json({
      products: rows.map((row) => ({
        id: String(row.id),
        code: row.code,
        name: row.name,
        emoji: row.emoji,
        sold: row.soldQuantity,
        revenue: Number(row.revenue),
        rating: Number(row.rating),
      })),
    });
  } catch (error) {
    console.error("GET /api/products", error);
    return NextResponse.json({ products: bestSellers });
  }
}
