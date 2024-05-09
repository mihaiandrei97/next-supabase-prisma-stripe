import { timestamp, integer, varchar, uuid } from "drizzle-orm/pg-core";
import user from "./user";
import { schema } from "./schema";
import { sql } from "drizzle-orm";

const purchase = schema.table("purchase", {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  amount: integer("amount").notNull(),
  type: varchar("type", { length: 255 }).notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export default purchase;
