import { relations } from "drizzle-orm";
import {
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import purchase from "./purchase";
import { schema } from "./schema";

export const roleEnum = schema.enum("role", ["USER", "ADMIN"]);
export const proTierEnum = schema.enum("pro_tier", ["BASIC", "GOLD", "PLATINUM"]);

const user = schema.table("user", {
  id: uuid('id').primaryKey().defaultRandom(),
  stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
  role: roleEnum("role").notNull().default("USER"),
  proTier: proTierEnum("pro_tier"),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const userRelations = relations(user, ({many}) => ({
    purchases: many(purchase),
}))

export default user;