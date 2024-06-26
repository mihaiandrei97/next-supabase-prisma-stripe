import { stripe } from "@/lib/stripe";
import { Metadata, processPaymentUseCase } from "@/use-cases/payments";
import { headers } from "next/headers";

import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;
  if (!signature) {
    return new Response(JSON.stringify({ error: "Invalid signature" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const stripeSigningSecret = process.env.STRIPE_SIGNING_SECRET as string;

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      stripeSigningSecret
    );

    const completedEvent = event.data.object as Stripe.Checkout.Session & {
      metadata: Metadata;
    };

    if (event.type === "checkout.session.completed") {
      if (completedEvent.mode === "payment") {
        const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
          completedEvent.id,
          {
            expand: ["line_items"],
          }
        );
        if (!sessionWithLineItems.line_items) {
          throw new Error("No line items found");
        }
        await processPaymentUseCase({
          userId: completedEvent.metadata.userId,
          proTier: completedEvent.metadata.proTier,
          amount: sessionWithLineItems.line_items.data[0].amount_total,
        });
      }
    }
    return new Response(JSON.stringify({ success: true, error: null }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        success: false,
        error: (error as { message: string }).message,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
