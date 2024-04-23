"use server";

import { products } from "@/data-access/products";
import { ProTier } from "@prisma/client";
import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/get-server-session";
import { getOrCreateStripeCustomerId } from "@/data-access/payments";
import { Metadata, createCheckoutSessionUseCase } from "@/use-cases/payments";

export async function stripeRedirect(
  data: FormData
): Promise<{ url?: string; error?: string }> {
  const user = await getServerSession();
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

  const session = await createCheckoutSessionUseCase(
    product,
    stripeCustomerId,
    metadata
  );

  redirect(session.url as string);
}
