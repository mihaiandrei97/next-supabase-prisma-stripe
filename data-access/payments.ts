import { stripe } from "@/lib/stripe";
import type { ProTier } from "@prisma/client";
import { db } from "@/lib/database";
import { updateProTierUser } from "./users";

export async function getOrCreateStripeCustomerId(
  userId: string,
  email: string | undefined
) {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  let stripeCustomerId: string | null = user.stripeCustomerId;

  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email,
    });
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        stripeCustomerId: customer.id,
      },
    });
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
  return db.purchase.create({
    data: {
      userId,
      amount,
      type: `proTier-${proTier}`,
    },
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
  const transactions = [
    updateProTierUser({ userId, proTier }),
    addPurchase({ userId, proTier, amount }),
  ];
  const result = await db.$transaction(transactions);
  return result;
}

export async function getSales() {
  const purchases = await db.purchase.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      amount: true,
      createdAt: true,
      type: true,
      user: {
        select: {
          id: true,
        },
      },
    },
  });
  return purchases;
}
