import { getBaseUrl } from "@/lib/helpers";
import type { Product } from "@/data-access/products";
import type { ProTier } from "@prisma/client";
import { stripe } from "@/lib/stripe";
import { processPayment } from "@/data-access/payments";

export type Metadata = {
  proTier: ProTier;
  userId: string;
};

export async function createCheckoutSessionUseCase(
  product: Product,
  stripeCustomerId: string,
  metadata?: Metadata
) {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer: stripeCustomerId,
    success_url: getBaseUrl() + "/success",
    cancel_url: getBaseUrl() + "/cancel",
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: product.price,
          product_data: {
            name: product.name,
            description: product.description,
            images: ["https://icodethis.com/logo.png"],
          },
        },
        quantity: 1,
      },
    ],
    metadata,
    allow_promotion_codes: true,
    // automatic_tax: {
    //   enabled: true,
    // },
    // invoice_creation: {
    //   enabled: true,
    // },
  });

  return session;
}


export async function processPaymentUseCase(input: {
  userId: string;
  proTier: ProTier;
  amount: number;
}){
  const result = await processPayment(input);
  return result;
}