"use server";

import { getUser } from "@/data-access/users";
import {
  Metadata,
  createCheckoutSession,
  getOrCreateStripeCustomerId,
} from "@/lib/payment.server";
import { products } from "@/lib/products";
import { ProTier } from "@prisma/client";
import { redirect } from "next/navigation";

export async function stripeRedirect(
  data: FormData
): Promise<{ url?: string; error?: string }> {
  const user = await getUser();
  const proTier = data.get("proTier");

  if (!user) {
    return {
      error: "Unauthorized",
    };
  }

  if (!proTier || typeof proTier !== "string") {
    return {
      error: "Missing proTier",
    };
  }

  const product = products.find((product) => product.proTier === proTier);

  if (!product) {
    return {
      error: "Invalid proTier",
    };
  }

  const stripeCustomerId = await getOrCreateStripeCustomerId(
    user.id,
    user.email
  );

  const metadata: Metadata = {
    proTier: proTier as ProTier,
    userId: user.id,
  };

  const session = await createCheckoutSession(
    product,
    stripeCustomerId,
    metadata
  );

  redirect(session.url as string);
}
