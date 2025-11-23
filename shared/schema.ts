import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Lap type for stopwatch
export interface Lap {
  id: string;
  name: string;
  time: number;
  lapNumber: number;
}

// Spreadsheet types
export type CellValue = number | boolean | null;

export interface Cell {
  row: number;
  col: number;
  value: CellValue;
}

export interface SpreadsheetColumn {
  id: string;
  name: string;
}

export interface SpreadsheetRow {
  month: string;
  day: string;
  date: string;
}
