import { stripe } from "@/lib/stripe";
import { updateProTierUser } from "./users";
import { db } from "@/db/database";
import { ProTier } from "@prisma/client";
import { jsonArrayFrom, jsonObjectFrom } from "kysely/helpers/postgres";

export async function getOrCreateStripeCustomerId(
  userId: string,
  email: string | undefined
) {
  const user = await db
    .selectFrom("User")
    .where("id", "=", userId)
    .select(["id", "stripeCustomerId"])
    .executeTakeFirst();

  if (!user) {
    throw new Error("User not found");
  }

  let stripeCustomerId: string | null = user.stripeCustomerId;

  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email,
    });
    await db
      .updateTable("User")
      .set("stripeCustomerId", customer.id)
      .where("id", "=", userId)
      .execute();
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
  return db
    .insertInto("Purchase")
    .values({
      userId,
      amount,
      type: `proTier-${proTier}`,
      updatedAt: new Date(),
    })
    .execute();
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
  const transactions = [
    updateProTierUser({ userId, proTier }),
    addPurchase({ userId, proTier, amount }),
  ];
  const result = await Promise.all(transactions);
  return result;
}

export async function getSales() {
  // https://kysely.dev/docs/examples/SELECT/not-null
  // https://kysely-org.github.io/kysely-apidoc/interfaces/FunctionModule.html#count
  const purchases = await db
    .selectFrom("Purchase")
    .orderBy("createdAt", "desc")
    .select(["id", "amount", "createdAt", "type", 'userId'])
    .select((eb) =>
      jsonObjectFrom(
        eb
          .selectFrom("User")
          .select("id")
          .whereRef("User.id", "=", "Purchase.userId")
      ).$notNull().as("user")
    )
    .execute();
  return purchases;
}
