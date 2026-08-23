import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

/**
 * DATABASE_URL is a runtime dependency, not a build-time dependency.
 * Vercel may build the Next.js route bundle before project environment
 * variables have been injected. Creating the Pool is safe without a URL;
 * the first database query will fail and the API routes already provide
 * graceful fallback data.
 */
const databaseUrl = process.env.DATABASE_URL;

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

const connectionString =
  databaseUrl ?? "postgresql://unconfigured:unconfigured@127.0.0.1:5432/unconfigured";

export const pool =
  globalForDb.__arenaNextJsPostgresqlPool ??
  new Pool({
    connectionString,
    connectionTimeoutMillis: 2500,
    max: 5,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__arenaNextJsPostgresqlPool = pool;
}

export const db = drizzle(pool);
