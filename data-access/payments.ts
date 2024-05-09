import { stripe } from "@/lib/stripe";
import { updateProTierUser } from "./users";
import db from "@/db";
import { proTierEnum, purchase, user } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

type ProTier = typeof proTierEnum.enumValues[number]

export async function getOrCreateStripeCustomerId(
  userId: string,
  email: string | undefined
) {
  const userRecord = await db.select({id: user.id, stripeCustomerId: user.stripeCustomerId}).from(user).where(eq(user.id, userId));

  if (!userRecord[0]) {
    throw new Error("User not found");
  }

  let stripeCustomerId: string | null = userRecord[0].stripeCustomerId;

  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email,
    });
    await db.update(user).set({
      stripeCustomerId: customer.id,
    }).where(eq(user.id, userId));
    stripeCustomerId = customer.id;
  }

  return stripeCustomerId;
}

export function addPurchase({
  userId,
  proTier,
  amount,
}: {
  userId: string;
  proTier: ProTier;
  amount: number;
}) {
  return db.insert(purchase).values({
    userId,
    amount,
    type: `proTier-${proTier}`,
  });
}

export async function processPayment({
  userId,
  proTier,
  amount,
}: {
  userId: string;
  proTier: ProTier;
  amount: number;
}) {
    await updateProTierUser({ userId, proTier });
    await addPurchase({ userId, proTier, amount });
}

export async function getSales() {
  const purchases = await db.select().from(purchase).orderBy(desc(purchase.createdAt));
  return purchases;
}
