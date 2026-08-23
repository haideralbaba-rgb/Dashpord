import {
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const dashboardWidgets = pgTable("dashboard_widgets", {
  id: serial("id").primaryKey(),
  widgetKey: varchar("widget_key", { length: 64 }).notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  tag: varchar("tag", { length: 64 }).notNull(),
  icon: varchar("icon", { length: 32 }).notNull(),
  isActive: integer("is_active").notNull().default(1),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const productSales = pgTable("product_sales", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 32 }).notNull(),
  name: text("name").notNull(),
  emoji: varchar("emoji", { length: 16 }).notNull(),
  soldQuantity: integer("sold_quantity").notNull().default(0),
  revenue: numeric("revenue", { precision: 12, scale: 2 }).notNull(),
  rating: numeric("rating", { precision: 3, scale: 1 }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const aiQueries = pgTable("ai_queries", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type DashboardWidget = typeof dashboardWidgets.$inferSelect;
export type ProductSale = typeof productSales.$inferSelect;
export type AiQuery = typeof aiQueries.$inferSelect;
