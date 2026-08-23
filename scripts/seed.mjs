import "dotenv/config";
import pg from "pg";

const { Client } = pg;

const products = [
  {
    code: "#٨٣٠٠٩",
    name: "وجبة شاورما دبل لحم",
    emoji: "🥙",
    sold: 2310,
    revenue: "124839.00",
    rating: "5.0",
  },
  {
    code: "#٨٣٠٠١",
    name: "بروستد ٤ قطع حار",
    emoji: "🍗",
    sold: 1230,
    revenue: "92662.00",
    rating: "4.8",
  },
  {
    code: "#٨٣٠٠٤",
    name: "برجر لحم كلاسيك",
    emoji: "🍔",
    sold: 812,
    revenue: "74048.00",
    rating: "4.7",
  },
  {
    code: "#٨٣٠٠٢",
    name: "صينية مشاوي مشكلة",
    emoji: "🥩",
    sold: 645,
    revenue: "62820.00",
    rating: "4.5",
  },
  {
    code: "#٨٣٠٠٥",
    name: "بطاطس مقلية كبيرة",
    emoji: "🍟",
    sold: 572,
    revenue: "48724.00",
    rating: "4.5",
  },
];

async function main() {
  const client = new Client({
    connectionString:
      process.env.DATABASE_URL ||
      "postgresql://postgres:postgres@127.0.0.1:5432/app_db",
  });

  await client.connect();

  for (const product of products) {
    await client.query(
      `INSERT INTO product_sales (code, name, emoji, sold_quantity, revenue, rating)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT DO NOTHING`,
      [
        product.code,
        product.name,
        product.emoji,
        product.sold,
        product.revenue,
        product.rating,
      ],
    );
  }

  // Ensure unique-ish seed without unique constraint: delete duplicates keep min id
  await client.query(`
    DELETE FROM product_sales a
    USING product_sales b
    WHERE a.id > b.id AND a.code = b.code
  `);

  console.log("Seeded product_sales");
  await client.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
